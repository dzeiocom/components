import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Box from '../Box'
import Component from '.'

export default {
	title: 'DZEIO/Button',
	component: Component
} as Meta

export const Basic = (args: any) => <Box><Component {...args}>Button</Component></Box>
Basic.args = {
	nomargintop: true,
	icon: Zap,
	size: 'small',
	block: true
}

export const WithImg = (args: any) => <Box><Component {...args}>Button</Component></Box>
WithImg.args = {
	nomargintop: true,
	icon: '/16-16.svg',
	size: 'small',
	block: true
}

export const ExternalLinkButton = (args: any) => <Box><Component {...args}>Button</Component></Box>
ExternalLinkButton.args = {
	nomargintop: true,
	href: 'https://example.com',
	block: true
}
