import React from 'react'

import { ColorType } from '../interfaces'
import { buildClassName } from '../Util'
import Link from '../Link'

import css from './Tag.module.styl'
import Text from '../Text'

interface Props {
	text: string
	color?: ColorType
	href?: string
	outline?: boolean
}

export default class Tag extends React.Component<Props> {

	public render() {
		const classes = buildClassName(
			css.tag,
			[css[this.props.color as string], this.props.color],
			[css.outline, this.props.outline]
		)
		if (!this.props.href) {
			return (
				<Text
					className={classes}
				>{this.props.text}</Text>
			)
		}
		return (
			<Link
				href={this.props.href}
				className={classes}
			>
				{this.props.text}
			</Link>
		)
	}

}
