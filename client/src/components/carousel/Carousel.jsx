import React from 'react';
import { useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = () => {
    const { posts } = useSelector(state => state.posts)

    return (
        <Carousel showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true}>
            {posts ? posts.map((post) => (
                <div key={post._id} className="w-100" style={{ maxHeight: "400px" }}>
                    <img src={post.media} style={{ height: "100%" }} alt="..." />
                    <h1 className="legend" >{post.name}</h1>
                </div>
            )) : (
                <h1>nothing</h1>
            )}


        </Carousel>
    )
}

export default CarouselComponent;
