import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://evelynitzelariasvasquez:EYTjAzn5qJvDyNUy@cluster0.ft97d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("db is connected")
    } catch (error) {
        console.log(error);
    }

};
    
