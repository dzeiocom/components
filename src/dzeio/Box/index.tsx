import React from 'react'

import { buildClassName } from '../Util'

import css from './Box.module.styl'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'

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
				<div className={buildClassName(
					css.header
				)}>
					<Row nomargin justify="space-between">
						<Col>
							{this.props.title && (
								<Text className={buildClassName(css.title, this.props.titleClassName)}>{this.props.title}</Text>
							)}
							{this.props.subtitle && (
								<Text className={css.subtitle}>{this.props.subtitle}</Text>
							)}
						</Col>
						{this.props.children && (
							<Col nogrow>
								<Row justify="flex-end">
								{this.props.headerButtons}
								</Row>
							</Col>
						)}
					</Row>
				</div>
			)}
			{this.props.children && (
				<div className={buildClassName([css.body, !this.props.noPadding])}>
					{this.props.children}
				</div>	
			)}
		</div>
	)
}
