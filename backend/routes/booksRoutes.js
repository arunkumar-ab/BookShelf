import express from 'express';
import Book from '../models/bookModel.js'

const router = express.Router();
router.get('/', (req,res) => {
    res.status(234).send("Welcome to Mern Stack Arun!");
})
router.get('/books', async (req,res) => {
    try{
        const books = await Book.find();
        res.status(200).json(
            {
                count: books.length,
                data: books,
            }
        );
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
});

router.get('/book/:id', async(req, res) =>{
    try{
        const book = await Book.findById(req.params.id);
        return res.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json(error.message);
    }
});
router.post('/create', async (req, res) =>{
    try{
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        else{
            const newBook = new Book({title, author, publishYear});
            await newBook.save();
            res.status(201).json(newBook);
        }
    }catch(error){
         console.error(error.message);
         res.status(500).send(error.message);  
    }
})

router.put('/book/:id', async (req, res) => {
    try{
        let book = await Book.findByIdAndUpdate(req.params.id, req.body);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(200).send({message: 'Book updated successfuly'});
    }
    catch(error){
        console.log(error);
        res.send(error.message);
    }
})

router.delete('/book/:id', async (req, res) => {
    try{
        let book = await Book.findByIdAndDelete(req.params.id);
        
        res.status(200).send({message: 'Book deleted successfuly'});
    }
    catch(error){
        console.log(error);
        res.send(error.message);
    }
})

export default router;