import React, { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner'

const Getposts = ({allPosts}) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  
  const fetchPosts = () => {
    fetch('http://localhost:3002/api/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        allPosts(data);
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
      {!posts.length && <div className="mb-2">
        <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
        <div className="">Loading blog posts......<span className="italic">please wait</span></div>
      </div>}
      {posts && <ul className="text-lg">
        {posts.map((post) => (
          <ul key={post.id} className="my-3">
            <li className="hover:text-blue-600 text-xl font-semibold">{post.title}</li>
            <li>{post.content}</li>
          </ul>
        ))}
      </ul>}
    </div>
  );
};

export default Getposts;