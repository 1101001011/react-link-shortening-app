import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import styles from './navbar.module.scss'

const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)

	const logoutHandler = e => {
		e.preventDefault()
		auth.logout()
		navigate('/')
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.wrapper}>
				<span className='text-3xl'>CYL</span>
				<ul className='flex text-zinc-500'>
					<li className='mx-6 hover:text-white'>
						<NavLink to='/create'>Create</NavLink>
					</li>
					<li className='mx-6 hover:text-white'>
						<NavLink to='/links'>Links</NavLink>
					</li>
					<li className='mx-6 hover:text-white'>
						<NavLink to='/about'>About</NavLink>
					</li>
				</ul>
				<button onClick={logoutHandler}>Sign Out</button>
			</div>
		</nav>
	)
}

export default Navbar
