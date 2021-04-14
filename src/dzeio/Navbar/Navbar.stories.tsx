import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap, ZapOff } from 'react-feather'
import Component from '.'
import Text from '../Text'

export default {
	title: 'DZEIO/Navbar',
	component: Component
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />
Basic.args = {
	type: 'navbar',
	logo: {src: '/90-38.svg', width: 90, height: 38},
	loginUrl: '/login',
	registerUrl: '/register',
	user: {
		name: 'Username',
		description: 'User Description',
		menu: {
			links: [{
				path: '/logout',
				name: 'Logout'
			}, {
				path: '/logout',
				name: 'Logout'
			}],
			informations: (<Text>Testing :D</Text>)
		}
	},
	items: [{
		path: '/dashboard',
		name: 'Dasboard',
		icon: Zap
	}, {
		path: '/dashboard',
		name: 'Dasboard',
		icon: ZapOff
	}],
}
