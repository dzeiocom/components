import React from 'react'
import { Bell, Grid } from 'react-feather'
import Router from 'next/router'
import Link from 'next/link'
import Row from '../Row'
import Col from '../Col'
import Button from '../Button'
import Image from '../Image'

import { buildClassName } from '../Util'
import Menu from '../Menu'
import css from './Navbar.module.styl'

interface States {
	domain?: string
	showUserMenu?: boolean
}

interface Props {
	username?: string
	userPic?: string
	userMenu?: Array<{href: string, name: string}>
	loginUrl?: string
	registerUrl?: string
	logoUrl?: string
	logoLabel?: string
	logo?: {
		src: string
		alt: string
	}

}

export default class Navbar extends React.Component<Props, States> {

	public state: States = {}

	public constructor(props: Props) {
		super(props)
	}

	public componentDidMount() {

		this.setState({
			domain: Router.query.domain as string
		})
		Router.events.on('routeChangeComplete', () => {
			this.setState({
				domain: Router.query.domain as string | undefined
			})
		})
		document.body.addEventListener('click', this.onClickAnywhere)
	}

	public componentWillUnmount() {
		document.body.removeEventListener('click', this.onClickAnywhere)
	}

	public render = () => (
		<nav className={buildClassName([css.navbar], [css.small, this.state.domain])}>
			<Row >
				{this.props.logo && (
					<Col>
						<Row align="center">
							<Link href={this.props.logoUrl || '/'}>
								<a aria-label={this.props.logoLabel || 'Homepage'}>
									<Image
										alt={this.props.logo.alt}
										src={this.props.logo.src}
										max={{ height: 70-32 }}
									/>
								</a>
							</Link>
						</Row>
					</Col>

				)}
				<Col>
					<Row justify="flex-end" align="center">
						{this.props.username ? (
							<>
								{/* <Bell className={css.icon} />
								<Grid className={css.icon} /> */}
								{this.props.userPic && (
									<Image
										onClick={this.onMenuClick}
										alt="User Profile Picture"
										classes={buildClassName([css.favicon], [css.userIcon])}
										src={this.props.userPic}
									/>
								)}
								<p
									onClick={this.props.userMenu ? this.onMenuClick : undefined}
									className={css.text}
								>
									{this.props.username}
								</p>
								{this.props.userMenu && (
									<Menu
										show={this.state.showUserMenu}
										pos={{ right: 16, top: 86 }}
										content={this.props.userMenu}
									/>
								)}
							</>
						) : (
							<>
								<Button nomargintop href={this.props.loginUrl}>Login</Button>
								<Button nomargintop color="secondary" href={this.props.registerUrl}>Register</Button>
							</>
						)}
					</Row>
				</Col>
			</Row>
		</nav>
	)

	private onClickAnywhere = () => {
		this.setState({
			showUserMenu: false
		})
	}

	private onMenuClick = () => {
		const newMenuState = !this.state.showUserMenu
		this.setState({
			showUserMenu: newMenuState
		})
	}

}
