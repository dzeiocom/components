import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Component from '.'

export default {
	title: 'DZEIO/Button',
	component: Component
} as Meta

export const Basic = (args: any) => <Component {...args}>Button</Component>
Basic.args = {
	nomargintop: true,
	icon: Zap,
	size: 'small',
	block: true
}

export const WithImg = (args: any) => <Component {...args}>Button</Component>
WithImg.args = {
	nomargintop: true,
	icon: '/16-16.svg',
	size: 'small',
	block: true
}

export const ExternalLinkButton = (args: any) => <Component {...args}>Button</Component>
ExternalLinkButton.args = {
	nomargintop: true,
	href: 'https://example.com',
	block: true
}
