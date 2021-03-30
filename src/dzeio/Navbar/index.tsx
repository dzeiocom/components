import Router from 'next/router'

import Image, { ImageProps } from 'next/image'
import React, { FC } from 'react'
import { ChevronDown, ChevronsRight, Menu, X } from 'react-feather'
import Text from '../Text'
import Col from '../Col'
import Row from '../Row'
import Link from '../Link'
import { buildClassName } from '../Util'

import css from './Navbar.module.styl'

interface Props {
	/**
	 * Type of Navbar
	 * _note: when in mobile it is not listened_
	 */
	type: 'navbar' | 'sidebar'

	/**
	 * Logo to display
	 */
	logo: ImageProps & {height: number, width: number}
	/**
	 * Login URL
	 */
	loginUrl?: string
	/**
	 * Login URL
	 */
	registerUrl?: string
	/**
	 * User Informations if loggedin
	 */
	user?: {
		/**
		 * Username
		 */
		name: string
		/**
		 * User Short description
		 */
		description?: string
		/**
		 * User Menu
		 */
		menu?: {
			/**
			 * Menu links
			 */
			links: Array<{
				path: string
				name: string
			}>
			/**
			 * Custom informations shown next to the links
			 */
			informations?: JSX.Element
		}
	}
	/**
	 * Links to display
	 */
	items: Array<{
		path: string
		icon?: FC
		name: string
	}>
	/**
	 * Internal Use don't use it !
	 */
	mobileMenu?: () => void
}

interface State {
	path?: string
	short: boolean
	isMobile: boolean
	menuActive: boolean
}

/**
 * Navbar/Sidebar Component
 * @version 1.0.0
 */
export default class Navbar extends React.Component<Props, State> {

	public state: State = {
		short: false,
		isMobile: false,
		menuActive: false
	}

	public componentDidMount() {
		this.setState({
			path: Router.asPath,
			menuActive: !!this.props.mobileMenu
		})
		Router.events.on('routeChangeComplete', () => {
			this.setState({path: Router.asPath, menuActive: false})
		})
		Router.events.on('routeChangeError', () => {
			this.setState({path: Router.asPath, menuActive: false})
		})
		if (!this.props.mobileMenu) {
			window.addEventListener('resize', this.onResize)
			this.onResize()
		}
	}

	public onResize = () => {
		const isMobile = window.innerWidth <= 768
		if (this.state.isMobile !== isMobile) {
			this.setState({isMobile})
		}
	}

	public componentDidUpdate() {
		if (!this.props.mobileMenu) {
			if (this.state.short) {
				document.body.classList.add(css.short)
			} else {
				document.body.classList.remove(css.short)
			}
			if (this.getType() === 'sidebar') {
				document.body.classList.add(css['body-sidebar'])
				document.body.classList.remove(css['body-navbar'])
			} else {
				document.body.classList.remove(css['body-sidebar'])
				document.body.classList.add(css['body-navbar'])
			}
		}

	}

	public componentWillUnmount() {
		if (!this.props.mobileMenu) {
			document.body.classList.remove(css.short, css[`body-${this.getType()}`])
			window.removeEventListener('resize', this.onResize)
		}
	}

	public onSidebarButton = () => {
		if (!this.props.mobileMenu) {
			this.setState({short: !this.state.short, menuActive: false})
		} else {
			this.props.mobileMenu()
		}
	}

	public menuCloseCallback = () => {
		this.setState({menuActive: false})
	}

	public getType(): 'sidebar' | 'navbar' {
		if (this.props.mobileMenu) {
			return 'sidebar'
		}
		return this.state.isMobile ? 'navbar' : this.props.type
	}

	public render = () => (
		<>
			<nav className={buildClassName(css[this.getType()], [css.short, this.state.short && !this.props.mobileMenu], [css.mobile, this.props.mobileMenu])}>
				<Row nowrap className={css.header} align="center">
					<Col className={css.imgContainer}>
						<Link href="/">
							<Image {...this.props.logo} height={34} width={this.props.logo.width*34/this.props.logo.height} />
						</Link>
					</Col>
					{this.getType() === 'sidebar' && (
						<Col nogrow><Text><div onClick={this.onSidebarButton}>
							{this.state.short ? (
								<ChevronsRight size={30} />
							) : (
								<X size={30} />
							)}
						</div></Text></Col>
					)}
				</Row>
				{this.getType() === 'sidebar' && (
					<hr/>
				)}
				<ul>
					{!this.state.isMobile && this.props.items.map((item) => (
						<li key={item.path}><Link noStyle href={item.path}><a>
							<Text className={buildClassName([css.active, this.state.path?.startsWith(item.path)])}>
								{this.getType() === 'sidebar' && item.icon && (
									<item.icon />
								)}
								<span>{item.name}</span>
							</Text>
						</a></Link></li>
					))}
				</ul>
				<div style={{flex: 1}}></div>
				{/* Spacer */}
				{this.state.isMobile && (
					<div className={css.userSpaceParent}>
						<div onClick={() => this.setState({menuActive: !this.state.menuActive})} className={css.userSpace}>
							<Text>
								<Menu size={38} className={css.mainGradient} />
							</Text>
						</div>
					</div>
				)}
				{!this.state.isMobile && this.props.user ? (
					<>
						<div className={css.userSpaceParent}>
							{this.getType() === 'sidebar' && (
								<hr/>
							)}
							<div onClick={() => this.setState({menuActive: !this.state.menuActive})} className={css.userSpace}>
								<Text>
									{this.props.user.name}
									<ChevronDown className={buildClassName([css.menuActive, this.state.menuActive])} />
								</Text>
								{this.getType() === 'sidebar' && this.props.user.description && (
									<Text>{this.props.user.description}</Text>
								)}
							</div>
						</div>
						<div className={buildClassName(css.userMenu, [css.menuActive, !this.state.isMobile && this.state.menuActive])}>
							<Row>
								{this.props.user.menu?.informations && (
									<Col>{this.props.user.menu?.informations}</Col>
								)}
								<Col>
									<ul>
										{this.props.user.menu?.links.map((l) => (
											<li key={l.path}><Text><Link noStyle href={l.path}>{l.name}</Link></Text></li>
										))}
									</ul>
								</Col>
							</Row>
						</div>
					</>
				) : !this.state.isMobile ? (
					<div className={css.userSpaceParent}>
						{this.getType() === 'sidebar' && (
							<hr/>
						)}
						<ul>
							{this.props.registerUrl && (
								<li><Link noStyle href={this.props.registerUrl}><a>
									<Text className={buildClassName(css.active)}>
										<span>Register</span>
									</Text>
								</a></Link></li>
							)}
							{this.props.loginUrl && (
								<li><Link noStyle href={this.props.loginUrl}><a>
									<Text>
										<span>Login</span>
									</Text>
								</a></Link></li>
							)}
						</ul>
					</div>
				) : undefined}
			</nav>

			{!this.props.mobileMenu && this.state.isMobile && (
				<div className={buildClassName(css.mobileMenu, [css.shown, this.state.menuActive])}>
					<Navbar {...this.props} type="sidebar" mobileMenu={this.menuCloseCallback} />
				</div>
			)}
		</>
	)
}
