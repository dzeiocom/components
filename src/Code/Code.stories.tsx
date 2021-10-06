import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Code',
	component: Component,
	argTypes: {
		content: { control: 'text', defaultValue: 'Code Block'}
	}
} as Meta

export const Basic = (args: any) => {
	const content = args.content
	delete args.content

	return (
		<Component {...args}>{content}</Component>
	)
}
