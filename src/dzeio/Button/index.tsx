import React, { FC } from 'react'
import Link from '../Link'
import { ColorType, Icon } from '../interfaces'
import { buildClassName } from '../Util'
import Image from '../Image'

import css from './Button.module.styl'

// MAKE OUTLINE use Fieldset instead of the current one xd

interface Props {
	nomargintop?: boolean
	color?: ColorType
	children?: React.ReactNode
	icon?: Icon | string
	size?: 'large' | 'small'
	type?: 'outline' | 'ghost'
	block?: boolean
	href?: string
	as?: string
	disabled?: boolean
	loading?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement|HTMLAnchorElement, MouseEvent>) => void
}

export default class Button extends React.Component<Props> {

	public render = () => {

		let inner: any = this.props.children

		if (this.props.icon) {
			const Icon = this.props.icon
			inner = (
				<>
					{typeof Icon === 'string' ? (
						<Image imageProps={{src: Icon, width: 16, height: 16}} />
					) : (
						<Icon size={this.props.size === 'large' ? 20 : this.props.size === 'small' ? 14 : 16} />
					)}
					{this.props.children && (
						<span className={css.textInner}>{this.props.children}</span>
					)}
				</>
			)
		}

		const classes = buildClassName(
			[css.button],
			[css[this.props.color as string], this.props.color],
			[css[this.props.type as string], this.props.type],
			[css.block, this.props.block],
			[css[this.props.size as string], this.props.size],
			[css.nomargintop, this.props.nomargintop],
			[css.loading, this.props.loading]
		)

		if (this.props.href && !this.props.disabled) {
			return (
				<Link linkProps={{onClick: this.props.onClick}} noStyle href={this.props.href} className={buildClassName([classes], [css.disabled, this.props.disabled])}>
					{inner}
				</Link>
			)
		}

		return (
			<button onClick={this.props.onClick} disabled={this.props.disabled} className={classes}>{inner}</button>
		)
	}

}
