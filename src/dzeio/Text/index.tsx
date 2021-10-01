import React from 'react'
import { buildClassName } from '../Util'
import css from './Text.module.styl'

type Types = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'light' | 'bold'

interface Props {
	color?: 'black' | 'white'
	type?: Types
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'em' | 'span' | 'div'
	weight?: 'normal' | 'bold' | 'light'
	size?: 36 | 28 | 24 | 20 | 18 | 16 | 14
	className?: string
	noDarkTheme?: boolean
	align?: 'left' | 'right' | 'center'
	children: React.ReactNode
}

const types: Record<Types, {
	tag?: Props['tag']
	size?: Props['size']
	weight?: Props['weight']
}> = {
	hero: {
		size: 36,
		weight: 'bold'
	},
	h1: {
		size: 28,
		weight: 'bold'
	},
	h2: {
		size: 24,
		weight: 'bold'
	},
	h3: {
		size: 20,
		weight: 'bold'
	},
	h4: {
		size: 18,
		weight: 'bold'
	},
	text: {},
	bold: {
		weight: 'bold'
	},
	light: {
		weight: 'light',
		size: 14
	}
}

export default class Text extends React.PureComponent<Props> {

	public render() {
		let data: { weight: Props['weight'], size: Props['size'] } = Object.assign({
			size: 16,
			weight: 'normal'
		}, this.props.type ? types[this.props.type] : {})
		const classes = buildClassName(
			css.text,
			[css[`weight-${data.weight}`], data.weight !== 'normal'],
			[css[`size-${data.size}`], data.size !== 16],
			[css.white, this.props.color === 'white'],
			[css.black, this.props.color === 'black' || !this.props.color],
			[css.noDarkTheme, this.props.noDarkTheme],
			[css[`align-${this.props.align}`], this.props.align],
			this.props.className
		)

		if (this.props.tag === 'em') {
			return (<p className={classes}><em>{this.props.children}</em></p>)
		}

		return React.createElement(this.props.tag || 'p', {className: classes, children: this.props.children})
	}
}
