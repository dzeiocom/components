import React from 'react'

import { buildClassName } from '../Util'

import css from './Box.module.styl'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import { Icon } from 'lucide-react'
import { ColorType } from '../interfaces'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	noPadding?: boolean

	// Header
	title?: string
	icon?: Icon
	rightHeader?: React.ReactNode
}

export default class Box extends React.Component<Props> {
	public render = () => (
		<div
			{...this.props}
			className={buildClassName(css.box, this.props?.className)}
		>
			{(this.props.rightHeader || this.props.title || this.props.icon) && (
				<div className={css.header}>
					<Row nomargin justify="space-between">
						<Col>
							<Text className={css.title}>
								{this.props.icon && (
									<span className={css.icon}>
										<this.props.icon strokeWidth="2" fontWeight="800" size="20" color="white" />
									</span>
								)}
								{this.props.title ? this.props.title : undefined}
							</Text>
						</Col>
						{this.props.rightHeader && (
							<Col nogrow>
								{this.props.rightHeader}
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
