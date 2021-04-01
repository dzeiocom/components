import { Router } from 'next/router'
import React from 'react'
import { buildClassName } from '../Util'
import css from './Loader.module.styl'

interface Props {
	/**
	 * The new Percentage (if you calculate it yourself)
	 */
	percent?: number

	/**
	 * Auto random loader
	 */
	auto?: {
		/**
		 * the minimum and maximum interval between two increment
		 */
		interval: [number, number]
		/**
		 * the minimum and maximum incrementation (MUST be an integer)
		 */
		increment: [number, number]
	}
}

interface State {
	percent?: number
}

/**
 * Display a simple loading animation at the top of the page
 * 
 * @version 1.0.0
 */
export default class Loader extends React.Component<Props, State> {

	public state: State = {}

	private interval?: NodeJS.Timeout

	public componentDidMount() {
		if (this.props.auto) {
			Router.events.on('routeChangeComplete', this.routeChangeComplete)
			Router.events.on('routeChangeStart', this.routeChangeStart)
		}
	}

	public componentWillUnmount() {
		if (this.props.auto) {
			Router.events.off('routechangeComplete', this.routeChangeComplete)
			Router.events.off('routechangeStart', this.routeChangeStart)
		}
	}

	public render = () => (
		<div className={buildClassName(css.div, [css.hide, (this.props.percent || this.state.percent) === 100])}>
			<div style={{width: (this.props.percent || this.state.percent) ? `${(this.props.percent || this.state.percent)}%` : 0}}></div>
		</div>
	)

	private routeChangeComplete = () => {
		if (this.interval) {
			clearTimeout(this.interval)
			this.interval = undefined
		}
		this.setState({percent: 100})
	}

	private routeChangeStart = () => {
		if (this.interval) {
			clearTimeout(this.interval)
		}
		this.setState({percent: 0}, () => {
			if (!this.props.auto) {return}
			this.interval = setTimeout(this.timeoutFn, this.randomInt(this.props.auto.interval[0], this.props.auto.interval[1]))
		})
	}

	private timeoutFn = () => {
		if (!this.props.auto) {return}
		const p = this.state.percent || 0
		this.setState({
			percent: Math.min(
				99,
				p >= 80 ? p + Math.random() : p + this.randomInt(this.props.auto.increment[0], this.props.auto.increment[1])
			)
		})
		this.interval = setTimeout(this.timeoutFn, this.randomInt(this.props.auto.interval[0], this.props.auto.interval[1]))
	}

	private randomInt(min = 0, max = 10) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
