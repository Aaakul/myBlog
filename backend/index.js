import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/my-blog-app/public/uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".");
    const extension = name[name.length - 1];
    cb(null, Date.now() + "." + extension);
  },
});

const upload = multer({
  limits: {
    fileSize: 1 * 1000 * 1000, // Max 1 Mb
  },
  storage: storage,
});

// Handle imgs from users
app.post("/backend/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  return !file
    ? res.status(200) // No file uploaded
    : res.status(200).json(file.filename);
});

app.use(express.json());
app.use(cookieParser());

app.use("/backend/posts", postRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/users", usersRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to the backend!");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
