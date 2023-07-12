import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
	title: 'DZEIO/Scrollbar',
	parameters: {
		layout: 'fullscreen'
	}
} as Meta

export const Scrollbar: Story<any> = (args: any) => <div style={{height: '1000vh'}} />
