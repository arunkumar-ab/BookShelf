// /* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
const DeleteBook = ()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = () => {
        axios.delete(`http://localhost:5555/book/${id}`)
        .then((response) => {
            setLoading(false); 
            enqueueSnackbar("Book deleted successfully", { variant: "success" });
            console.log("Deleted successfuly");
            navigate('/');
        })
        .catch((error) => { 
            setLoading(false);
            alert("An error happend. Please check console");
            console.error(error.message)});
    }
    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? <Spinner/> :''}
            <div className="flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto">
                <h3>Are You sure you want to delete</h3>
                <button className="p-4 bg-red-600 text-white m-8 w-full"
                onClick={handleDelete}>Yes delete it</button>
            </div>

        </div>
    )
}
export default DeleteBook;