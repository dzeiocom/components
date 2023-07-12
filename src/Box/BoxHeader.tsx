import React from 'react'

import css from './Box.module.styl'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import { Icon } from '../interfaces'
import { buildClassName } from '../Util'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string
	icon?: Icon
	sidePadding?: boolean
	children?: React.ReactNode
}

/**
 * The box header that caan be used out of a box
 *
 * @version 1.0.0
 */
export default class BoxHeader extends React.Component<Props> {
	public render = () => (
		<div className={buildClassName(css.header, [css.noSidePadding, !this.props.sidePadding])}>
			<Row justify="space-between">
				<Col>
					<Text className={css.title} weight="bold">
						{this.props.icon && (
							<span className={css.icon}>
								<this.props.icon strokeWidth="2" fontWeight="800" size="20" color="white" />
							</span>
						)}
						{this.props.title ? this.props.title : undefined}
					</Text>
				</Col>
				{this.props.children && (
					<Col nogrow>
						{this.props.children}
					</Col>
				)}
			</Row>
		</div>
	)
}
