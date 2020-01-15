const express = require("express");
const db = require("./data/hubs-model");

const server = express();

server.listen(4000, () => {
  console.log(`***** listening on port 4000`);
});

//global middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world!");
});

server.get("/now", (req, res) => {
  const today = new Date();
  const date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  res.send(date + " " + time);
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.post("/hubs", (req, res) => {
  const hubInfo = req.body;

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.get("/hubs/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(hub => {
      if (hub) {
        res.status(200).json({ success: true, hub });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
