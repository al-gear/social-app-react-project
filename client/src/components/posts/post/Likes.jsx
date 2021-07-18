import React from 'react'
import { AiFillLike } from "react-icons/ai";
const Likes = ({ likes, userId }) => {
    if (likes.length > 0) {
        return likes.find((like) => like === userId) ? (
            <><AiFillLike /> &nbsp;  <span className="badge bg-secondary">{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? "s" : ""}`}</span></>
        ) : (
            <><AiFillLike /> &nbsp;  <span className="badge bg-secondary">{likes.length} {likes.length === 1 ? "like" : "likes"}</span> </>
        )

    };
    return <><AiFillLike /> &nbsp;  <span className="badge bg-secondary"></span></>
}

export default Likes;

