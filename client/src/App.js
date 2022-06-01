import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/navbar/Navbar'
import Loader from './components/loader/Loader'

const App = () => {
	const { token, userId, login, logout, ready } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader />
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				userId,
				login,
				logout,
				isAuthenticated,
			}}
		>
			<BrowserRouter>
				{isAuthenticated && <Navbar />}
				<div className='max-w-5xl mx-auto'>{routes}</div>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
