import React, { useState } from 'react';
import moment from "moment";
import Likes from './Likes';
import { commentPost, deletePost, likePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import { GoComment } from "react-icons/go";
import { MdDelete, MdSend } from "react-icons/md";
import Comment from './Comment';
import { useEffect } from 'react';




const Post = ({ post }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const [likes, setLikes] = useState(post?.likes)

    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post?.comments);

    useEffect(() => {

    }, [comments])

    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        await dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(post.likes.filter(id => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }


    const commentSubmit = async (e) => {
        e.preventDefault();
        const finalComment = `${user?.result.name}:${comment}`;
        const newComment = await dispatch(commentPost(finalComment, post._id));

        setComments(newComment)
        setComment("");
    }





    return (


        <div className="card shadow me-4 p-1 " style={{ maxWidth: "23rem" }}>
            <div className="card-body">
                <h5 className="card-title">{post.name ? post.name : "Name"}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{moment(post.createdAt).fromNow()}</h6>
                <p className="card-text ">{post.message}</p>

                <div className="row">
                    <div className="d-flex  justify-content-start">
                        <button disabled={user?.result?.name ? false : true} onClick={handleLike} className="btn btn-success me-1  btn-sm ">
                            <Likes likes={likes} userId={userId} />
                        </button>
                        {user?.result?.name && (
                            <div className="btn btn-info btn-sm me-1" onClick={() => setIsOpen(true)} >
                                <GoComment />
                            </div>
                        )}
                        {user?.result?._id === post?.creator && (
                            <button onClick={() => dispatch(deletePost(post._id))} className="btn btn-warning btn-sm"><MdDelete /></button>
                        )}
                    </div>
                    <div className="d-flex  justify-content-end ">
                        <p className="btn btn-light btn-sm" onClick={() => setIsOpen(!isOpen)}><span>{post.comments.length > 0 ? "+" + post.comments.length : ""}</span> {isOpen ? "close comments" : "show comments"}</p>
                    </div>
                </div>

            </div>
            {isOpen && (
                <div className="mb-2">
                    <div className="overflow-auto bg-light pt-2 " style={{ maxHeight: "200px" }}>
                        {comments.length > 0 ? (


                            <div >
                                <Comment comments={comments} />
                            </div>


                        ) : (
                            <div className="ms-3 ">
                                <p className="text-muted">no comment...</p>
                            </div>
                        )}
                    </div>
                    {user?.result?.name && (
                        <div>
                            <form onSubmit={commentSubmit} noValidate >
                                <div className="d-flex justify-content-around align-items-center mt-1" >
                                    <input placeholder="write a comment..." type="text" style={{ width: "280px" }} value={comment} onChange={(e) => setComment(e.target.value)} />
                                    <button type="submit" className="btn btn-sm btn-primary"><MdSend /></button>
                                </div>
                            </form>

                        </div>
                    )}
                </div>
            )}

        </div>

    )
}

export default Post
