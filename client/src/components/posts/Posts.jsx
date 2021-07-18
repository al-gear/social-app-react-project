import React from 'react'
import Post from "./post/Post";
import { useSelector } from "react-redux";

const Posts = () => {
    const { posts, isLoading } = useSelector(state => state.posts);

    if (!posts.length && !isLoading) return "No Posts";

    return (
        <div>
            {isLoading ? (<div className="d-flex justify-content-center  mt-5 " style={{ height: "22vh" }}>
                <div className="spinner-border mt-4" style={{ width: "12%", height: "72%", backgroundImage: "linear-gradient(to right, #3885EC, #059CAD)" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>) : (
                <div className="row row-cols-1 row-cols-xl-3 g-0 ms-1">
                    {posts.map((post) => (
                        <div className=" col-md-12  m-4" key={post._id} >
                            <Post post={post} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Posts
