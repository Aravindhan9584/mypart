const Express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authrouter = require("./routers/auth");
const profilerouter = require("./routers/profile");
const forgetpassword = require("./routers/auth");
const resetpassword = require("./routers/auth");
const companyrouter = require("./routers/companyrouters");
const userRouter = require("./routers/Userrouter");
const cookieParser = require("cookie-parser");
var morgan = require("morgan");
const CardRouter = require("./routers/Cardrouter");
const path = require("path");
const ejs = require("ejs");

//middleware

const app = Express();
dotenv.config();
mongoose.set("strictQuery", false);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(Express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cookieParser());

//

// mongoDB connection
const mongodb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb Disconnected");
});

app.get("/", (req, res) => {
  res.send("Hi this is from home page");
});

app.use("/api/", forgetpassword);
app.use("/api/", resetpassword);
app.use("/api/auth/", authrouter);
app.use("/api/profile/", profilerouter);
app.use("/api/user/", userRouter);
app.use("/api/company/", companyrouter);
app.use("/api/card/", CardRouter);

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
  console.log("Port is Running 4000");
});
