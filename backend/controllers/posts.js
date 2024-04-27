import db from "../db.js";
import jwt from "jsonwebtoken";

// Home page
export const getPosts = (req, res) => {
  const search = req.query;
  const field = search.field;
  const keyword = search.keyword;

  let q = "";
  switch (field) {
    case "title": // Search bar
      q = `SELECT \`title\`, \`desc\`, p.img, p.id, \`username\`, \`date\` FROM users u JOIN posts p ON u.id = p.uid WHERE title LIKE '%${keyword}%' ORDER BY \`date\` DESC;`;
      break;
    case "author":
      q = `SELECT \`title\`, \`desc\`, p.img, p.id, \`username\`, \`date\` FROM users u JOIN posts p ON u.id = p.uid WHERE username LIKE '%${keyword}%' ORDER BY \`date\` DESC;`;
      break;
    case "username": // Accurate search
      q = `SELECT \`title\`, \`desc\`, p.img, p.id, \`username\`, \`date\` FROM users u JOIN posts p ON u.id = p.uid WHERE username = '${keyword}' ORDER BY \`date\` DESC;`;
      break;
    default: // All posts
      q =
        "SELECT `title`, `desc`, p.img, p.id, `username` FROM users u JOIN posts p ON u.id = p.uid ORDER BY `date` DESC;";
  }

  db.query(q, (err, data) => {
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
  const q =
    "SELECT p.id,`username`, `title`, `desc`, p.img, u.img AS profile, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?;";

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
