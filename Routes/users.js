const express = require("express");
const User = require("../Models/User");
const router = express.Router();
var crypto = require('crypto');

router.get("/", async (req, res) => {
    try {
        const Users = await User.find({ active: 1 });
        res.json(Users);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.get("/login/:userEmail/:userPassword", async (req, res) => {
    try {
        const Users = await User.find({
            active: 1,
            email: req.params.userEmail,
            password: crypto.createHash("md5").update(req.params.userPassword).digest("hex")
        });
        res.json({
            name: Users.name,
            role: Users.role
        });
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.get("/:userName", async (req, res) => {
    try {
        const Users = await User.find({ active: 1, name: new RegExp(req.params.userName, "i") });
        res.json(Users);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.post("/create", async (request, response) => {
    const newUser = new User({
        name: request.body.firstName.trim(),
        lastName: request.body.lastName.trim(),
        sex: request.body.sex,
        telephoneNumber: request.body.telephoneNumber,
        email: request.body.email,
        createdDate: new Date(),
        active: 1,
        role: request.body.role,
        password: crypto.createHash("md5").update(request.body.password).digest("hex")
    });

    try {
        const savedUser = await newUser.save();
        response.send(savedUser);
    } catch (error) {
        response.json({ message: error })
    }

});

router.get("/:userId", async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.params.userId, active: 1 })
        res.json(foundUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.delete("/:userId", async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                telephoneNumber: req.body.telephoneNumber,
                email: req.body.email,
                role: req.body.role,
                modifiedDate: new Date()
            }
        }
        );
        res.json(updatedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/delete/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId }, {
            $set: {
                active: 0
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

module.exports = router;