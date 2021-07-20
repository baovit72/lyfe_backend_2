const multer = require("multer");
const imgSteam = require("image-steam");
const fs = require("fs");
const path = require("path");
const { Media } = require("../models/Media");

const mediaService = require("../services/media.service");
const idService = require("../services/id.service");

const MediaController = () => {
  const upload = multer({
    dest: "medias/",
    limits: { fieldSize: 125 * 1024 * 1024 },
    onError: function (err, next) {
      console.log(err);

      next(err);
    },
    fileFilter: function (req, file, cb) {
      const allowedTypes = [
        "image/gif",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
        "video/mp4",
      ];

      if (allowedTypes.indexOf(file.mimetype) === -1) {
        req.fileValidationError = "mimetype not allowed";
        return cb(null, false, new Error("mimetype not allowed"));
      }
      cb(null, true);
    },
  });
  const imageSteamConfig = {
    storage: {
      defaults: {
        driver: "fs",
        path: "./medias",
      },
      cacheTTS: 86400 * 14,
      cacheOptimizedTTS: 86400 * 14,
      cacheArtifacts: true,
    },
    throttle: {
      ccProcessors: 4,
      ccPrefetchers: 20,
      ccRequests: 100,
    },
    log: {
      errors: false,
    },
  };
  const ImageServer = new imgSteam.http.Connect(imageSteamConfig);
  const imageHandler = ImageServer.getHandler();

  const uploadImageMW = upload.single("image");
  const uploadVideoMW = upload.single("video");
  const embedImage = async (req, res, next) => {
    try {
      const image = await Media.create({
        alt: "",
        type: "image",
        filename: req.file.filename,
      });
      req.mediaId = image.id;
    } catch (e) {
      console.log(e);
    } finally {
      next();
    }
  };
  const embedVideo = async (req, res, next) => {
    try {
      const media = await Media.create({
        alt: "",
        type: "video",
        filename: req.file.filename,
      });
      req.mediaId = media.id;
    } catch (e) {
      console.log(e);
    } finally {
      next();
    }
  };
  const uploadVideo = async (req, res, next) => {
    try {
      if (!res.headerSent) {
        res.setHeader("Content-Type", "application/json");
      }
      const media = await Media.create({
        alt: "",
        type: "video",
        filename: req.file.filename,
      });
      console.log("created video", media);
      res.send(
        JSON.stringify({
          url: mediaService().getVideoUrl(req.file.filename),
        })
      );
    } catch (e) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  const uploadImage = async (req, res, next) => {
    console.log("upload");
    try {
      if (!res.headerSent) {
        res.setHeader("Content-Type", "application/json");
      }
      const image = await Media.create({
        alt: "",
        type: "image",
        filename: req.file.filename,
      });
      console.log("upload image");
      console.log("created image", image);
      res.send(
        JSON.stringify({
          id: idService().encode(image.id),
          url: mediaService().getImageUrl(req.file.filename),
        })
      );
    } catch (e) {
      console.log("error uploading image", e);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  const getVideo = async (req, res) => {
    const videoName = req.url.replace("/video", "");
    const range = req.headers.range;
    console.log("dir", __dirname);
    const videoPath = path.resolve(__dirname, "../../medias/" + videoName);
    const videoSize = fs.statSync(videoPath).size;

    if (!range) {
      const head = {
        "Content-Length": videoSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    } else {
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    }
  };
  const getImage = async (req, res) => {
    const imageName = req.url.replace("/image", "");
    console.log("dir", __dirname);
    const imagePath = path.resolve(__dirname, "../../medias/" + imageName);
    res.sendFile(imagePath);
  };

  return {
    uploadImageMW,
    getImage,
    uploadImage,
    uploadVideoMW,
    uploadVideo,
    getVideo,
    embedVideo,
    embedImage,
  };
};

module.exports = MediaController;
