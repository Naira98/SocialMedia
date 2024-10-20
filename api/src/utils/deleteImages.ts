import fs from "fs";
import path from "path";
import { IMAGES_PATH } from "../config/multer";

export const deleteImages = (imagePaths: string[]) => {
  for (const image of imagePaths) {
    fs.unlink(path.join(IMAGES_PATH, image), (err) => {
      if (err) console.log(err);
    });
  }
};
