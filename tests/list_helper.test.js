const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


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

afterAll(async () => {
  await mongoose.connection.close()
})