import { app } from '@src/app'
import supertest from 'supertest'

describe('create user controller', () => {
  const payload = {
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password',
  }

  it('POST:200 - should create a user', async () => {
    const { status, body } = await supertest(app).post('/users').send(payload)

    expect(status).toBe(201)
    expect(body).toEqual({
      id: expect.any(String),
      name: payload.name,
      email: payload.email,
    })
  })

  it('POST:400 - should return an error when email is invalid', async () => {
    const { status, body } = await supertest(app)
      .post('/users')
      .send({
        ...payload,
        email: 'invalid-email',
      })

    expect(status).toBe(400)
    expect(body).toEqual({
      email: 'Invalid email',
    })
  })
})
