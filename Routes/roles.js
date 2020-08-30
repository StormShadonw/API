const express = require("express");
const Role = require("../Models/Role");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Roles = await Role.find();
        res.json(Roles);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.post("/create", async (request, response) => {
    const newUser = new User({
        name: request.body.firstName,
        lastName: request.body.lastName,
        sex: request.body.sex,
        telephoneNumber: request.body.telephoneNumber,
        email: request.body.email,
        apps: request.body.apps,
        createdDate: new Date(),
        active:1
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
        const foundUser = await User.findOne({email: req.params.userId})
        res.json(foundUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.delete("/:userId", async (req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.userId});
        res.json(removedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne({_id: req.params.userId}, {$set:{name:req.body.name}});
        res.json(updatedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/delete/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne({_id: req.params.userId}, {$set:{
            active:0
        }});
        res.json(updatedUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

module.exports = router;