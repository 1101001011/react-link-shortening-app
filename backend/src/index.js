import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import path from 'path'
import authRouter from './routes/auth.routes.js'
import { cors } from './middleware/cors.middleware.js'
import linksRouter from './routes/links.routes.js'
import { authMiddleware } from './middleware/auth.middleware.js'
import redirectRouter from './routes/redirect.routes.js'

const app = express()
const PORT = config.get('serverPort')

app.use(cors)
app.use(express.json({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/link', authMiddleware, linksRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, '../client/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
	})
}

const start = async () => {
	try {
		await mongoose.connect(config.get('dbURI'))
		app.listen(PORT, () => console.log('server running on port', PORT))
	} catch (e) {
		console.log(e)
	}
}

start()
