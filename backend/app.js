const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Employee = require("./model/emp");

const app = express();

mongoose
  .connect(
    "mongodb://prakashsrinivasan:Architech_140395@employeedetails-shard-00-00.iao6z.mongodb.net:27017,employeedetails-shard-00-01.iao6z.mongodb.net:27017,employeedetails-shard-00-02.iao6z.mongodb.net:27017/employeeData?ssl=true&replicaSet=atlas-11ofbe-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/employee-list", (req, res, next) => {
  const employee = new Employee({
    code: req.body.code,
    name: req.body.name,
    role: req.body.role,
    dob: req.body.dob,
  });
  // console.log(post);
  employee.save();
  res.status(201).json({
    message: "Employee added successfully!",
  });
});

app.get("/api/employee-list", (req, res, next) => {
  Employee.find().then((documents) => {
    // console.log(documents,"doccc:::")
    res.status(200).json({
      message: "Employee fetched successfully!",
      employee: documents,
    });
  });
});

module.exports = app;
