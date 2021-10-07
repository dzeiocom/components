import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'
import Text from '../Text'
import { Lightbulb } from 'lucide-react'

export default {
	title: 'DZEIO/Box',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Box = (args: any) => (
	<Component {...args}><Text>Test</Text></Component>
)

export const Complete = (args: any) => (
	<Component
		title="Test"
		icon={Lightbulb}
		rightHeader={<Text>Test</Text>}
		// {...args}
	><Text>Test</Text></Component>
)
