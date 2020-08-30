const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Users = await User.find({'apps.active': true});
        res.json(Users);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.get("/:appId", async (req, res) => {
    try {
        const user = await User.find({
            "apps._id": req.params.appId
        }, (err,docs) => {
            const app = docs[0].apps.filter(app => app._id == req.params.appId && app.active)
            res.json(app);
        });

    }
    catch (error) {
        res.json({ message: error })
    }
})

router.post("/create", async (req, res) => {
    const newApp = {
        appShortName: req.body.appShortName,
        appTitle: req.body.appTitle,
        appDescription: req.body.appDescription,
        createdDate: new Date(),
        active: true
    };
    await User.updateOne(
        { _id: req.body.appUser },
        {
            $push: { apps: newApp }
        }
    );
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.json({ message: error })
    }

});

router.get("/:appId", async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.params.appId })
        res.json(foundUser);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/delete/:appId", async (req, res) => {
    try {
        const appDeleted = await User.updateOne({'apps._id': req.params.appId}, {
            '$set': {
                'apps.$.active': false
            }
        }, {upsert: true});
        res.json(appDeleted);
    }
    catch (error) {
        res.json({ message: error })
    }
})

router.put("/:appId", async (req, res) => {
    try {
        const appEdited = await User.updateOne({'apps._id': req.params.appId}, {
            '$set': {
                'apps.$.appShortName': req.body.appShortName,
                'apps.$.appTitle': req.body.appTitle,
                'apps.$.appDescription': req.body.appDescription,
                'apps.$.modifiedDate': new Date()
            }
        }, {upsert: true});
        res.json(appEdited);
    }
    catch (error) {
        res.json({ message: error })
    }
})

module.exports = router;