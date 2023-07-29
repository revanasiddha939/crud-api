const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../models/Employee');
// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  Employee.create(req.body).then((data) => {
    res.send({ message: 'Employee Added Successfully' });
  }).catch((error) => {
    res.status(400).send('Something Went Wrong');
  })
});
// Get All Employees
employeeRoute.route('/').get((req, res) => {
  const employees = Employee.find()
  employees.then(data => {
    res.json(data)
  })
})
// Get single employee
employeeRoute.route('/read/:id').get((req, res,next) => {
  Employee.findById(req.params.id).then((data) =>{
    res.json(data)
  }).catch((error) => {
    return next(error)
  })
})

// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  const employee = Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  })
  employee.then(data => {
    res.json(data)
    console.log('Data updated successfully')
  })
})
// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  const employee = Employee.findByIdAndRemove(req.params.id)
  employee.then(data => {
    res.status(200).json({
      msg: data
    })
  })
})
module.exports = employeeRoute;
