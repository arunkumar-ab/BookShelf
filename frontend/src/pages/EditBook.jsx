/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from '../components/Spinner'
import {Link, useParams, } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const EditBook = () => {
    const [book, setBook] = useState({ title: '', author: '', publishYear: '' });
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/book/${id}`)
        .then((response) =>{
            setBook(response.data);
            console.log(response.data);
            setLoading(false);
        }).catch((error) =>{
            console.error(error.message);
            setLoading(false);
        })
    }, [id]);
    const handleEditBook =() =>{
    const { title, author, publishYear } = book;

        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios.put(`http://localhost:5555/book/${id}`, data)
        .then((response) =>{
            setLoading(false);
            enqueueSnackbar("Book edited successfully", { variant: "success" });
            navigate('/');
        }).catch((error)=>{console.error(error.message);})
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value }); // Update the specific property in book state
    };
    
    return(
        <div className="p-4 bg-gray-300 min-h-screen">
        <BackButton/>
        <h1 className="text-3xl my-4">Edit Book</h1>
        {loading ? <Spinner/> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
                <label className="text-xl mr-4 text-gray">Title</label>
                <input 
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange} 
                className="border-2 border-gray px-4 py-2 w-full"/>
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray">Author</label>
                <input 
                type="text"
                name="author"
                value={book.author}
                onChange={handleInputChange} 
                className="border-2 border-gray px-4 py-2 w-full"/>
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray">PublishYear</label>
                <input 
                type="text"
                name="publishYear"
                value={book.publishYear}
                onChange={handleInputChange} 
                className="border-2 border-gray px-4 py-2 w-full"/>
            </div>
            <button className="p-2 bg-sky-300 m-8 " onClick={handleEditBook}> Edit Book</button>
        </div>
    </div>
    )
}
export default EditBook;