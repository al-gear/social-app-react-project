import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: String,
    name: { type: String, required: true },
    message: { type: String, required: true },
    comments: { type: [String], default: [] },
    media: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("PostModel", postSchema);

