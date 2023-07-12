import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Component from '.'

export default {
	title: 'DZEIO/Loader',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	},
	argTypes: {
		percent: { control: 'number'}
	},
} as Meta

export const Loader: Story<any> = (args: any) => <Component {...args} />
