import request from 'supertest'
import { app } from '../../app'

it('signout - clear cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.gmail', password: '12345678' })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  expect(res.get('Set-Cookie')).toBeDefined()
})
