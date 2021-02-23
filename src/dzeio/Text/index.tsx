import React from 'react'
import { buildClassName } from '../Util'
import css from './Text.module.styl'
interface Props {
	color?: 'black' | 'white'
	type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'em'
	className?: string
	noDarkTheme?: boolean
	align?: 'right' | 'center'
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

		switch (this.props.type || 'p') {
		case 'h1': return (<h1 className={classes}>{this.props.children}</h1>)
		case 'h2': return (<h2 className={classes}>{this.props.children}</h2>)
		case 'h3': return (<h3 className={classes}>{this.props.children}</h3>)
		case 'h4': return (<h4 className={classes}>{this.props.children}</h4>)
		case 'h5': return (<h5 className={classes}>{this.props.children}</h5>)
		case 'h6': return (<h6 className={classes}>{this.props.children}</h6>)
		case 'em': return (<p className={classes}><em>{this.props.children}</em></p>)
		default: return (<p className={classes}>{this.props.children}</p>)
		}
	}
}
