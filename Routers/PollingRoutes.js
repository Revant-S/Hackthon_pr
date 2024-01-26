const {Router} = require("express")
const PoleControllers = require("../Controllers/PoleControllers")
const router = Router();

router.post("/createPole",PoleControllers.CreatePoll)
router.put("/UpdatePoll",PoleControllers.UpdatePoll)
router.get("/getmypoles",PoleControllers.getmypolles)
router.delete("/deleteMyPole",PoleControllers.deletePoll)

module.exports = router