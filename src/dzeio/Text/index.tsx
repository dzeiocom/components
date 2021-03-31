import React from 'react'
import { buildClassName } from '../Util'
import css from './Text.module.styl'
interface Props {
	color?: 'black' | 'white'
	type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'em' | 'span'
	className?: string
	noDarkTheme?: boolean
	align?: 'left' | 'right' | 'center'
	children: React.ReactNode
}

export default class Text extends React.Component<Props> {

	public render() {
		const classes = buildClassName(
			css.text,
			[css.white, this.props.color === 'white'],
			[css.black, this.props.color === 'black' || !this.props.color],
			[css.noDarkTheme, this.props.noDarkTheme],
			[css[`align-${this.props.align}`], this.props.align],
			this.props.className
		)

		if (this.props.type === 'em') {
			return (<p className={classes}><em>{this.props.children}</em></p>)
		}

		return React.createElement(this.props.type || 'p', {className: classes})
	}
}
