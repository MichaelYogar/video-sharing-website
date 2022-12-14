const ffmpeg = require("fluent-ffmpeg");

const transcodeVideo = async (filename, filepath) => {
  try {
    ffmpeg(filepath)
      .videoCodec("libx264")
      .audioCodec("libmp3lame")
      .size("720x?")
      .on("error", (err) => {
        throw err;
      })
      .on("end", () => {
        console.log("end");
        ffmpeg(filepath)
          .screenshots({
            timestamps: ["10%"],
            folder: "./thumbnails",
            filename: `${filename}.png`,
            size: "720x?",
          })
          .on("error", (err) => {
            throw err;
          });
      })
      .save(`./transcoded/${filename}.mp4`);
  } catch (err) {
    throw err;
  }
};
module.exports = { transcodeVideo };
