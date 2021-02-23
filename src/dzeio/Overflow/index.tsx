import React from 'react'

import { buildClassName } from '../Util'
import css from './Overflow.module.styl'

interface Props {
	bottom?: boolean
	top?: boolean
}

export default class Overflow extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(
			[css.bottom, this.props.bottom],
			[css.top, this.props.top]
		)}></div>
	)

}
