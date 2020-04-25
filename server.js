var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

// var usersPath = __dirname + "/users";
var usersPath = path.join(__dirname, "users/");

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = "";
  req.on("data", (c) => {
    store += c;
  });
  req.on("end", () => {
    if (req.method === "POST" && parsedUrl.pathname === "/users") {
      var username = JSON.parse(store).username;
      console.log(usersPath + username + ".json");

      fs.open(usersPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          fs.close(fd, (err) => {
            // if
            res.end(username + "created successfully");
          });
        });
      });
    } else if (req.method === "GET") {
    } else if (req.method === "PUT") {
    } else if (req.method === "DELETE") {
    } else {
      res.statusCode = 404;
      res.end("Page Not Found");
    }
  });
}

server.listen(3000, () => {
  console.log("server started");
});
