import React from 'react'

import BoxHeader from './BoxHeader'
import { buildClassName } from '../Util'

import css from './Box.module.styl'

interface Props {

	// Wrapper
	wrapperProps?: Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'>
	outline?: boolean
	/**
	 * @deprecated use wrapperProps.onClick
	 */
	onClick?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>['onClick']
	className?: string

	// Header
	title?: string
	titleColSize?: number
	subtitle?: string
	delimiter?: boolean
	titleClassName?: string

	headerButtons?: React.ReactNode

	// Body
	noPadding?: boolean
}

export default class Box extends React.Component<Props> {
	public render = () => (
		<div
			{...this.props.wrapperProps}
			onClick={this.props.onClick}
			className={buildClassName(css.box, this.props.className, [css.outline, this.props.outline])}
		>
			{(this.props.headerButtons || this.props.title || this.props.titleColSize || this.props.subtitle || this.props.delimiter || this.props.titleClassName) && (
				<BoxHeader
					title={this.props.title}
					titleColSize={this.props.titleColSize}
					subtitle={this.props.subtitle}
					titleClassName={this.props.titleClassName}
				>
					{this.props.headerButtons}
				</BoxHeader>
			)}
			{this.props.children && (
				<div className={buildClassName([css.body, !this.props.noPadding])}>
					{this.props.children}
				</div>	
			)}
		</div>
	)
}
