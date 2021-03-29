import Router from 'next/router'

import Image, { ImageProps } from 'next/image'
import React, { FC } from 'react'
import { ChevronDown, ChevronsRight, X } from 'react-feather'
import Text from '../Text'
import Col from '../Col'
import Row from '../Row'
import Link from '../Link'
import { buildClassName } from '../Util'

import css from './Navbar.module.styl'

interface Props {
	type: 'navbar' | 'sidebar'
	logo: ImageProps
	user?: {
		name: string
		description?: string
		settings?: string
		menu?: {
			links: Array<{
				path: string
				name: string
			}>
			informations?: JSX.Element
		}
	}
	items: Array<{
		path: string
		icon: FC
		name: string
	}>
}

interface State {
	path?: string
	short: boolean
	menuActive: boolean
}

export default class Navbar extends React.Component<Props, State> {

	public state: State = {
		short: false,
		menuActive: false
	}

	public componentDidMount() {
		this.setState({path: Router.asPath})
		Router.events.on('routeChangeComplete', () => {
			this.setState({path: Router.asPath})
		})
		document.body.classList.add(css.body)
		if (this.state.short) {
			document.body.classList.add(css.short)
		}
	}

	public componentDidUpdate() {
		if (this.state.short) {
			document.body.classList.add(css.short)
		} else {
			document.body.classList.remove(css.short)

		}
	}

	public componentWillUnmount() {
		document.body.classList.remove(css.body, css.short)
	}

	public render = () => (
		<nav className={buildClassName(css.sidebar, [css.short, this.state.short])}>
			<Row nomargin className={css.header} align="center">
				<Col className={css.imgContainer}><Link href="/"><Image {...this.props.logo} /></Link></Col>
				<Col nogrow><Text><div onClick={() => this.setState({short: !this.state.short, menuActive: false})}>
					{this.state.short ? (
						<ChevronsRight size={30} />
					) : (
						<X size={30} />
					)}
				</div></Text></Col>
			</Row>
			<hr/>
			<ul>
				{this.props.items.map((item) => (
					<li key={item.path}><Link href={item.path}><a>
						<Text className={buildClassName([css.active, this.state.path?.startsWith(item.path)])} >
							<item.icon />
							<span>{item.name}</span>
						</Text>
					</a></Link></li>
				))}
			</ul>
			<div style={{flex: 1}}></div>
			{/* Spacer */}
			{this.props.user && (
				<>
					<div className={css.userSpaceParent}>
						<hr/>
						<div onClick={() => this.setState({menuActive: !this.state.menuActive})} className={css.userSpace}>
							<Text>
								{this.props.user.name}
								<ChevronDown className={buildClassName([css.menuActive, this.state.menuActive])} />
							</Text>
							{this.props.user.description && (
								<Text>{this.props.user.description}</Text>
							)}
						</div>
					</div>
					<div className={buildClassName(css.userMenu, [css.menuActive, this.state.menuActive])}>
						<Row nomargin>
							<Col></Col>
							<Col>
								<ul>
									{this.props.user.menu?.links.map((l) => (
										<li key={l.path}><Text><Link href={l.path}>{l.name}</Link></Text></li>
									))}
								</ul>
							</Col>
						</Row>
					</div>
				</>
			)}
		</nav>
	)
}
