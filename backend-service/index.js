const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
// app.use(bodyparser.json());
app.use(express.json());

const posts = [
    { 
        id: 1, 
        title: 'Introduction to JavaScript', 
        content: 'JavaScript is a versatile programming language used for web development. It allows developers to add interactivity and dynamic content to websites.' 
    },
    { 
        id: 2, 
        title: 'React.js Tutorial: Building a To-Do App', 
        content: 'Learn how to build a simple to-do application using React.js. This tutorial covers the basics of React components, state management, and event handling.' 
    },
    { 
        id: 3, 
        title: 'CSS Layout Techniques for Responsive Web Design', 
        content: 'Explore different CSS layout techniques to create responsive web designs. Learn how to use flexbox, grid layout, and media queries to build websites that work well on all devices.' 
    },
];

//Get request
app.get("/api/posts", (req, res) => {
    res.status(200).json(posts);
})

app.get("/", (req, res) => {
    res.send("Welcome to the blog!.. check out '/api/posts'");
})

//post request NEXT
app.post("/api/posts", (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json({message:'New post published', posts});
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Backend-service is running on port ${PORT}`);
})