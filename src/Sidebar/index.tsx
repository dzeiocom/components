import React, { MouseEvent } from 'react'

import Router from 'next/router'
import Image, { ImageProps } from 'next/image'
import { ChevronDown, Minus, MoreHorizontal, Plus } from 'lucide-react'
import Text from '../Text'
import Col from '../Col'
import Row from '../Row'
import Link from '../Link'
import { buildClassName } from '../Util'

import css from './Sidebar.module.styl'
import { Icon } from '../interfaces'
import { Menu } from '..'

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

	onClose?: () => boolean

	fullWidth?: boolean

}

interface State {
	path?: string
	/**
	 * Define if the menu is open or closed
	 *
	 * in mobile it will be hidden when closed
	 */
	open: boolean
	activeMenu?: string
	isMobile: boolean
	userMenu?: boolean
	subMenu?: {
		y: number
		menu: Menu['props']['items']
	}
}

/**
 * Sidebar Component
 * @version 1.0.0
 */
export default class Navbar extends React.Component<Props, State> {

	public state: State = {
		open: true,
		isMobile: false
	}

	public componentDidMount() {
		this.setState({
			path: Router.asPath
		})
		Router.events.on('routeChangeComplete', () => {
			this.setState({path: Router.asPath, open: false})
		})
		Router.events.on('routeChangeError', () => {
			this.setState({path: Router.asPath, open: false})
		})
		if (!this.props.fullWidth) {
			document.body.classList.add(css.sidebarBody)
		}
		document.body.addEventListener('click', this.onBodyClick)
	}

	public componentDidUpdate() {
		if (this.state.open) {
			document.body.classList.remove(css.short)
		} else {
			document.body.classList.add(css.short)
		}
	}

	public componentWillUnmount() {
		document.body.classList.remove(css.short, css.sidebarBody)
		document.body.removeEventListener('click', this.onBodyClick)
	}

	private onBodyClick = () => {
		this.setState({subMenu: undefined, userMenu: false})
	}

	public onClick = (id: string, subMenu?: Array<MenuItem>) => (ev: MouseEvent) => {
		ev.stopPropagation()
		if (!this.state.open && subMenu) {
			console.log(ev)
			this.setState({
				subMenu: {
					y: (ev.currentTarget as HTMLElement).offsetTop,
					menu: subMenu.map((v) => ({
						display: v.name,
						value: v.path,
						href: v.path
					}))
				}
			})
		} else {
			this.setState({activeMenu: this.state.activeMenu === id ? undefined : id, subMenu: undefined})
		}
	}

	public render = () => (
		<>
			<nav className={buildClassName(
				css.sidebar,
				[css.short, !this.state.open],
				[css.fullWidth, this.props.fullWidth]
			)}>
				<Row nowrap justify="space-between" className={css.header} align="center">
					{this.props.logo && (
						<Col>
							<Link href="/">
								<Image {...this.props.logo} height={34} width={this.props.logo.width*34/this.props.logo.height} />
							</Link>
						</Col>
					)}
					<Col nogrow><Text tag="div">
						<Plus size={24} onClick={this.onCloseOpenClick} />
					</Text></Col>
				</Row>
				<ul>
					{this.props.menu.map((item) => this.makeMenuItem(item))}
				</ul>
				<div style={{flex: 1}}></div>
				{/* Spacer */}
				{this.props.user && (
					<Row className={css.userSpace}>
						<Col><Text>{this.props.user.name}</Text></Col>
						<Col nogrow><Text><MoreHorizontal size={24} onClick={(ev) => {ev.stopPropagation(); this.setState({userMenu: !this.state.userMenu})}} /></Text></Col>
					</Row>
				)}
			</nav>
			{this.props.user?.menu && this.state.userMenu && (
				<div style={{position: 'absolute', bottom: 16, left: this.props.fullWidth ? 16 : this.state.open ? 316 : 104}}>
					<Menu onClick={this.onMenuClick} outline items={this.props.user.menu.map((v) => ({
						display: v.name,
						value: v.path,
						href: v.path
					}))} />
				</div>
			)}
			{this.state.subMenu && (
				<div style={{position: 'absolute', top: this.state.subMenu.y, left: this.state.open ? 316 : 104}}>
					<Menu onClick={this.onMenuClick} outline items={this.state.subMenu.menu} />
				</div>
			)}
		</>
	)

	private onCloseOpenClick = () => {
		let willBeOpen = !this.state.open
		if (this.props.onClose && !willBeOpen) {
			willBeOpen = this.props.onClose()
		}
		this.setState(!willBeOpen ? {open: false, activeMenu: undefined} : {open: true})
	}

	private onMenuClick = (value?: string) => {
		this.setState({userMenu: false, subMenu: undefined})
		if (value) {
			Router.push(value)
		}
	}

	private makeMenuItem(obj: MenuItem, isSub = false) {
		const id = obj.name + obj.path
			const content = (
				<>
					{obj.icon && (
						<obj.icon size={24} />
					)}
					<Text color="none" weight="bold" tag="span">
						{obj.name}
					</Text>
					{obj.subMenu &&  (
						<ChevronDown size={24} />
					)}
				</>
			)
			return <li key={id} className={buildClassName(
				[css.active, obj?.path && this.state.path?.startsWith(obj.path)],
				[css.activeMenu, id === this.state.activeMenu]
			)}>
				<div onClick={isSub ? undefined : this.onClick(id, obj.subMenu)}>
					{obj.path ? (
						<Link noStyle href={obj.path}>
							{content}
						</Link>
					) : content}
				</div>
				{obj.subMenu && (
					<ul>
						{obj.subMenu.map((it, key) => (
							<li key={it.name + key}>{this.makeMenuItem(it, true)}</li>
						))}
					</ul>
				)}
			</li>
		}
}