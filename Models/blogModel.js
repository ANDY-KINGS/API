import mongoose from "mongoose";


//create a plan for your data(blueprint)
const { Schema } = mongoose;

//schema = blueprint
const blogSchema = new Schema(
    {
        title: { type: String, required: true },
        snippet: { type: String, required: true },
        body: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }
    //timestamp-->tell us when something is edited or created
    , { timestamps: true }
);

//create actual collection /model
const Blog = mongoose.model("Blog", blogSchema);


//export the model for use in other files

export default Blog;