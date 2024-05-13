import cors from 'cors'
import express from 'express'
import { errorHandler, notFoundMiddleware } from './middleware'
import { tagRouter, taskRouter } from './router'

const app = express()

app.use(express.json())
app.use(cors())

app.use(taskRouter)
app.use(tagRouter)

app.use(notFoundMiddleware)
app.use(errorHandler)

export const startServer = async (port: string) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
