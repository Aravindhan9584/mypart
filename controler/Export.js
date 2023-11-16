// const User = require("../model/User.js");
// import excelJS from "exceljs";
const excelJS = require("exceljs");
const User = require("../model/User");
// //////
// console.log(User);
const exportUser = async (req, res) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("MyAravind");
  const path = "./files";
  const User1 = await User.find();

  console.log(".............................user.", User1);
  User.find().map((key, user) => {
    return `${(_id = user._id)} ${(username = user.username)}${(password =
      user.password)}${(role = user.role)}${(createdAt =
      user.createdAt)}${(updatedAt = user.updatedAt)}${(__v = user.__v)}`;
  });
  console.log(".......", User1);
  worksheet.columns = [
    { header: "S_no.", key: "S_no", width: 5 },
    { header: "username", key: "username", width: 30 },
    // { header: "password", key: "password", width: 30 },
    { header: "role", key: "role", width: 15 },
    { header: "isAdmin", key: "isAdmin", width: 15 },
    { header: "_id", key: "_id", width: 30 },
    { header: "createdAt", key: "createdAt", width: 15 },
    { header: "updatedAt", key: "updatedAt", width: 15 },
    // { header: "__v", key: "__v", width: 10 },
  ];

  let counter = 1;
  await User1.forEach((item) => {
    item.S_no = counter;
    worksheet.addRow([
      counter,
      item.username,
      // item.password,
      item.role,
      item.isAdmin,
      item._id,
      item.createdAt,
      item.updatedAt,
      item.Admin,
    ]);
    counter++;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    var data1 = await workbook.xlsx.writeFile(`${path}/user.xlsx`).then(() => {
      res.send({
        status: "success",
        message: "file successfully downloaded",
        path: `${path}/users.xlsx`,
      });
    });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
module.exports = { exportUser };
