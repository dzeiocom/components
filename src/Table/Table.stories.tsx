import { Meta } from '@storybook/react/types-6-0'
import { Settings } from 'lucide-react'
import React from 'react'
import Component from '.'
import Box from '../Box'

export default {
	title: 'DZEIO/Table',
	component: Component
} as Meta

export const Table = (args: any) => (
	<Box icon={Settings} title="Table">
		<Component {...args}>
			<thead>
				<tr>
					<th>item1</th>
					<th>item1</th>
					<th>item1</th>
					<th>item1</th>
					<th>item1</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
				</tr>
				<tr>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
				</tr>
				<tr>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
					<td>item1</td>
				</tr>
			</tbody>
		</Component>
	</Box>
)
