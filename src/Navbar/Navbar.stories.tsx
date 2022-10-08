import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap, ZapOff } from 'lucide-react'
import Component from '.'
import Text from '../Text'
import Col from '../Col'
import Row from '../Row'

export default {
	title: 'DZEIO/Navbar',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Navbar: Story<any> = (args: any) => <Component {...args} />
Navbar.args = {
	logo: {src: '/90-38.svg', width: 90, height: 38},
	user: {
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
	children: (
		<Row align='center'>
			<Col><Text>Test</Text></Col>
			<Col><Text>Test</Text></Col>
			<Col><Text>Test</Text></Col>
			<Col><Text>Test</Text></Col>
		</Row>
	)
}
