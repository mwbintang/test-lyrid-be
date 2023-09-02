const { user_management, employee_management } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signJWT } = require("../helpers/jwt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/upload/')); // Use path.join to resolve the correct directory
  },
  filename: (req, file, cb) => {
    const newFile =
      file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  },
});

// Create multer middleware instance
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 300000 }
}).single('img');
class controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "wrong email/password" };
      }
      let role = "user_management";
      let emailSearch = await user_management.findOne({ where: { email } });
      if (!emailSearch) {
        emailSearch = await employee_management.findOne({ where: { email } });
        role = "employee_management";
      }
      if (!emailSearch) {
        throw { name: "email/password not valid" };
      }
      let comaparePass = compare(password, emailSearch.password);
      if (!comaparePass) {
        throw { name: "wrong email/password" };
      }
      let access_token = signJWT({
        id: emailSearch.id,
        role,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static upload(req, res) {
    uploadImage(req, res, (err) => {
      if (err) {
        // Handle the error (e.g., file size exceeds limit or wrong file type)
        return res.status(400).json({ error: 'File upload error' });
      }
      // The file has been uploaded successfully
      console.log('File uploaded:', req.file);
  
      // Handle further processing here
  
      // Send a response
      res.status(200).json(req.file);
    });
  }
  static async getImage(req, res, error) {
    try {
      const { filename } = req.params;
      const imagePath = path.join(__dirname, "../public/upload", filename);

      res.sendFile(imagePath);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = controller;
