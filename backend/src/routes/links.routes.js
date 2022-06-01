import config from 'config'
import shortid from 'shortid'
import Link from '../models/Link.js'
import { Router } from 'express'

const linksRouter = Router()

linksRouter.post('/generate', async (req, res) => {
	try {
		const baseUrl = config.get('baseURL')
		const { from } = req.body

		const code = shortid.generate()
		const existing = await Link.findOne({ from })

		if (existing) {
			return res.json({ link: existing })
		}
		const result = baseUrl + '/t/' + code
		const link = new Link({ code, from, result, owner: req.user.userId })

		await link.save()

		res.status(201).json({ link })
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong' })
	}
})

linksRouter.get('/all', async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId })
		res.json(links)
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong' })
	}
})

linksRouter.delete('/all/:id', async (req, res) => {
	try {
		const link = await Link.findById(req.params.id)
		if (!link) {
			return res.status(404).json({ message: 'Link not found' })
		}
		await Link.findByIdAndDelete(req.params.id)
		res.json({ message: 'Link deleted' })
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong' })
	}
})

export default linksRouter
