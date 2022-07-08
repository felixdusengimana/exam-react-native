import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/ne-voting', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to mongodb: "+err));