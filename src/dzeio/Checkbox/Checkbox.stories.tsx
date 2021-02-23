import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Checkbox from '.'

export default {
	title: 'DZEIO/Checkbox',
	component: Checkbox
} as Meta

export const Basic = (args: any) => <Checkbox {...args} />
