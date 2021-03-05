import { Meta } from '@storybook/react/types-6-0'
import { Story } from "@storybook/react"
import React from 'react'
import Component from '.'
import { X } from 'react-feather'

export default {
	title: 'DZEIO/Input',
	component: Component
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />

let tmp = Basic.bind({})
tmp.args = {label: 'Label', helper: 'Helper', maxLength: 6, characterCount: true, icon: X}

export const Normal = tmp

tmp = Basic.bind({})
tmp.args = {label: 'Label', filled:true, helper: 'Helper', autocomplete: ['a', 'b', 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'], characterCount: true, icon: X}

export const AutoComplete = tmp

export const Select: Story<any> = (args: any) => <Component type="select" {...args}>
	<option>a</option>
	<option>b</option>
	<option>c</option>
	<option>d</option>
</Component>