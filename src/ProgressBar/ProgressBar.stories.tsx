import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Progress Bar',
	component: Component,
	argTypes: {
		progress: { control: 'number', defaultValue: 0},
		noRoundBorders: { control: 'boolean'},
	},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const ProgressBar = (args: any) => (
	<Component {...args} />
)
