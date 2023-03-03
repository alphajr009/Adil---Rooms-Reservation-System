const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {

    const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password })

    try {
        const user = await newuser.save()
        res.send('User Registered Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }

});



router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {

            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }
            res.send(temp);
        }
        else {
            return res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

});





router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send({ users });
    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.patch("/edituser", async (req, res) => {
    const { _id, name, email } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        return res.json({ message: 'User details updated successfully' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.patch('/changepassword', async (req, res) => {

    const { _id, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).send('User not found');

        if (user.password !== currentPassword) {
            return res.status(400).send('Current password does not match');
        }

        user.password = newPassword;
        await user.save();
        res.send('Password updated successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating password');
    }

});


router.patch('/changeadmin', async (req, res) => {

    const { _id, isAdmin } = req.body;

    try {

        const user = await User.findById(_id);


        user.isAdmin = true;
        await user.save();
        res.send('Admin Status updated successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error updating Admin Status');
    }

});



router.patch('/deleteuser', async (req, res) => {

    const { _id } = req.body;

    try {

        const user = await User.findByIdAndRemove(_id);

        if (!user) return res.status(404).send('User not found');
        res.send('User deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error deleting User');
    }

});

module.exports = router



