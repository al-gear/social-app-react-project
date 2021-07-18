import { useState } from 'react';
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { useHistory } from "react-router-dom";


const starting = {
    message: "", media: "",
}

const Form = () => {
    const [formData, setFormData] = useState(starting);
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const history = useHistory();




    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ ...formData, name: user?.result?.name }, history));
        setFormData(starting);
    };


    if (!user?.result?.name) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5 text-primary" >
                <h4 className="h4 " >
                    Sign in to share your events
                </h4>
            </div>
        )
    }

    return (
        <div className="row shadow m-0" >
            <div className="h3 mt-4 ">
                Share Your Thoughts
            </div>
            <form className="row g-3" noValidate onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="textarea" className="form-label" >Message</label>
                    <textarea className="form-control" name="message" id="textarea" rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                </div>
                <div className="d-flex  mb-3" >
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, media: base64 })} />
                </div>
                <div className="col-12 mb-2 d-flex justify-content-center">
                    <button className="btn btn-primary " type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form
