import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Progress Box',
	component: Component,
	argTypes: {
		progress: { control: 'number', defaultValue: 0},
		text: { control: 'text'},
		textProgress: { control: 'text'},
	},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const ProgressBox = (args: any) => (
	<Component {...args} />
)
