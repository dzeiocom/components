import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'
import Input from '../Input'

export default {
	title: 'DZEIO/Fieldset',
	component: Component,
	argTypes: {
		title: { control: 'text'}
	}
} as Meta

export const Basic = (args: any) => (
	<Component {...args}><Input label="Test" /></Component>
)
