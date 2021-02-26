const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
var middleware = require("../middleware")   


// All Camps ==============

router.get("/", function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log("err");
        } else {
            res.render("campgrounds/index", {
                campgrounds: allcampgrounds, page: 'campgrounds'
            });
        }
    })
})


//  New Camp (form) ===========

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/postpage");
})


//  Camp Logic =================

router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var imgLink = req.body.imgLink;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamps = {
        name: name,
        img: imgLink,
        description: desc,
        author: author,
        price: price
    };
    Campground.create(newCamps, function (err, createdcamp) {
        if (err) {
            console.log("create error!!");
            console.log(err)
        } else {
            req.flash("success","Successfully added the Camp")
            res.redirect("/camps");
        }
    })
})


//  Camp info ==================

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, idcampground) {
        if (err) {
            console.log("id find failed");
            console.log(err);
        } else {
            res.render("campgrounds/moreinfo", {
                campground: idcampground
            })
        }
    })
})

// Update Camp ==============

router.get("/:id/edit", middleware.campOwnership, function (req, res) {
    Campground.findById(req.params.id, function(err, foundcamp){
        res.render("campgrounds/editform", {
            campground: foundcamp
        });
    })
})

// Update logic ===============

router.put("/:id", middleware.campOwnership, function (req, res) {
    req.body.camp.description = req.sanitize(req.body.camp.description);
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function (err, updatedcamp) {
        if (err) {
            console.log("update err", err);
        } else {
            res.redirect("/camps/" + req.params.id);
        }
    })
})


//  Delete Camp ============

router.delete("/:id", middleware.campOwnership, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err);
            alert("not removed");
            res.redirect("/camps");
        } else {
            req.flash("success","successfully removed a camp");
            res.redirect("/camps");
        }
    })
})

module.exports = router;