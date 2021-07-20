const { uploadImageMW, uploadVideoMW } =
  require("./../../api/controllers/MediaController")();

const privateRoutes = {
  "POST /image": {
    path: "MediaController.uploadImage",
    middlewares: [uploadImageMW],
  },
  "POST /video": {
    path: "MediaController.uploadVideo",
    middlewares: [uploadVideoMW],
  },
  "GET /image/*": "MediaController.getImage",
  "GET /video/*": "MediaController.getVideo",
};

module.exports = privateRoutes;
