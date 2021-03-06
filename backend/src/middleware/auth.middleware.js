import config from 'config'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'No authorization' })
		}
		const decodedToken = jwt.verify(token, config.get('jwtSecret'))
		req.user = decodedToken
		next()
	} catch (error) {
		return res.status(401).json({ message: 'No authorization' })
	}
}
