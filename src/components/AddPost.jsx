import React, { useState } from "react";

const AddPost = ({ posts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const makePosts = async() => {
      const newPost = {
        title,
        content,
        id: posts.length + 1
      };
      try{
        await fetch('http://localhost:3002/api/posts', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
        // console.log('post sent successfully');
        setSuccess(true);
      } catch(err){
        console.error('Error sending new post', err);
        setError(true);
      }
    }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please enter both title and content");
      return;
    }
    await makePosts();
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-1 py-3 my-2 border">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-700 hover:text-blue-600">Title</label>
            <input
              type="text"
              className="mt-1 p-2 text-lg block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-700 hover:text-blue-600">Content</label>
            <textarea
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg p-2"
              rows="3"
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
          >
            Publish
          </button>
        </form>
        {success && <div className="py-2 border border-green-600 mt-1">New Blog article Published Successfully...</div>}
    </div>
  );
};

export default AddPost;