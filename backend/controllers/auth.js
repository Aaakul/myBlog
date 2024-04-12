import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const reg = (req, res) => {
    // Check existing users
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);                                         
        if (!data.length) {
            //Hash the password & create new user  
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const qInsert = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
            const values = [
                req.body.username,
                req.body.email,
                hash,
            ];

            db.query(qInsert, [values], (err, data) => {
                return (err) ? res.status(500).json(err) : res.status(200).json("User has been created");
                });
            } else {
                return res.status(409).json("User already exists");
            }
    });
}   


export const login = (req, res) => {
    const qCheckName = "SELECT * FROM users WHERE username = ?";
    db.query(qCheckName, [req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }                                         
        if (data.length === 0) {
            return res.status(404).json("User not found");
        }

        const isPasswordMatch = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordMatch) {
                return res.status(400).json("Wrong username or password");
            }
    
        const token = jwt.sign({id: data[0].id}, "your_key");     
        const {password, ...other} = data[0];    
            res.
            cookie("access_token", token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, }) // Expire in 30 days
            .status(200).json(other);    
    });        
}


export const logout = (req, res) => {
    res.
        clearCookie("access_token",
        {sameSite: "none", secure: true})
        .status(200).json("User has been logged out");    
} 