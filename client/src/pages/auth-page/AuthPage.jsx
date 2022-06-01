import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/useHttp'
import styles from './authPage.module.scss'

const AuthPage = () => {
	const [form, setForm] = React.useState({ email: '', password: '' })
	const { request, isLoading, error } = useHttp()
	const auth = useContext(AuthContext)

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const registerHandle = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			console.log(data.message)
		} catch (e) {}
	}

	const loginHandle = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
		} catch (e) {}
	}

	return (
		<div className={styles.wrapper}>
			<img src='images/auth_bg.png' alt='' className={styles.bg__image} />
			<h1 className='text-9xl text-white font-black'>
				Create
				<br />
				Yo<span className='text-black'>ur</span>
				<br />
				<span className='text-black'>L</span>inks
			</h1>
			<div className={styles.modal}>
				<h1 className={styles.modal__title}>Authorization</h1>
				<input
					className='input'
					type='text'
					placeholder='email'
					name='email'
					onChange={e => handleChange(e)}
				/>
				<input
					className='input'
					type='password'
					placeholder='password'
					name='password'
					onChange={e => handleChange(e)}
				/>
				{error && <div className={styles.modal__error}>{error}</div>}
				<div className='mt-10'>
					<button
						className='btn-primary mr-4'
						onClick={loginHandle}
						disabled={isLoading}
					>
						Login
					</button>
					<button
						className='btn-primary'
						onClick={registerHandle}
						disabled={isLoading}
					>
						Registration
					</button>
				</div>
			</div>
			<div className={styles.art__author}>
				<p>Art by</p>&nbsp;
				<a
					href='https://www.behance.net/franciscorossi'
					className={styles.author}
				>
					Fran Rossi
				</a>
			</div>
		</div>
	)
}

export default AuthPage
