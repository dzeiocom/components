import { Meta } from '@storybook/react/types-6-0'
import { Story } from "@storybook/react"
import React from 'react'
import Component from '.'
import { X } from 'lucide-react'

export default {
	title: 'DZEIO/Input',
	component: Component
} as Meta

export const Input: Story<any> = (args: any) => <Component {...args} />

let tmp = Input.bind({})
tmp.args = {
	label: 'Label',
	helper: 'Helper',
	maxLength: 6,
	// iconLeft: {
	// 	icon: X,
	// 	transformer: (v: string) => v + 1
	// },
	id: 'pouet',
	type: 'number',
	step: 10,
	defaultValue: 'test',
	placeholder: 'test',
	disabled: false
}

export const Normal = tmp

tmp = Input.bind({})
tmp.args = {defaultValue : 'd', label: 'Label', helper: 'Helper', choices: [
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
	{value: '4', display: 'Mai'},
	'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'
], iconLeft: {
	icon: X,
	transformer: (v: string) => {
		console.log("POUET :D")
		return ""
	}
}}

export const AutoComplete = tmp

tmp = Input.bind({})
tmp.args = {label: 'Label', helper: 'Helper', strictChoices: true, choices: [
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
	{value: '4', display: 'Mai'},
	'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'
], iconLeft: {
	icon: X,
	transformer: (v: string) => {
		console.log("POUET :D")
		return ""
	}
}}

export const Select = tmp

tmp = Input.bind({})
tmp.args = {label: 'Label', helper: 'Helper', type: 'number', iconLeft: {
	icon: X,
	transformer: (v: string) => {
		console.log("POUET :D")
		return ""
	}
}}

export const Number = tmp

tmp = Input.bind({})
tmp.args = {block: true, type: 'textarea', defaultValue : 'd', label: 'Label', helper: 'Helper', choices: [
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
	{value: '4', display: 'Mai'},
	'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'
], iconLeft: {
	icon: X,
	transformer: (v: string) => {
		console.log("POUET :D")
		return ""
	}
}}

export const TextArea = tmp
