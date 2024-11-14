// Create web  server

// Importing modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Create web server
const server = http.createServer((req, res) => {
  // Get URL
  const urlPath = url.parse(req.url).pathname;

  // Get file path
  const filePath = path.join(__dirname, "public", urlPath === "/" ? "index.html" : urlPath);

  // Get file extension
  const extname = path.extname(filePath);

  // Get content type
  let contentType = "text/html";

  // Set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data, "utf8");
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8");
    }
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});