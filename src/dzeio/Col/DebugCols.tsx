import React from 'react'
import Row from '../Row'

import css from './DebugCols.module.styl'

import Col from '.'

enum Breakpoint {
	MOBILE,
	TABLET,
	COMPUT
}

interface States {
	breakpoint: Breakpoint
}


export default class DebugCols extends React.Component<unknown, States> {

	public state: States = {
		breakpoint: Breakpoint.COMPUT
	}

	public componentDidMount() {
		this.onResize()
		window.addEventListener('resize', this.onResize)
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	public render = () => (
		<Row className={css.row}>
			<Col size={1} tabletSize={1} mobileSize={1} className={css.col}><div></div></Col>
			<Col size={1} tabletSize={1} mobileSize={1} className={css.col}><div></div></Col>
			<Col size={1} tabletSize={1} mobileSize={1} className={css.col}><div></div></Col>
			<Col size={1} tabletSize={1} mobileSize={1} className={css.col}><div></div></Col>
			{this.state.breakpoint !== Breakpoint.MOBILE && (
				<>
					{this.state.breakpoint !== Breakpoint.TABLET && (
						<>
							<Col size={1} className={css.col}><div></div></Col>
							<Col size={1} className={css.col}><div></div></Col>
							<Col size={1} className={css.col}><div></div></Col>
							<Col size={1} className={css.col}><div></div></Col>
						</>
					)}
					<Col size={1} tabletSize={1} className={css.col}><div></div></Col>
					<Col size={1} tabletSize={1} className={css.col}><div></div></Col>
					<Col size={1} tabletSize={1} className={css.col}><div></div></Col>
					<Col size={1} tabletSize={1} className={css.col}><div></div></Col>
				</>
			)}
		</Row>
	)

	private onResize = async () => {
		const currentBreakpoint =
			window.innerWidth <= 768 ?
				Breakpoint.MOBILE :
				window.innerWidth <= 1200 ?
					Breakpoint.TABLET :
					Breakpoint.COMPUT
		const hasChanged = currentBreakpoint !== this.state.breakpoint
		if (hasChanged) {
			this.setState({ breakpoint: currentBreakpoint })
		}
	}

}
