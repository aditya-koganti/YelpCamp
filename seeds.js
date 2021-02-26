var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var camps = [
    {
        name: "Flames",
        img: "https://images.unsplash.com/photo-1536065018553-5b54b5df1b1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1010&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cum recusandae architecto expedita voluptate tempora nemo ipsum voluptatibus veritatis accusamus explicabo optio ut quos, voluptatem vero soluta, est porro provident nobis reprehenderit nam. Molestiae inventore asperiores at, in reiciendis sunt maxime repellendus magni voluptates explicabo, quas nesciunt officiis aut repellat deserunt consectetur, voluptas fugit quidem modi quis quos! Tempore aliquid reprehenderit ut mollitia incidunt iusto est, provident voluptatem? Sapiente accusantium voluptas numquam, optio molestias recusandae nam consequuntur dolor provident nostrum? Ex eveniet aspernatur quam adipisci aut, est natus ut, debitis veniam eum neque corrupti nisi officiis iusto alias, dolorem fugiat."
    },
    {
        name: "Lights",
        img: "https://images.unsplash.com/photo-1517217451453-818405428795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cum recusandae architecto expedita voluptate tempora nemo ipsum voluptatibus veritatis accusamus explicabo optio ut quos, voluptatem vero soluta, est porro provident nobis reprehenderit nam. Molestiae inventore asperiores at, in reiciendis sunt maxime repellendus magni voluptates explicabo, quas nesciunt officiis aut repellat deserunt consectetur, voluptas fugit quidem modi quis quos! Tempore aliquid reprehenderit ut mollitia incidunt iusto est, provident voluptatem? Sapiente accusantium voluptas numquam, optio molestias recusandae nam consequuntur dolor provident nostrum? Ex eveniet aspernatur quam adipisci aut, est natus ut, debitis veniam eum neque corrupti nisi officiis iusto alias, dolorem fugiat."
    },
    {
        name: "Sunny",
        img: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cum recusandae architecto expedita voluptate tempora nemo ipsum voluptatibus veritatis accusamus explicabo optio ut quos, voluptatem vero soluta, est porro provident nobis reprehenderit nam. Molestiae inventore asperiores at, in reiciendis sunt maxime repellendus magni voluptates explicabo, quas nesciunt officiis aut repellat deserunt consectetur, voluptas fugit quidem modi quis quos! Tempore aliquid reprehenderit ut mollitia incidunt iusto est, provident voluptatem? Sapiente accusantium voluptas numquam, optio molestias recusandae nam consequuntur dolor provident nostrum? Ex eveniet aspernatur quam adipisci aut, est natus ut, debitis veniam eum neque corrupti nisi officiis iusto alias, dolorem fugiat."  
    }
]

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log("remove error \n", err)
        }
        console.log("campgrounds removed");
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("comments removed");
            camps.forEach(function(camp){
                Campground.create(camp,function(err, campground){
                    if(err){
                        console.log("seeds create error\n",err)
                    }else{
                        console.log("camp created");
                        Comment.create({
                            text: "huh..; definatly need an internet here or i can't survive bro!!",
                            author: "someone"
                        },function(err, comment){
                            if(err){
                                console.log("seed comment\n",err)
                            }else{
                                console.log("comment created");
                                campground.comments.push(comment);
                                campground.save();
                            }
                        })
                    }
                })
            })
        })
    })
}

module.exports = seedDB;