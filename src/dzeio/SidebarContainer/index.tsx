import React, { FC } from 'react'

import { ChevronLeft, TrendingUp } from 'react-feather'
import Link from 'next/link'
import Image from '../Image'

import { IconProps } from '../interfaces'
import css from './SidebarContainer.module.styl'

interface Props {
	domain: string
	children: React.ReactNode
}

export default class SidebarContainer extends React.Component<Props> {

	private menu: Array<{name: string, icon: FC<IconProps>, href: string, as?: string}> = [
		{ name: 'back', icon: ChevronLeft, href: '/dashboard' },
		{ name: 'Uptime', icon: TrendingUp, as: `/dashboard/${this.props.domain}/uptime`, href: '/dashboard/[domain]/uptime' }

	]
	public render = () => (
		<>
			<nav className={css.sidebar}>
				<Link href="/dashboard">
					<a>
						<Image src="/assets/logo.svg" width={175} height={100} />
					</a>
				</Link>
				{this.menu.map((item, index) => (
					<Link key={index} href={item.href} as={item.as}>
						<a className={css.item}>
							<item.icon />
							<div>{item.name}</div>
						</a>
					</Link>
				))}
			</nav>
			<div className={css.content}>
				{this.props.children}
			</div>
		</>
	)

}
