import React, { useState, useEffect } from "react";

const Getposts = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    fetch("http://localhost:3002/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log('successfully fetched posts', data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-1">
      <h1 className="text-black mt-1 mb-3 text-3xl font-bold">Blog Posts</h1>
      
      <ul className="text-lg">
        {posts.map((post) => (
          <ul key={post.id} className="my-3">
            <li className="hover:text-blue-600 text-xl font-semibold">{post.title}</li>
            <li>{post.content}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Getposts;