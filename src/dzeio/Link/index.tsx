import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'react-feather'

import css from './Link.module.styl'
import { buildClassName } from '../Util'

interface Props {
	linkProps?: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
	href: string
	children?: React.ReactNode
	className?: string
	/**
	 * Remove styling
	 */
	noStyle?: boolean

	/**
	 * Override external detection system
	 */
	external?: boolean
}

export default class Link extends React.Component<Props> {

	public render() {
		const external = this.props.external ?? !this.props.href.startsWith('/')
		if (external) {
			// external link
			return (
				<a
					{...this.props.linkProps}
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
					{...this.props.linkProps}
					className={buildClassName(this.props.className, [css.link, !this.props.noStyle])}
				>{this.props.children}</a>
			</NextLink>
		)
	}

}
