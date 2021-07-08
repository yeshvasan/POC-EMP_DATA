const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    code : { type:String, required: true },
    name: { type:String, required:true },
    role: {type:String, required:true},
    dob: {type:String, required:true}
})

module.exports = mongoose.model('EmployeeData', employeeSchema);