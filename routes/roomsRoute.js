const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async(req,res)=>{

    try {
        const rooms = await Room.find({})
        return res.json({rooms})
    } catch (error) {
        return res.status(400).json({message: error})
    }


});

router.post("/getroombyid", async(req,res)=>{


    const roomid = req.body.roomid

    try {
        const room = await Room.findOne({_id:roomid})
        return res.json({room})
    } catch (error) {
        return res.status(400).json({message: error})
    }


});


router.post("/addroom", async (req, res) => {


    try {
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('New room Added successfully');
   
    } catch (error) {
        return res.status(400).json({ error })

    }
});


router.patch('/deleteroom', async (req, res) => {

    const { _id } = req.body;

    try {

        const room = await Room.findByIdAndRemove(_id);

        if (!room) return res.status(404).send('Room not found');
        res.send('Room deleted successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('Error deleting Room');
    }

});






module.exports = router;





// router.post("/deleteRoom", async (req, res) => {

//     const {_id} = req.body

//     try {

//         await Room.deleteOne({ _id });

//         res.send('Room Deleted Successfully');
 

//     } catch (error) {
//         return res.status(400).json({ error })

//     }
// });

