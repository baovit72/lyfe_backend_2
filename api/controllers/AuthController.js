const { User, Media } = require("../models");

const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const mediaService = require("../services/media.service");
const groupService = require("../services/group.service");
var fs = require("fs");
var path = require("path");
const twofactor = require("node-2fa");

var randomToken = require("random-token")
  .create("lyfe" + new Date().toISOString())
  .gen("abcdefghijklmnopqrstvwxyz0123456789");

const mailService = require("../services/mail.service");

const { ResetToken } = require("../models/ResetToken");

const AuthController = () => {
  const verifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email)
      return res.status(401).json({ error: 1, message: "Email not found" });
    const token = twofactor.generateToken("email" + "*lyfe");
    twoFactor.window = 2;
    console.log("generatedToken", token);
    const html = fs
      .readFileSync(
        path.resolve(__dirname, "../html-template/resetlink.html"),
        "utf8"
      )
      .replace("<activation_code>", token);
    await mailService().send(email, html, "[LYFE] RESTORE YOUR PASSWORD");
    return res.status(200).json({ error: 0, message: "Created token" });
  };
  const register = async (req, res) => {
    const { email, password, name, username, phone } = req.body;

    try {
      const user = await User.create({
        email,
        password,
        name,
        username,
        phone,
      });
      const token = authService().issue({ id: user.id });

      return res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      console.log(err.fields);
      if (err.fields)
        return res.status(500).json({
          duplicate: Object.keys(err.fields)
            .map((key) => key.replace("users.", ""))
            .join(""),
        });
      else {
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    }
  };

  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await User.findOne({
          where: {
            username,
          },
        });

        if (!user) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          user.avatar = await mediaService().getMediaUrlById(user.avatar);
          const group = await groupService().getUserGroup(user.id);
          group && delete group.id;
          return res.status(200).json({ token, user, group });
        }

        return res.status(401).json({ msg: "Unauthorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ msg: "Bad Request: Username and password don't match" });
  };
  const restorePassword = async (req, res) => {
    const { email } = req.body;
    if (!email)
      return res.status(401).json({ error: 1, message: "Email not found" });

    const token = randomToken(32);
    console.log("generatedToken", token);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(401).json({ error: 1, message: "Email not found" });

    const createdToken = await ResetToken.create({
      token,
      userId: user.id,
      exp: new Date(new Date().getTime() + 30 * 60 * 1000),
    });
    if (!createdToken)
      return res.status(401).json({ error: 1, message: "Something's wrong" });

    const reset_link = "http://localhost:2021/rest/restore/" + token;
    const html = fs
      .readFileSync(
        path.resolve(__dirname, "../html-template/resetlink.html"),
        "utf8"
      )
      .replace("<reset_link>", reset_link);
    await mailService().send(email, html, "[LYFE] RESTORE YOUR PASSWORD");
    return res.status(200).json({ error: 0, message: "Created token" });
  };
  const generateRandomPassword = async (req, res) => {
    const { token } = req.params;
    if (!token) return res.status(400).send("Token not found");
    const entries = await ResetToken.findAll({
      limit: 1,
      where: {
        token,
      },
      order: [["createdAt", "DESC"]],
    });
    if (!entries || !entries.length)
      return res.status(400).send("Token not found");
    const resettoken = entries[0];
    if (resettoken.exp < new Date())
      return res.status(400).send("Your token has been expired");
    const user = await User.findOne({ where: { id: resettoken.userId } });
    if (!user) return res.status(400).send("Your account does not exist");
    const newPassword = randomToken(10);
    await user.update({ password: newPassword });
    await resettoken.update({ exp: Date.parse("01/01/1970") });
    return res
      .status(200)
      .send(`<p style='font-size:50px'>Your password is ${newPassword}</p>`);
  };
  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, async (err, payload) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }
      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        return res.status(400).json({ msg: "Bad Request: User not found" });
      }
      const group = await groupService().getUserGroup(user.id);
      group && delete group.id;
      user.avatar = await mediaService().getMediaUrlById(user.avatar);

      return res.status(200).json({ isvalid: true, user, group });
    });
  };

  return {
    register,
    login,
    validate,
    restorePassword,
    generateRandomPassword,
    verifyEmail,
  };
};

module.exports = AuthController;
