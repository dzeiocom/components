import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from './BoxHeader'
import Text from '../Text'
import { Lightbulb } from 'lucide-react'

export default {
	title: 'DZEIO/BoxHeader',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const BoxHeader = (args: any) => (
	<Component titel="Test" {...args} />
)

export const Complete = (args: any) => (
	<Component
		title="Test"
		icon={Lightbulb}
	><Text>Test</Text></Component>
)
