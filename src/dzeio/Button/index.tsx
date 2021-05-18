import React, { FC } from 'react'
import Link from 'next/link'
import { ColorType, IconProps } from '../interfaces'
import { buildClassName } from '../Util'
import Image from '../Image'

import css from './Button.module.styl'

// MAKE OUTLINE use Fieldset instead of the current one xd

interface Props {
	outline?: boolean
	nomargintop?: boolean
	color?: ColorType
	children?: React.ReactNode
	icon?: FC<IconProps> | string
	size?: 'large' | 'small'
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

		if (!this.props.loading && this.props.icon) {
			const Icon = this.props.icon
			inner = (
				<>
					{typeof Icon === 'string' ? (
						<Image imageProps={{src: Icon, width: 16, height: 16, className: css.img}} />
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
			[css.outline, this.props.outline],
			[css.block, this.props.block],
			[css[this.props.size as string], this.props.size],
			[css.nomargintop, this.props.nomargintop],
			[css.loading, this.props.loading]
		)

		if (this.props.href) {
			return (
				<Link href={this.props.href} as={this.props.as}>
					<a onClick={this.props.onClick} className={buildClassName([classes], [css.disabled, this.props.disabled])}>{inner}</a>
				</Link>
			)
		}

		return (
			<button onClick={this.props.onClick} disabled={this.props.disabled} className={classes}>{inner}</button>
		)
	}

}
