const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/loggers')


blogsRouter.get('/', async (request, response) => {
    const blogs =  await Blog.find({})
    response.json(blogs)  
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id 
     
    })
  
    const savedBlog =  await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  })

  module.exports = blogsRouter