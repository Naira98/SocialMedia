import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { nanoid } from "nanoid";

export const IMAGES_PATH = path.join(__dirname, "..", "..", "public", "assets");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGES_PATH);
  },
  filename: function (req, file, cb) {
    const randomeName = nanoid() + path.extname(file.originalname);
    cb(null, randomeName);
    req.body.picturePath = randomeName;
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
});
