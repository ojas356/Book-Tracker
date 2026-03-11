import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Read", "Want to Read", "Reading"], 
        default: "Want to Read" 
    },
    notes: { 
        type: String 
    }
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);