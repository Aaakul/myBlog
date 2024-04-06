import  express from "express";
import { getPosts, getPost, addPost, updatePost, deletePost} from "../controllers/posts.js";

const router = express.Router();
   
router.get("/", getPosts);
router.get(`/:id`, getPost);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;   