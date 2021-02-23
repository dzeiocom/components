import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'react-feather'

import css from './Link.module.styl'

interface Props {
	href: string
	children?: React.ReactNode
	className?: string
	forceNewTab?: boolean
}

export default class Link extends React.Component<Props> {

	public render() {
		if (!this.props.href.startsWith('/')) {
			// external link
			return (
				<a
					className={this.props.className}
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
					className={this.props.className}
					target={this.props.forceNewTab ? '_blank' : undefined}
					rel={this.props.forceNewTab ? 'noreferrer nofollow' : undefined}
				>{this.props.children}</a>
			</NextLink>
		)
	}

}
