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
	delimiter?: boolean
	titleClassName?: string
	// image?: ImageProps
}

export default class BoxHeader extends React.Component<Props> {

	public render = () => (
		<>
			{/* {this.props.image && (
				<Image {...this.props.image} />
			)} */}
			<div className={buildClassName(
				[css.header],
				[css.delimiter, this.props.delimiter]
			)}>
				<Row>
					<Col size={this.props.titleColSize as 1 || 8}>
						<Text className={buildClassName(css.title, this.props.titleClassName)}>{this.props.title}</Text>
						<Text className={css.subtitle}>{this.props.subtitle}</Text>
					</Col>
					<Col>
						<Row justify="flex-end">
							{this.props.children}
						</Row>
					</Col>
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
