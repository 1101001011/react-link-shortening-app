import { Router } from 'express'
import Link from '../models/Link.js'

const redirectRouter = Router()

redirectRouter.get('/:code', async (req, res) => {
	try {
		const link = await Link.findOne({ code: req.params.code })
		if (link) {
			link.clicks++
			await link.save()
			res.redirect(link.from)
		} else {
			res.status(404).send('Link not found')
		}
	} catch (e) {}
})

export default redirectRouter
