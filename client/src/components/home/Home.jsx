import { useEffect } from 'react'
import Carousel from "../carousel/Carousel";
import Posts from '../posts/Posts';
import Auth from '../auth/Auth';
import Form from '../form/Form';
import Pagination from '../pagination/Pagination';
import { useLocation } from 'react-router';
import { getPosts } from '../../actions/posts';

import { useDispatch } from "react-redux";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const page = query.get("page") || 1;
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [dispatch, page])


    return (

        <div className="row my-2">
            <div className="col-12 col-sm-8 col-xl-9 order-2 order-md-1 my-5">
                <Carousel />
                <div className="m-3" style={{ height: "5px", background: "linear-gradient(70deg,#849daf,#611378,#105670)" }} />

                <Posts />

                <Pagination page={page} />
            </div>

            <div className="col-12 col-sm-4 col-xl-3 order-1 order-md-2 ">
                <Auth />
                <div style={{ height: "5px", background: "linear-gradient(70deg,#949daf,#511378,#005670)" }} />

                <Form />


            </div>

        </div>

    )
}

export default Home
