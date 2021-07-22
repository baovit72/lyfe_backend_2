const publicRoutes = {
  "POST /register": "AuthController.register",
  "POST /login": "AuthController.login",
  "POST /validate": "AuthController.validate",
  "POST /restore": "AuthController.restorePassword",
  "POST /verify": "AuthController.verifyEmail",
  "GET /restore/:token": "AuthController.generateRandomPassword",
};

module.exports = publicRoutes;
