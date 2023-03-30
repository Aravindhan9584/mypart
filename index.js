const Express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./controler/UserUpdate");
const authrouter = require("./controler/auth");
const profilerouter = require("./routes/profile");
const forgetpassword = require("./routes/Forget");

const app = Express();
dotenv.config();
mongoose.set("strictQuery", false);
app.use(Express.json());

const mongodb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Hi this is from home page");
});

app.use("/api/", forgetpassword);
app.use("/api/auth/", authrouter);
app.use("/api/", profilerouter);
app.use("/api/", userRouter);

app.use((err, req, res, next) => {
  const errorstatus = err.status || 500;
  const errormassage = err.massage;
  return res.status(400).json({
    succes: false,
    status: errorstatus,
    massage: errormassage,
    stack: err.stack,
  });
});

const port = process.env.PORT;
app.listen(port, async () => {
  await mongodb();
  console.log("Port is Running");
});
