import React from 'react'
import { buildClassName } from '../Util'
import css from './ProgressBar.module.styl'

interface Props {
	/**
	 * Number between 0 and 100%
	 */
	progress: number
	/**
	 * disable the round borders
	 */
	noRoundBorders?: boolean
	className?: string
}

/**
 * Display a simple customizable Progress bar
 *
 * @version 1.0.0
 */
export default class extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(css.bar, [css.noBorder, this.props.noRoundBorders], this.props.className)}>
			<div style={{ width: `${this.props.progress}%`}}></div>
		</div>
	)
}
