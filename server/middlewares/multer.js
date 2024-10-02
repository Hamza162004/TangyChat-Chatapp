import multer from "multer";

const storage = multer.memoryStorage(); // store image in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
});
const SingleAvatar = upload.single("avatar");

export { SingleAvatar };
