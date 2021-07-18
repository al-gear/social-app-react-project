import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux'

import Pagination from 'react-bootstrap-4-pagination';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector(state => state.posts)
    const history = useHistory();


    let paginationConfig = {
        disabledColor: 'grey',
        activeBorderColor: 'black',
        activeBgColor: 'grey',
        disabledBgColor: '#fff',
        activeColor: 'red',
        color: 'purple',
        totalPages: numberOfPages || 1,
        currentPage: Number(page) || 1,
        size: "md",
        threeDots: true,
        prevNext: true,
        onClick: function (page) {
            history.push(`/posts?page=${page}`)
        }
    };
    return (
        <div className="d-flex justify-content-center ">
            <Pagination {...paginationConfig} />
        </div>
    )
}

export default Paginate;
