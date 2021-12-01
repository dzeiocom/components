import React from 'react'

import css from './Box.module.styl'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import { Icon } from '../interfaces'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string
	icon?: Icon
	children?: React.ReactNode
}

export default class BoxHeader extends React.Component<Props> {
	public render = () => (
		<div className={css.header}>
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
