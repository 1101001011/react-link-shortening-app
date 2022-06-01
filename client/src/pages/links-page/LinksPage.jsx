import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'
import { AuthContext } from '../../context/AuthContext'
import LinksList from '../../components/links-list/LinksList'
import Loader from '../../components/loader/Loader'

const LinksPage = () => {
	const [links, setLinks] = useState([])
	const { request, isLoading } = useHttp()
	const { token } = useContext(AuthContext)
	const [ready, setReady] = useState(false)

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link/all', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			setLinks(fetched)
		} catch (e) {}
	}, [token, request])

	useEffect(() => {
		fetchLinks()
		setReady(true)
	}, [fetchLinks])

	if (isLoading) {
		return <Loader />
	}

	return (
		<>
			{!isLoading && ready && <LinksList links={links} setLinks={setLinks} />}
		</>
	)
}

export default LinksPage
