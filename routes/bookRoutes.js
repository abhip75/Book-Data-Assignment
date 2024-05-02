
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Endpoint to create a new book entry
router.post('/', async (req, res) => {
  try {
    // Validate incoming data
    const { title, author, isbn, publicationDate } = req.body;
    if (!title || !author || !isbn || !publicationDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newBook = new Book({ title, author, isbn, publicationDate });
    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to retrieve all book entries
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update an existing book entry
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, publicationDate } = req.body;

    // Validate incoming data
    if (!title || !author || !isbn || !publicationDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Update the book entry in the database
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, isbn, publicationDate }, { new: true });
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete a book entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

