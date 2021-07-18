import mongoose from "mongoose";
import PostModel from "../models/postModel.js";





export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostModel.countDocuments({});

        const posts = await PostModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostModel({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),

    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id:${id}`);
    await PostModel.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully" });
};

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostModel.findById(id);
    post.comments.push(value);

    const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated!" });
    };

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id:${id}`);

    const post = await PostModel.findById(id);

    const index = post.likes.findIndex(id => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);

}
