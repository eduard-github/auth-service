import request from 'supertest'
import { app } from '../../app'

it('signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)
})

it('signup - invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'testtest.gmail', password: '12345678' })
    .expect(400)
})

it('signup - invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '1234' })
    .expect(400)
})

it('signup - missing email & password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail' })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({ password: '12345678' })
    .expect(400)
})

it('disallows duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '1234' })
    .expect(400)
})

it('set cookie', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  expect(res.get('Set-Cookie')).toBeDefined()
})
