import { Post } from '../models/post.js';

export const postPost = async (req, res) => {
  const body = req.body;
  const newPost = new Post(body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: "No se pudo encontrar el post" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: "Post no encontrado" });
    }

    post.title = req.body.title || post.title;
    post.author = req.body.author || post.author;
    post.body = req.body.body || post.body;

    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ msg: "Post no encontrado" });
    }
    res.json({ msg: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).send(error);
  }
};
