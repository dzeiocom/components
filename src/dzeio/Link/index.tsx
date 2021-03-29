import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'react-feather'

import css from './Link.module.styl'
import { buildClassName } from '../Util'

interface Props {
	href: string
	children?: React.ReactNode
	className?: string
	/**
	 * Override external detection system
	 */
	noStyle?: boolean
	external?: boolean
}

export default class Link extends React.Component<Props> {

	public render() {
		const external = this.props.external ?? !this.props.href.startsWith('/')
		if (external) {
			// external link
			return (
				<a
					className={buildClassName(this.props.className, [css.link, !this.props.noStyle])}
					href={this.props.href}
					rel="noreferrer nofollow"
					target="_blank"
				>
					{this.props.children}<ExternalLink size={16} className={css.icon} />
				</a>
			)
		}
		return (
			<NextLink href={this.props.href}>
				<a
					className={buildClassName(this.props.className, [css.link, !this.props.noStyle])}
				>{this.props.children}</a>
			</NextLink>
		)
	}

}
