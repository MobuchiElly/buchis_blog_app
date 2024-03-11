import { useState } from 'react'
import AddPost from './components/AddPost';
import Getposts from './components/Getposts'

function Index() {
  const [posts, setPosts] = useState([])
  const allPosts = (val) => {
    setPosts(val);
  }

  return (
    <div className='p-1 px-2'>
      <Getposts allPosts={allPosts}/>
      <AddPost posts={posts}/>
    </div>
  )
}

export default Index;