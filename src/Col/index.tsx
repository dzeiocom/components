import { objectOmit } from '@dzeio/object-util'
import React from 'react'
import { buildClassName } from '../Util'
import css from './Col.module.styl'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	size?: 0|1|2|3|4|5|6|7|8|9|10|11|12
	offset?: 1|2|3|4|5|6|7|8|9|10|11
	children?: React.ReactNode
	className?: string
	nogrow?: boolean

	// Tablet related
	tabletSize?: 0|1|2|3|4|5|6|7|8
	tabletoffset?: 1|2|3|4|5|6|7
	tabletGrow?: boolean


	// Mobile related
	mobileSize?: 0|1|2|3|4
	mobileoffset?: 1|2|3
	mobileGrow?: boolean
}



export default class Col extends React.Component<Props> {

	public render = () => (
		<div {...objectOmit(
			this.props,
			"size",
			"offset",
			"children",
			"className",
			"nogrow",
			"tabletSize",
			"tabletoffset",
			"tabletGrow",
			"mobileSize",
			"mobileoffset",
			"mobileGrow"
		)} className={buildClassName(
			css.col,

			// Normal
			[css[`col-${this.props.size}`], typeof this.props.size === 'number'],
			[css[`offset-${this.props.offset}`], this.props.offset],

			// Tablet
			[css[`col-tablet-${this.props.tabletSize}`], typeof this.props.tabletSize === 'number'],
			[css[`offset-tablet-${this.props.tabletoffset}`], this.props.tabletoffset],

			// Mobile
			[css[`col-mobile-${this.props.mobileSize}`], typeof this.props.mobileSize === 'number'],
			[css[`offset-mobile-${this.props.mobileoffset}`], this.props.mobileoffset],
			[css.nogrow, this.props.nogrow],
			[css.mobileGrow, this.props.mobileGrow],
			this.props.className
		)}>
			{this.props.children}
		</div>
	)

}
