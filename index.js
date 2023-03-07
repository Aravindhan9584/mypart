const Express =require("express")
const dotenv =require("dotenv")
const mongoose =require("mongoose")
const userRouter =require("./routes/User")

const app = Express();
dotenv.config();
mongoose.set('strictQuery', false);
app.use(Express.json())


try { mongoose.connect(process.env.MONGO_URL,()=>{
        console.log("Mongo DB connected")
    });
    } catch (error) {
    console.log(error);
}

app.get("/",(req,res)=>{
    res.send("Hi this is from home page")
})


app.use("/api/",userRouter)


const port =process.env.PORT
app.listen(port,()=>{
    console.log("Port is Running")
})