var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Todo = require("../models/todo");
var User = require("../models/user");
const { route } = require("./comment");

// jQuery problem =================== //

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

//  Todo ====================

router.get("/notes", middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("todos").exec(function(err, user){
        if(err){
            console.log(err)
        }else{
            res.render("notes/note", {
                user: user,
                Todo: Todo,
                $: $
            });
        }
    })
})


router.post("/notes",middleware.isLoggedIn, function(req, res){
    var newtodo = req.body.newtodo;
    Todo.create({
        todo: newtodo
    }, function(err, todo){
        if(err){
            console.log(err)
        }else{
            User.findById(req.user._id, function(err, user){
                if(err){
                    console.log(err)
                }else{
                    user.todos.push(todo);
                    user.save();
                    res.redirect("/notes");
                }
            })
        }
    })
})

//todo delete ==================/

router.delete("/notes",middleware.isLoggedIn, function(req, res){
    Todo.findByIdAndDelete(req.body.tododelid, function(err){
        if(err){
            console.log(err)
        }else{
            User.update({_id: req.user._id},{$pull: {todos: req.body.tododelid}}, function(err, user){
                if(err){
                    req.flash("error", "todo reference not removed");
                    res.redirect("/notes");
                }else{
                    res.redirect("/notes");
                }
            })
        }
    })
})  

module.exports = router;