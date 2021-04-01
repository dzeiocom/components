import React from 'react'
import { ColorType } from '../interfaces'

import { buildClassName } from '../Util'
import css from './GradientBackground.module.styl'

interface Props {
	color?: ColorType
	className?: string
	children: React.ReactNode
	fullscreen?: boolean
}

/**
 * Make the background a linear-gradient
 * 
 * @version 1.0.0
 */
export default class GradientBackground extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(css.back, [css[this.props.color as string], this.props.color], this.props.className)}>
			{this.props.children}
		</div>
	)

}
