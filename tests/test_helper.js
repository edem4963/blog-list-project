const Blog = require('../models/blog')

const initialBlogs = [
  {
  "title": "test",
  "author": "ed",
  "url": "some website url",
  "likes": 1200
  },
  {
    "title": "test2",
    "author": "edw",
    "url": "some website url",
    "likes": 1200
  },
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
