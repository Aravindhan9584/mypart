const Express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./controler/Users.update");
const authrouter = require("./controler/auth.controller");
const Useraddress = require("./controler/useraddress");
const forgetpassword = require("./routes/forgetpass");

const app = Express();
dotenv.config();
mongoose.set("strictQuery", false);
app.use(Express.json());

try {
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongo DB connected");
  });
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hi this is from home page");
});

app.use("/api/", forgetpassword);
app.use("/api/auth/", authrouter);
app.use("/api/", Useraddress);
app.use("/api/", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Port is Running ");
});
