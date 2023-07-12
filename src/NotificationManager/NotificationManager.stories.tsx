import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Component from '.'

export default {
	title: 'DZEIO/NotificationManager',
	component: Component
} as Meta

export const NotificationManager = (args: any) => <Component {...args} />
NotificationManager.args = {
	ttl: 999999999999,
	notifications: [
		'Test',
		'LArge text lorem ipsum dolor sit amet, i dont know what to type yolo :D'
	]
}
