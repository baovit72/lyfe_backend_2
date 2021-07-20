const { Media } = require("./../models");
const mediaService = () => {
  const MEDIA_DOMAIN = "http://10.0.2.2:2021/rest/";
  const getMediaUrlById = async (id) => {
    const media = await Media.findByPk(id);
    if (media) return mediaService().getMediaUrl(media);
    else return "";
  };
  const getMediaUrl = (media) => {
    switch (media.type) {
      case "image":
        return getImageUrl(media.filename);
      case "video":
        return getVideoUrl(media.filename);
      default:
        return "";
    }
  };
  const getVideoUrl = (name) => {
    return MEDIA_DOMAIN + "video/" + name;
  };
  const getImageUrl = (name) => {
    return MEDIA_DOMAIN + "image/" + name;
  };
  return { getImageUrl, getVideoUrl, getMediaUrl, getMediaUrlById };
};
module.exports = mediaService;
