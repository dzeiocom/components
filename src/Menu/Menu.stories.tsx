import { Meta } from '@storybook/react/types-6-0'
import { XOctagon } from 'lucide-react'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Menu',
	component: Component
} as Meta

const list: Component['props']['items'] = [
	{value: 'Menu item 1'},
	{value: 'Menu with link', icon: XOctagon, href: '/'},
	{value: 'Menu item 3', icon: XOctagon},
	{value: 'Menu item 4', icon: XOctagon},
	{value: 'Menu item 5', selected: true, icon: XOctagon},
	{value: 'Menu item 6', icon: XOctagon},
	{value: 'Menu item 7', icon: XOctagon},
	{value: 'Menu item 8', icon: XOctagon},
	{value: 'Menu item 9', icon: XOctagon},
	{value: 'Menu item 10', icon: XOctagon}
]

export const Menu = (args: any) => (
	<Component outline {...args} items={list} onClick={(_, index) => list[index].selected = !list[index].selected} />
)
