import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'

export default {
	title: 'DZEIO/Image',
	component: Component
} as Meta

export const Image: Story<any> = (args: any) => <Component imageProps={{src: '/90-38.svg', width: 90, height: 38}} fullscreen {...args} />
