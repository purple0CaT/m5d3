const post = {
  _id: "SERVER GENERATED ID",
  category: "ARTICLE CATEGORY",
  title: "ARTICLE TITLE",
  cover: "ARTICLE COVER (IMAGE LINK)",
  readTime: { value: 2, unit: "minute" },
  author: { name: "AUTHOR AVATAR NAME", avatar: "AUTHOR AVATAR LINK" },
  content: "HTML",
  createdAt: "NEW DATE",
};

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import { send } from "process";

const postStirve = express.Router();

// Path func
const postJson = join(dirname(fileURLToPath(import.meta.url)), "postsLib.json");

// get write
const getPost = () => JSON.parse(fs.readFileSync(postJson));
const writePost = (content) =>
  fs.writeFileSync(postJson, JSON.stringify(content));
console.log(postJson);
//=
//== GET
postStirve.get("/", (req, res, next) => {
  try {
    const posts = getPost();
    res.send(posts);
  } catch (error) {
    next(createHttpError(400, "Bad request"));
  }
});
// exp
export default postStirve;
