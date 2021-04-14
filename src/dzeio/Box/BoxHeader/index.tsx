import React from 'react'

import { buildClassName } from '../../Util'
import css from './BoxHeader.module.styl'
import Row from '../../Row'
import Col from '../../Col'
import Text from '../../Text'


export interface Props {
	title?: string
	titleColSize?: number
	subtitle?: string
	titleClassName?: string
}

export default class BoxHeader extends React.Component<Props> {

	public render = () => (
		<>
			<div data-t="true" className={buildClassName(
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
								{this.props.children}
							</Row>
						</Col>
					)}
				</Row>
			</div>
		</>
	)

}

/*
Header
delimiter?: boolean
picture?: string // url
category?: string // subtitle but above title
title string
subtitle string
center?: boolean // if Center children is not used
children?: content
*/
