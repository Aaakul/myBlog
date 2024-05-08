import db from "../db.js";
import jwt from "jsonwebtoken";

const postData = "`title`, `desc`, p.img, p.id, `username`, `date`, `cat`";
const usersJoinPosts = "users u JOIN posts p ON u.id = p.uid";
// Home page
export const getPosts = (req, res) => {
  const { field, keyword, order } = req.query;
  const dateOrder = order ? "`date` ASC" : "`date` DESC"; // Only selecting order by oldest introduces the param, order by date desc by default

  let q = "";
  switch (field) {
    case "title": // Search bar
      q = `SELECT ${postData} FROM ${usersJoinPosts} WHERE title LIKE ? ORDER BY ${dateOrder};`;
      break;
    case "author":
      q = `SELECT ${postData} FROM ${usersJoinPosts} WHERE username LIKE ? ORDER BY ${dateOrder};`;
      break;
    case "username": // Accurate search
      q = `SELECT ${postData} FROM ${usersJoinPosts} WHERE username = ? ORDER BY${dateOrder};`;
      break;
    case "cat":
      q = `SELECT ${postData} FROM ${usersJoinPosts} WHERE cat = ? ORDER BY ${dateOrder};`;
      break;
    default: // All posts
      q = `SELECT ${postData} FROM ${usersJoinPosts} ORDER BY ${dateOrder};`;
  }

  const values =
    field === "title" || field === "author" ? [`%${keyword}%`] : [keyword];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!data.length) {
      return res.status(404).json("");
    }

    return res.status(200).json(data);
  });
};

// Single page
export const getPost = (req, res) => {
  const q = `SELECT ${postData} AS profile, \`cat\`, \`date\` FROM ${usersJoinPosts} WHERE p.id = ?;`;
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!data.length) {
      return res.status(404).json("");
    }

    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  // Check logging state
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  // Verify token
  jwt.verify(token, "your_key", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?;";
    db.query(q, [postId, userInfo.id], (err) => {
      return err
        ? res.status(403).json("You can only delete your own posts")
        : res.status(200).json("Post has been deleted");
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, "your_key", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?);";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err) => {
      return err
        ? res.status(500).json(err)
        : res.status(200).json("Post has been posted");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, "your_key", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ?, `date` = ? WHERE `id` = ? AND `uid` = ?;";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
    ];
    db.query(q, [...values, postId, userInfo.id], (err) => {
      return err
        ? res.status(500).json(err)
        : res.status(200).json("Updated successfully");
    });
  });
};
