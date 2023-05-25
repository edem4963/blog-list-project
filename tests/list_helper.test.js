const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('verifies that the unique identifier property is named id', async () => {
   const response = await api.get('/api/blogs');
   response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  })
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('HTTP POST creates a new post', async () => {
  const newBlog = {
    "title": "test",
    "author": "ed",
    "url": "some website url",
    "likes": 1200
  }
  await api.post('/api/blogs')
          .send(newBlog)
          .expect(201)
  const response =  await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

/* test('Deletion of a post', async () => {
  await api
  .delete(`/api/notes/${noteToDelete.id}`)
  .expect(204)

}) */

afterAll(async () => {
  await mongoose.connection.close()
})