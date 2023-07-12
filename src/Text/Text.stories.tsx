import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Text',
	component: Component
} as Meta

export const Text = (args: any) => (
	<>
		<Component {...args}>TExt</Component>
		<Component {...args}>TExt</Component>
	</>
)
