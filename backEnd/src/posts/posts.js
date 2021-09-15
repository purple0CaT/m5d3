import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { getIdMiddleware, postMiddleware } from "./checkMiddleware.js";
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
//== GETby ID
postStirve.get("/:postId", getIdMiddleware, (req, res, next) => {
  try {
    const posts = getPost();
    const postFilter = posts.filter((post) => post._id == req.params.postId);
    console.log(postFilter);
    res.status(200).send(postFilter);
  } catch (error) {
    next(createHttpError(400, "Bad request"));
  }
});
// POST
postStirve.post("/", postMiddleware, (req, res, next) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    next(createHttpError(400, { errorList }));
  } else {
    try {
      const newPost = { ...req.body, _id: uniqid(), createdAt: new Date() };
      const posts = getPost();
      posts.push(newPost);
      writePost(posts);
      console.log(newPost);
      res.send(newPost);
    } catch (error) {
      next(createHttpError(400, "Bad request"));
    }
  }
});

// exp
export default postStirve;
