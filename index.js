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
const bluebard = require("bluebird");

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
// app.use("/api/profile/", profilerouter);
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

// Example function using Promises
function getData() {
  const Data = [{ aravind: "ajsahd" }, { aravind2: "kxjscs" }];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Data);
    }, 10000);
  });
}
bluebard
  .resolve()
  .then((Data) => {
    return getData();
  })
  .then((result) => {
    console.log("Step 2:", result);
    return bluebard.resolve([result, "MoreData"]);
  })
  .then(bluebard.all) // bluebird.all waits for both promises to be resolved
  .spread((data1, data2) => {
    console.log("Step 3:", { data1 }, { data2 });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

console.log(getData());

console.log("this is testing commands..............all");

// const fs = require("fs");

// // Read a file asynchronously, line by line
// const fileStream = fs.createReadStream("./example.txt", "utf8");
// let data = "";

// fileStream.on("data", (chunk) => {
//   data += chunk;
//   const lines = data.split("\n");
//   // Process each line
//   for (const line of lines) {
//     console.log(line);
//   }
//   // Keep the remainder for the next iteration
//   data = lines.pop();
// });

// fileStream.on("end", () => {
//   // Process any remaining data
//   if (data) {
//     console.log(data);
//   }
//   console.log("End of file");
// });

// fileStream.on("error", (err) => {
//   console.error("Error reading the file:", err);
// });

const port = process.env.PORT;
app.listen(port, async () => {
  await mongodb();
  console.log("Port is Running 4000");
});
