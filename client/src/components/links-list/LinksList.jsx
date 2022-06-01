import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/useHttp'
import Loader from '../loader/Loader'
import styles from './linksList.module.scss'

const LinksList = ({ links, setLinks }) => {
	const { request, isLoading } = useHttp()
	const { token } = useContext(AuthContext)

	const deleteLink = async id => {
		try {
			await request(`/api/link/all/${id}`, 'DELETE', null, {
				Authorization: `Bearer ${token}`,
			})
			setLinks(links.filter(link => link._id !== id))
		} catch (e) {}
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<div>
			<div className='grid-row'>
				<div className='bg-yellow-200 py-2 text-center'>#</div>
				<div className='bg-blue-200 px-4 py-2'>Origin</div>
				<div className='bg-lime-200 px-4 py-2'>Short</div>
				<div className='bg-white py-2 text-center'>Clicks</div>
				<div className='bg-orange-200 py-2 text-center'>Delete</div>
			</div>
			{!links.length && <div className={styles.no__links}>No links</div>}
			{links.map((link, index) => {
				return (
					<div key={index} className='grid-row my-4'>
						<div className={styles.link__index}>{index + 1}</div>
						<div className='py-4 px-4 grid-item'>{link.from}</div>
						<div className={styles.link__result}>
							<a href={`${link.result}`} target='_blank' rel='noreferrer'>
								{link.result}
							</a>
						</div>
						<div className={styles.link__clicks}>{link.clicks}</div>
						<div
							className={styles.link__delete}
							onClick={() => deleteLink(link._id)}
						>
							&times;
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default LinksList
