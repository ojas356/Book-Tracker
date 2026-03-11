import { Book } from "../models/book.model.js";

export default function bookRoutes(app) {

  // GET All Books
  app.get("/books", async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 });
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ADD New Book
  app.post("/books", async (req, res) => {
    try {
      const { title, author, status, notes } = req.body;

      const newBook = await Book.create({
        title,
        author,
        status,
        notes,
      });

      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // UPDATE Book Status
  app.patch("/books/:id", async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE Book
  app.delete("/books/:id", async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

}