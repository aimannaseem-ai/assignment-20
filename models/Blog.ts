// models/Blog.ts
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    fullText: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
