import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Footer',
	component: Component,
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />

let tmp = Basic.bind({})
tmp.args = {links: [{name: 'test1', path: '/'}, {name: 'test2', path: '/'}, {name: 'test3', path: '/'}]}

export const Normal = tmp
