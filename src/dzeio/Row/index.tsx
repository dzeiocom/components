import React from 'react'

import { buildClassName } from '../Util'
import css from './Row.module.styl'

interface Props {
	children?: React.ReactNode
	direction?: 'row-reverse' | 'column' | 'column-reverse'
	mobileDirection?: 'row-reverse' | 'column' | 'column-reverse'
	justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
	align?: 'flex-start' | 'center' | 'flex-end' | 'baseline'
	nowrap?: boolean
	nogrow?: boolean
	className?: string
	nomargin?: boolean
	onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default class Row extends React.Component<Props> {

	public render = () => (
		<div
			className={buildClassName(
				css.row,
				[css[`direction-${this.props.direction}`], this.props.direction],
				[css[`direction-mobile-${this.props.mobileDirection}`], this.props.mobileDirection],
				[css[`justify-${this.props.justify}`], this.props.justify],
				[css[`align-${this.props.align}`], this.props.align],
				[css.nowrap, this.props.nowrap],
				[css.nogrow, this.props.nogrow],
				this.props.className,
				[css.nomargin, this.props.nomargin]
			)}
			onClick={this.props.onClick}
		>
			{this.props.children}
		</div>
	)

}
