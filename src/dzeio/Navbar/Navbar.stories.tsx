import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Navbar',
	component: Component
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />
Basic.args = {
	items: [{
		path: '/dashboard',
		name: 'Dasboard'
	}],
	loginUrl: '/login',
	registerUrl: '/register',
	type: 'navbar',
	user: {
		name: 'Username',
		description: 'User Description',
		menu: {
			links: [{
				path: '/logout',
				name: 'Logout'
			}]
		}
	},
	logo: {src: '/90-38.svg', width: 90, height: 38}
}
