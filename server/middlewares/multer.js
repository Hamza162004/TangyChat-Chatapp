import multer from "multer";

const storage = multer.memoryStorage(); // store image in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 2MB
});
const SingleAvatar = upload.single("avatar");

const attachementsMulter = upload.array("attachments")

export { SingleAvatar , attachementsMulter };
