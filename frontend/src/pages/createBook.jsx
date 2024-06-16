import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPubilshYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/create", data)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        enqueueSnackbar("error", { variant: "error" });
      });
  };

  return (
    <div className="p-4 bg-gray-300 min-h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray">PublishYear</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPubilshYear(e.target.value)}
            className="border-2 border-gray px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8 " onClick={handleSaveBook}>
          {" "}
          Create Book
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
