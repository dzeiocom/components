import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Navbar',
	component: Component
} as Meta

export const Basic = (args: any) => <Component {...args} />
