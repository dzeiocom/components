import React from 'react'
import Link from 'next/link'

import { buildClassName } from '../Util'
import css from './Menu.module.styl'

interface Props {
	pos?: {top?: number, bottom?: number, left?: number, right?: number}
	content: Array<{name: string, href: string, as?: string}>
	show?: boolean
}

export default class Menu extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName([css.menu], [css.shown, this.props.show])} style={this.props.pos}>
			{this.props.content.map((item, index) => (
				<Link key={index} href={item.href} as={item.as}>
					<a>{item.name}</a>
				</Link>
			))}
		</div>
	)

}
