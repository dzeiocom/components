import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'
import Text from '../Text'

export default {
	title: 'DZEIO/Container',
	component: Component,
	argTypes: {
		title: { control: 'text'}
	},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Container = (args: any) => (
	<Component {...args}><Text>Test</Text></Component>
)
