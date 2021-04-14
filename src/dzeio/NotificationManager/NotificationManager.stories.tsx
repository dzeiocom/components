import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'react-feather'
import Component from '.'

export default {
	title: 'DZEIO/NotificationManager',
	component: Component
} as Meta

export const Basic = (args: any) => <Component {...args} />
Basic.args = {
	ttl: 999999999999,
	notifications: [
		'Test',
		'LArge text lorem ipsum dolor sit amet, i dont know what to type yolo :D'
	]
}