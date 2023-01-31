import request from 'supertest'
import { app } from '../../app'

it('signin - invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'testtest.gmail', password: '12345678' })
    .expect(400)
})

it('signin - invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.gmail', password: '1234' })
    .expect(400)
})

it('signin - missing email & password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.gmail' })
    .expect(400)

  await request(app)
    .post('/api/users/signin')
    .send({ password: '12345678' })
    .expect(400)
})

it('signin - email does not exist', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(400)
})

it('signin - incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.gmail', password: '123456789' })
    .expect(400)
})

it('set cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(200)

  expect(res.get('Set-Cookie')).toBeDefined()
})
