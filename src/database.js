import mongoose from "mongoose";

mongoose.connect("mongodb+srv://matiasaryveron:nomeacuerdo33@cluster0.ncwjbkj.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Base conectada"))
    .catch( (error)=> console.log("Error", error))
