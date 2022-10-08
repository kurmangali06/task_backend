import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
})

export default mongoose.model('Post', PostSchema);