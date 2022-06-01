import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/useHttp'
import styles from './createPage.module.scss'

const CreatePage = () => {
	const [link, setLink] = useState('')
	const [result, setResult] = useState('')
	const auth = useContext(AuthContext)
	const { request } = useHttp()

	const pressHandler = async event => {
		if (event.key === 'Enter') {
			try {
				const data = await request(
					'/api/link/generate',
					'POST',
					{ from: link },
					{ Authorization: `Bearer ${auth.token}` }
				)
				setResult(data.link.result)
			} catch (e) {}
			setLink('')
		}
	}

	return (
		<div>
			<span className={styles.title}>Create</span>
			<br />
			<span className={styles.subtitle}>Your Link</span>
			<div className='w-full mt-20 mb-10'>
				<input
					className={styles.input}
					type='text'
					value={link}
					placeholder='Your link'
					onChange={e => setLink(e.target.value)}
					onKeyDown={pressHandler}
				/>
			</div>
			{result && (
				<p className={styles.result}>
					<a
						href={`${result}`}
						target='_blank'
						rel='noreferrer'
						className='pointer-events-auto'
					>
						{result}
					</a>
				</p>
			)}
		</div>
	)
}

export default CreatePage
