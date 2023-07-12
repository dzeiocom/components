import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Box from '../Box'
import Component from '.'

export default {
	title: 'DZEIO/Breadcrumb',
	component: Component
} as Meta

export const Breadcrumb = (args: any) => <Box><Component {...args}>Button</Component></Box>
Breadcrumb.args = {
	items: [{
		display: "Pouet",
		href: '/pouet'
	}, {
		display: "Pouet",
	}]
}
