const mongoose = require("mongoose")
const zod = require("zod")
const bcrypt = require("bcrypt")
const EmailScheme = zod.string().email()
const DummydbSchema = new mongoose.Schema({
  FirstName : {
    type : String,
    required : true
  },
  LastName : String,
  Department : {
    type : String,
    required : true,
  },
  Post : {
    type : String,
    required : true
  },
  Email : {
    type : String,
    required : true,
    validate : [(value)=>{return EmailScheme.safeParse(value).success},"Please Enter a Valid Email address"]
  },
  Age : {
    type : Number,
    required : true,
    min : [18,"The ageof the user must be equal to or more than 18 "]
  },
  gender : {
    type : String,
    required : true,
    lowercase : true
  },
  AadharNumber : {
    type : String,
    required : true,
    unique : true,
  },
  Mobile : {
    type : Number,
    required : true
  }
})
const DummyGovernmentdb = new mongoose.model("DummyGovernmentdb",DummydbSchema)


module.exports = DummyGovernmentdb