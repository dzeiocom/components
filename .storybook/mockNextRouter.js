import Router from 'next/router'

Router.router = {
	push: async (route) => {
		console.log('Pushing router to', route)
	},
	replace: async () => {},
	prefetch: () => {},
	route: '/mock-route',
	asPath: '/mock-route',
	pathname: 'mock-path',
}
