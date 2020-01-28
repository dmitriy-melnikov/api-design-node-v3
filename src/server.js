import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

const { log } = console

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const logMiddleware = (req, res, next) => {
  log('logger')
  next()
}

app.use(logMiddleware)

/*router
  .route('/cat')
  .get()
  .post()
  .put()
  .delete()*/

// app.use('/api', router)
app.use(router)

router.get('/me', (req, res) => {
  res.send({
    me: 'hello'
  })
})

app.get('/', (req, res, next) => {
  res.send({
    message: `hello world1`
  })
  next()
})
app.get('/', (req, res) => {
  res.send({
    message: `hello world2`
  })
})

app.post('/', (req, res) => {
  log(req.body)
  res.send({
    message: 'ok'
  })
})

export const start = () => {
  app.listen(3000, () => log('express listen on localhost:3000'))
}
