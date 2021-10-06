import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Zap } from 'lucide-react'
import Component from '.'

export default {
	title: 'DZEIO/Loader',
	component: Component,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Basic: Story<any> = (args: any) => <Component {...args} />

let tmp = Basic.bind({})
tmp.args = {
	auto: {interval : [10, 100], increment: [0, 5]}
}

export const Auto = tmp
