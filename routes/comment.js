    const express = require("express");
const router = express.Router({
    mergeParams: true
});
const Campground = require("../models/campgrounds");
const Comment = require("../models/comment");
var middleware = require("../middleware")


//  New Comment (form) ===============

router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/commentform", {
                campground: campground
            })
        }
    })
})


//  Comment Create ---------------

router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error","something went wrong")
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment)
                    campground.save();
                    req.flash("success","comment added")
                    res.redirect("/camps/" + req.params.id);
                }
            })
        }
    })
})


// Update Comments (FORM) =================

router.get("/:id2c/edit", middleware.commentOwenership, function (req, res) {
    Comment.findById(req.params.id2c, function (err, foundcomment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/editcommentform", {
                comment: foundcomment,
                campground_id: req.params.id
            });
        }
    })
})

//  Update Comment Logic =======================

router.put("/:id2c", middleware.commentOwenership,function (req, res) {
    Comment.findByIdAndUpdate(req.params.id2c, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/camps/" + req.params.id);
        }
    })
})

// Delete Comment =====================

router.delete("/:id2c", middleware.commentOwenership, function(req, res){
    Comment.findByIdAndDelete(req.params.id2c, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
         Campground.update({_id: req.params.id}, {$pull: {comments: req.params.id2c}}, function(err, campground){
            if(err){
                req.flash("error", "did not removed comment reference");
                res.redirect("/camps/" + req.params.id);
            }else{
                req.flash("success","comment removed")
                res.redirect("/camps/" + req.params.id);
            }
         })
        }
    })
})



//  Middleware --------------------

module.exports = router;