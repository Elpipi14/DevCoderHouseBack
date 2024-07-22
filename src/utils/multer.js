import multer from "multer";
import fs from "fs";

// Esta función determina el directorio de destino
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (file.fieldname === "profile") {
      uploadPath = "./src/public/uploads/profile";
    } else if (file.fieldname === "serviceBill") {
      uploadPath = "./src/public/uploads/serviceBill";
    } else if (file.fieldname === "product") {
      uploadPath = "./src/public/uploads/product";
    }

    // Crear la carpeta si no existe
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

export default upload;

