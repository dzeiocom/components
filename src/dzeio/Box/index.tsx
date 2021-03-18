import React from 'react'

import BoxWrapper from './BoxWrapper'
import BoxHeader from './BoxHeader'
import BoxBody from './BoxBody'

interface Props {

	// Wrapper
	outline?: boolean
	className?: string
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

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
		<BoxWrapper onClick={this.props.onClick} outline={this.props.outline} className={this.props.className}>
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
			<BoxBody noPadding={this.props.noPadding}>
				{this.props.children}
			</BoxBody>
		</BoxWrapper>
	)
}


export {
	BoxWrapper,
	BoxHeader,
	BoxBody
}
