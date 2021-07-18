import React from 'react'

const Comment = ({ comments }) => {
    return (
        <>
            {comments.map((c, i) => (
                <p className="ps-2" key={i} > <b className="me-2" >{c.split(":")[0]}</b>{c.split(":")[1]} </p>
            ))}
        </>

    )
}

export default Comment
