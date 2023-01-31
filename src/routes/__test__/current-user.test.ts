import request from 'supertest'
import { app } from '../../app'

it('get current user', async () => {
  const authRes = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  const cookie = authRes.get('Set-Cookie')

  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(res.body.currentUser.email).toEqual('test@test.gmail')
})

it('current user null', async () => {
  const res = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(res.body.currentUser).toEqual(null)
})
