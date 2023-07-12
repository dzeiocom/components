import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import CheckboxReact from '.'

export default {
	title: 'DZEIO/Checkbox',
	component: CheckboxReact
} as Meta

export const Checkbox = (args: any) => <CheckboxReact {...args} />
