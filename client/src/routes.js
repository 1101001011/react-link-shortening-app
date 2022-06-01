import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/about-page/AboutPage'
import AuthPage from './pages/auth-page/AuthPage'
import CreatePage from './pages/create-page/CreatePage'
import LinksPage from './pages/links-page/LinksPage'

export const useRoutes = isAuth => {
	return (
		<Routes>
			{isAuth ? (
				<Route>
					<Route path='/create' element={<CreatePage />} />
					<Route path='/links' element={<LinksPage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='*' element={<CreatePage />} />
				</Route>
			) : (
				<Route>
					<Route path='/auth' element={<AuthPage />} />
					<Route path='*' element={<AuthPage />} />
				</Route>
			)}
		</Routes>
	)
}
