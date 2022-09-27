import Router from 'next/router'

import Image, { ImageProps } from 'next/image'
import React from 'react'
import { ChevronDown, Menu as LucideMenu } from 'lucide-react'
import Text from '../Text'
import Menu from '../Menu'
import Sidebar from '../Sidebar'
import Col from '../Col'
import Row from '../Row'
import Link from '../Link'
import { buildClassName } from '../Util'

import css from './Navbar.module.styl'
import { Icon } from '../interfaces'
import Button from '../Button'

interface MenuItem {
	path?: string
	icon?: Icon
	name: string
	subMenu?: Array<MenuItem>
}

interface Props {
	/**
	 * Logo to display
	 */
	logo?: ImageProps & {height: number, width: number}
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
		 * User Menu
		 */
		menu?: Array<MenuItem>
	}
	/**
	 * Links to display
	 */
	menu: Array<MenuItem>
}

interface State {
	path?: string
	short: boolean
	isMobile: boolean
	menuActive: boolean
	subMenu?: {
		x: number
		menu: Menu['props']['items']
	}
}

/**
 * Navbar Component
 * @version 1.0.3
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
			menuActive: false
		})
		Router.events.on('routeChangeComplete', () => {
			this.setState({path: Router.asPath, menuActive: false})
		})
		Router.events.on('routeChangeError', () => {
			this.setState({path: Router.asPath, menuActive: false})
		})
		document.body.classList.add(css['body-navbar'])
		document.body.addEventListener('click', this.onBodyClick)
		window.addEventListener('resize', this.onResize)
		this.onResize()
	}

	public onResize = () => {
		const isMobile = window.innerWidth <= 768
		if (this.state.isMobile !== isMobile) {
			this.setState({isMobile})
		}
	}

	public componentWillUnmount() {
		document.body.classList.remove(css['body-sidebar'])
		document.body.removeEventListener('click', this.onBodyClick)
		window.removeEventListener('resize', this.onResize)
	}

	public menuCloseCallback = () => {
		this.setState({menuActive: false})
		return true
	}

	public render = () => (
		<>
			<nav className={css.navbar}>
				<Row nowrap className={css.header} align="center">
					{this.props.logo && (
						<Col className={css.imgContainer}>
							<Link href="/">
								<Image {...this.props.logo} height={34} width={this.props.logo.width*34/this.props.logo.height} />
							</Link>
						</Col>
					)}
				</Row>
				{/* Spacer */}
				<div style={{flex: 1}}></div>

				{/* Menu */}
				{!this.state.isMobile && (
					<ul>
						{!this.state.isMobile && this.props.menu.map((item) => (
							<li key={item.path}><Button nomargintop type="ghost" href={item.path} icon={item.icon} onClick={item.subMenu ? this.onClick(item.subMenu) : undefined}>{item.name}</Button></li>
						))}
						{this.props.user && (
							<li>
								<Button nomargintop type="ghost" iconLeft={ChevronDown} onClick={this.props.user.menu ? this.onClick(this.props.user.menu) : undefined}>{this.props.user.name}</Button>
							</li>
						)}
					</ul>
				)}

				{/* Menu Icon */}
				{this.state.isMobile && (
					<div className={css.userSpaceParent}>
						<div onClick={() => this.setState({menuActive: !this.state.menuActive})} className={css.userSpace}>
							<Text>
								<LucideMenu size={38} className={css.mainGradient} />
							</Text>
						</div>
					</div>
				)}
			</nav>

			{this.state.isMobile && (
				<div className={buildClassName(css.mobileMenu, [css.shown, this.state.menuActive])}>
					<Sidebar fullWidth {...this.props} onClose={this.menuCloseCallback} menu={this.props.menu} />
				</div>
			)}
			{this.state.subMenu && (
				<div style={{position: 'fixed', top: 76, right: this.state.subMenu.x}}>
					<Menu outline items={this.state.subMenu.menu} />
				</div>
			)}
		</>
	)

	private onBodyClick = () => {
		this.setState({subMenu: undefined})
	}

	private onClick = (subMenu?: Array<MenuItem>) => (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
		ev.stopPropagation()
		const x = window.innerWidth - (ev.currentTarget.offsetLeft + ev.currentTarget.offsetWidth)
		if (subMenu && (!this.state.subMenu || x !== this.state.subMenu?.x)) {
			console.log(ev)
			this.setState({
				subMenu: {
					x,
					menu: subMenu.map((v) => ({
						display: v.name,
						value: v.path,
						href: v.path
					}))
				}
			})
		} else {
			this.setState({subMenu: undefined})
		}
	}
}
