require("dotenv").config();

import express from 'express';
import mongoose from 'mongoose';
import dns from "dns";
import bookRoutes from './routes/book.routes.js';

// Fix for MongoDB Atlas network issues
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // Serves index.html and styles.css

// MongoDB Connection
const DbURL = "process.env.MONGO_URI";

mongoose.connect(DbURL)
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.log("Connection Error:", err));

// Routes - links all /books requests to the routes file
bookRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});