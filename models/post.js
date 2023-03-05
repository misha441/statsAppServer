const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    id:{
        type:String,
        required: true
    },
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    ip_address:{
        type:String,
        required: true
    }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post