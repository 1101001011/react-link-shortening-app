import React from 'react'

const AboutPage = () => {
	return (
		<div className='text-white flex flex-col'>
			<span className='text-4xl'>Link Shortening App</span>
			<span>Version: 1.0.0</span>
			<span className='mt-10'>
				Author:{' '}
				<a href='https://github.com/1101001011' className='underline text-lg'>
					Briley
				</a>
			</span>
		</div>
	)
}

export default AboutPage
