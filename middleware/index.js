var Comment = require("../models/comment");
var Campground = require("../models/campgrounds");

var middlewareObj = {};

middlewareObj.commentOwenership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.id2c, function (err, foundcomment) {
            if (err) {
                req.flash("error","Unable to find the comment");
                console.log(err);
                res.redirect("back");
            } else {
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","you are not authorized to do that!")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error","you are required to login for that")
        res.redirect("back");
    }
}

middlewareObj.campOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundcamp) {
            if (err) {
                req.flash("error", "campground not found")
                res.redirect("back");
            } else {
                if (foundcamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You are not authorized for that!")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to login for that")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to login to do that!");;
    res.redirect("/login");
}

module.exports = middlewareObj;