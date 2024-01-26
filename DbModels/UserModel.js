const mongoose = require("mongoose")
const zod = require("zod")
const cors = require("cors")
const bcrypt = require("bcrypt")
const EmailScheme = zod.string().email()
const UserSchema = new mongoose.Schema({
    FirstName : {
        type : String,
        required : true
    },
    LastName : String,
    Email : {
        type : String,
        required : true,
        validate : [(value)=>{return EmailScheme.safeParse(value).success},"Please Enter a Valid Email address"]
    },
    Age : {
        type : Number,
        required : true,
        min : [18,"The age of the user must be equal to or more than 18"]
    },
    gender : {
        type : String,
        required : true,
        lowercase : true
    },
    AadharNumber : {
        type : String,
        required : true,
        unique : true,  // Unique Identifier
    },
    Mobile : {
        type : Number,
        required : true
    },
    Password : {
        type : String,
        minlength : 10,
        required: true,
    },
    ParticipatedPoles : {
        type : [{Pole_id :{ type : mongoose.Schema.Types.ObjectId,ref : "PollData"}, ResponseFromUser : String}],
        default : []
    },
    PolesLaunched : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "PollData",
        default : []
    },
    Location : {
        type : String,
        required : true
    },
    LoggedIn : {
        type : Boolean,
        default : false
    }
})

UserSchema.pre("save",async function (next) {
    const salt = await bcrypt.genSalt(5)
    this.Password = await bcrypt.hash(this.Password,salt)
    next()
})
UserSchema.statics.login = async function(email,Password){
    const p = await this.findOne({Email:email}) 
    if (p.LoggedIn) {
        return LoggedIn
    }
    if (p) {
        const auth = await bcrypt.compare(Password,p.Password)  //True/False Value
        if (auth) {
            return p
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}
const User = mongoose.model("PublicDetail",UserSchema)
module.exports = User