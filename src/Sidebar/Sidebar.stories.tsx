import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Zap, ZapOff } from 'lucide-react'
import Component from '.'

export default {
	title: 'DZEIO/Sidebar',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Sidebar: Story<any> = (args: any) => <Component {...args} />
Sidebar.args = {
	logo: {src: '/90-38.svg', width: 90, height: 38},
	user: {
		picture: '/16-16.svg',
		name: 'Username',
		menu: [{
			path: '/logout',
			value: 'Logout'
		}, {
			path: '/logout',
			value: 'Logout'
		}]
	},
	menu: [{
		name: 'Dasboard',
		icon: Zap
	}, {
		name: 'With Childs',
		icon: Zap,
		subMenu: [{
			name: 'Child 1'
		}, {
			name: 'Child with link',
			path: '/dashboard'
		}]
	}, {
		path: '/dashboard',
		name: 'Link',
		icon: ZapOff
	}],
	// fullWidth: true
}
