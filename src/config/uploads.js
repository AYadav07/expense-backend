const multer = require("multer");
const path = require("path");
// Set up storage for uploaded files

const destPath = path.join(__dirname, "../../uploads/profile_pics");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const fname = "" + req.body.name;
    cb(null, req.body.name);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
