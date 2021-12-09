import React from 'react'

import { buildClassName } from '../Util'

import css from './Box.module.styl'
import { Icon } from '../interfaces'
import { objectOmit } from '@dzeio/object-util'
import BoxHeader from './BoxHeader'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	noPadding?: boolean

	// Header
	title?: string
	icon?: Icon
	rightHeader?: React.ReactNode

	noBottomBorder?: boolean
}

/**
 * The basic Box Component
 *
 * @version 1.0.0
 */
export default class Box extends React.Component<Props> {
	public render = () => (
		<div
			{...objectOmit<Record<string, any>>(this.props, 'title', 'icon', 'rightHeader', 'noPadding')}
			className={buildClassName(css.box, this.props?.className, [css.noBottomBorder, this.props.noBottomBorder])}
		>
			{(this.props.rightHeader || this.props.title || this.props.icon) && (
				<BoxHeader title={this.props.title} icon={this.props.icon}>{this.props.rightHeader}</BoxHeader>
			)}
			{this.props.children && (
				<div className={buildClassName([css.body, !this.props.noPadding])}>
					{this.props.children}
				</div>
			)}
		</div>
	)
}
