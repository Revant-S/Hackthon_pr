const mongoose = require("mongoose")
const User = require("../DbModels/UserModel")
const jwt = require("jsonwebtoken")
const cookies = require("cookie-parser")
const PollDb = require("../DbModels/Poledb");
async function SearchThePole(Pole_id, UserId) {
    const UserDocument = await User.findById(UserId)
    const Array = UserDocument.ParticipatedPoles.map(entry => entry.Pole_id.toString()); // Extract Pole_id and convert to string
    return Array.includes(Pole_id.toString());
}
function getresponse(responseobj) {
    if (responseobj.Upvote === 1) {
        return Upvote
    }
    return responseobj.DownVote
}
module.exports.CreatePoll = async (req,res)=>{
    const PollBody = req.body;
    const UserIdjwt = req.cookies.jwt
    const UserId  = (jwt.decode(UserIdjwt)).id
    console.log(UserId);
    
    try {
        const CreatedPole = await PollDb.create({
            Pole_Question : PollBody.Pole_Question,
            UpVotes : 0,
            downVotes : 0,
            Poll_State : 0   
        })
        await User.findByIdAndUpdate(UserId,{$push : {PolesLaunched : CreatedPole._id}},{ new: true })
        res.json({msg : "Pole Is Created"})
        
    } catch (error) {

        console.log(error);
        res.json({msg: "Some error Occured"})
    }
   
}
module.exports.UpdatePoll = async (req,res)=>{
    const updateBody = req.body
    const PoleId = updateBody.PoleId  
    try {
        
        const UserIdjwt = req.cookies.jwt;
        const UserId = (jwt.decode(UserIdjwt)).id;
        const voted = await SearchThePole(PoleId,UserId)
        if (voted) {
            res.json({mag : "You Already Voted in the Pole"})
            return
        }
        const objTobeadded = {
            Pole_id : PoleId,
            ResponseFromUser : getresponse(updateBody)
        }
        const UpdatedPoleResults = await PollDb.findByIdAndUpdate(PoleId, { $inc: { UpVotes: updateBody.UpVote, downVotes: updateBody.DownVote } });
        const updatedUser = await User.findByIdAndUpdate(UserId,{ $push: { ParticipatedPoles: objTobeadded } },{ new: true })

        res.json({UpdatedPoleResults,updatedUser})
  
    } catch (error) {   
        console.log(error);
        res.json({msg : "Some Error Occured!!"})
    }

}
module.exports.deletePoll = async (req,res)=>{
    const deleteDetails = req.body
    const UserIdjwt = req.cookies.jwt
    const UserId = (jwt.decode(UserIdjwt)).id
    try {
        await PollDb.findByIdAndDelete(deleteDetails.PollId)
        const s = await User.findByIdAndUpdate(UserId,{$pull : {PolesLaunched : deleteDetails.PollId}})
        res.json({msg : "Requested Poll is deleted"})
    } catch (error) {
        console.log(error)
    }
}
module.exports.getmypolles = async (req,res)=>{
    const UserIdCookie = req.cookies.jwt
    const UserId = jwt.decode(UserIdCookie)
    const UserDocument = User.findById(UserId,{_id : 0 , ParticipatedPoles : 1})
    res.json({list : UserDocument})
}