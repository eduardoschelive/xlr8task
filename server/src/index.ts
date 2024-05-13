import { env } from './env'
import { startServer } from './server'

startServer(env.SERVER_PORT)
