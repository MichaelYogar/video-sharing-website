const { application } = require("express");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "assets/" });

const app = express();

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.get("/video/:id", (req, res) => {
  const { id } = req.params;
  const path = `assets/${id}.mp4`;
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

app.post("/upload", upload.single("test"), (req, res) => {
  console.log(req);
  res.send(req.file);
});

module.exports = app;
