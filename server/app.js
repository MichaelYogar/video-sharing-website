const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { transcodeVideo } = require("./utils");

const upload = multer({ dest: "assets/" });

const cors = require("cors");
const app = express();
app.use(cors());

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.get("/video/:id", (req, res) => {
  const { id } = req.params;
  const path = `transcoded/${id}.mp4`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Missing mp4 file");
    }
    await transcodeVideo(req.file.originalname, req.file.path);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = app;
