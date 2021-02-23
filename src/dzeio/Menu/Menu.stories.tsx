import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Menu',
	component: Component,
	argTypes: {
		content: {control: 'array', defaultValue: [{name: 'Name', href: 'https://www.google.com'}]}
	}
} as Meta

export const Basic = (args: any) => <Component {...args} />
