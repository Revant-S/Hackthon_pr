const mongoose = require("mongoose")

const PollSchema = mongoose.Schema({
    Pole_Question : {
        type : String,
        require : true,
    },
    UpVotes : Number,
    downVotes : Number,
    Poll_State : Number, // 0 --> Pending 1-->Inprogress 2 -->Completed   
    Location : {
        type : String,
        requiered : true,
    }
})

const PollInstance  = new mongoose.model("PollData",PollSchema);
module.exports = PollInstance