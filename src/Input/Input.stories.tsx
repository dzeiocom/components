import { Meta } from '@storybook/react/types-6-0'
import { Story } from "@storybook/react"
import React from 'react'
import Component from '.'
import { X } from 'lucide-react'

export default {
	title: 'DZEIO/Input',
	component: Component
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />

let tmp = Basic.bind({})
tmp.args = {label: 'Label', helper: 'Helper', maxLength: 6, iconLeft: {
	icon: X,
	transformer: (v: string) => v + 1
}}

export const Normal = tmp

tmp = Basic.bind({})
tmp.args = {label: 'Label', filled:true, helper: 'Helper', choices: [
	'a',
	'a',
	'a',
	'a',
	'a',
	'a',
	'a',
	'a',
	'b',
	{value: 'd', display: 'D'},
	'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'
], characterCount: true, iconLeft: X}

export const AutoComplete = tmp
