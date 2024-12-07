const mongoose = require("mongoose")

const PollSchema = mongoose.Schema({
    Pole_Question : {
        type : String,
        require : true,
    },
    UpVotes : Number,
    downVotes : Number,
    Poll_State : Number,   
    Location : {
        type : String,
        requiered : true,
    }
})

const PollInstance  = new mongoose.model("PollData",PollSchema);
module.exports = PollInstance
