// const multer = require("multer");

// const upload = async (req, res, next) => {
//   try {
//     const storage = multer.diskStorage({
//       destination: "./upload/",
//       filename: function (req, file, cb) {
//         newFile =
//           file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//         cb(null, newFile);
//       },
//     });
//     const upload = multer({
//       storage: storage,
//       limits: { fileSize: 2000000 },
//       fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//       },
//     }).single("img");

//     // const storage = multer.diskStorage({
//     //   destination: (req, file, cb) => {
//     //     cb(null, "./uploads"); // Destination directory for uploaded files
//     //   },
//     //   filename: (req, file, cb) => {
//     //     cb(null, Date.now() + "-" + file.originalname); // Rename files with a timestamp
//     //   },
//     // });

//     // const upload = multer({ storage });
//     const profilePicture = req.file;
//     console.log(upload, profilePicture);
//     next();
//   } catch (e) {
//     console.log(e, "error");
//   }
// };

// module.exports = upload;
