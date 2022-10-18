import React from 'react'
import Link from '../Link'
import { ColorType, Icon } from '../interfaces'
import { buildClassName } from '../Util'
import Image from '../Image'

import css from './Button.module.styl'

// MAKE OUTLINE use Fieldset instead of the current one xd

interface Props {
	color?: ColorType
	children?: React.ReactNode
	className?: string
	icon?: Icon | string
	iconLeft?: Icon | string
	size?: 'large' | 'small'
	type?: 'outline' | 'ghost'
	block?: boolean
	href?: string
	linkExternal?: boolean
	mobileBlock?: boolean
	disabled?: boolean
	loading?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement|HTMLAnchorElement, MouseEvent>) => void
}

export default class Button extends React.PureComponent<Props> {

	public render = () => {

		let inner: any = this.props.children

		if (this.props.icon || this.props.iconLeft) {
			inner = (
				<>
					{this.props.icon && (typeof this.props.icon === 'string' ? (
						<Image imageProps={{src: this.props.icon, width: 16, height: 16}} />
					) : (
						<this.props.icon size={this.props.size === 'large' ? 20 : this.props.size === 'small' ? 14 : 16} />
					))}
					{this.props.children && (
						<span className={css.textInner}>{this.props.children}</span>
					)}
					{this.props.iconLeft && (typeof this.props.iconLeft === 'string' ? (
						<Image imageProps={{src: this.props.iconLeft, width: 16, height: 16}} />
					) : (
						<this.props.iconLeft size={this.props.size === 'large' ? 20 : this.props.size === 'small' ? 14 : 16} />
					))}
				</>
			)
		}

		const classes = buildClassName(
			[css.button],
			[css[this.props.color as string], this.props.color],
			[css[this.props.type as string], this.props.type],
			[css.block, this.props.block],
			[css[this.props.size as string], this.props.size],
			[css.loading, this.props.loading],
			[css.mobileBlock, this.props.mobileBlock],
			this.props.className
		)

		if (this.props.href && !this.props.disabled) {
			return (
				<Link external={this.props.linkExternal} linkProps={{onClick: this.props.onClick}} noStyle href={this.props.href} className={buildClassName(classes, [css.disabled, this.props.disabled])}>
					{inner}
				</Link>
			)
		}

		return (
			<button onClick={this.props.onClick} disabled={this.props.disabled} className={classes}>{inner}</button>
		)
	}

}
