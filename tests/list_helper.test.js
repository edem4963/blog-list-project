const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
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

test('HTTP POST creates a new post', async () => {
  const newBlog = {
    "title": "test",
    "author": "ed",
    "url": "some website url",
    "likes": 1200
}
  const response =  await api.post('/api/blogs')
                      .send(newBlog)
                      .expect(201)

})

/* test('Deletion of a post', async () => {
  await api
  .delete(`/api/notes/${noteToDelete.id}`)
  .expect(204)

}) */

afterAll(async () => {
  await mongoose.connection.close()
})