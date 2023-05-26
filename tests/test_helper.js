const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}
