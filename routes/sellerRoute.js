const express = require("express");
const router = express.Router();
const User = require("../models/sellers");

router.post("/sregister", async (req, res) => {

    const newseller = new User({ name: req.body.name, email: req.body.email, password: req.body.password })

    try {
        const user = await newseller.save()
        res.send('Seller Registered Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.post("/slogin", async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {

            const temp = {
                name: user.name,
                email: user.email,
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




module.exports = router



