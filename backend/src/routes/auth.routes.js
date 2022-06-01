import config from 'config'
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

const authRouter = Router()

// http://localhost:5000/api/auth/register
authRouter.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'Invalid password').isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid data during registration',
				})
			}
			const { email, password } = req.body
			const candidate = await User.findOne({ email })
			if (candidate) {
				res.status(400).json({ message: 'Email is already taken' })
				return
			}
			const hashedPassword = await bcrypt.hash(password, 8)
			const user = new User({ email, password: hashedPassword })
			await user.save()

			return res.status(201).json({ message: 'User was created' })
		} catch (e) {
			res.status(500).json({ message: e.message })
		}
	}
)

// http://localhost:5000/api/auth/login
authRouter.post(
	'/login',
	[
		check('email', 'Invalid email').normalizeEmail().isEmail(),
		check('password', 'Invalid password').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid data during login',
				})
			}
			const { email, password } = req.body
			const user = await User.findOne({ email })
			if (!user) {
				return res
					.status(400)
					.json({ message: 'User with this email does not exist' })
			}
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid password' })
			}
			const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), {
				expiresIn: '1h',
			})
			return res.json({ token, userId: user._id })
		} catch (e) {
			res.status(500).json({ message: e.message })
		}
	}
)

export default authRouter
