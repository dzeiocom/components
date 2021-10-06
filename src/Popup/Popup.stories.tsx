import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Component from '.'
import Text from '../Text'

export default {
	title: 'DZEIO/Popup',
	component: Component
} as Meta

export const Basic = (args: any) => (
	<Component><Text>Test</Text></Component>
)
