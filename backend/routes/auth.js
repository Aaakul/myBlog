import  express from "express";
import { reg, login, logout } from "../controllers/auth.js";

const router = express.Router();
   
router.post("/reg", reg);
router.post("/login", login);
router.post("/logout", logout);

export default router; 