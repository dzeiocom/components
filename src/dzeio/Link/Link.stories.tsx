import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Link',
	component: Component,
	argTypes: {
		href: {control: 'text', defaultValue: 'https://www.dzeio.com'},
		text: {control: 'text', defaultValue: 'Dzeio'},
		external: {control: 'boolean'},
		hideIcon: {control: 'boolean'}
	}
} as Meta

export const Basic = (args: any) => <Component {...args}>{args.text}</Component>
