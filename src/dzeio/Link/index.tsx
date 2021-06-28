import React from 'react'
import NextLink from 'next/link'
import { ExternalLink } from 'lucide-react'

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

	/**
	 * force hiding the icon
	 */
	hideIcon?: boolean
}

export default class Link extends React.Component<Props> {

	public render() {
		const isExternal = this.props.href.startsWith('http')
		const externalProps = this.props.external ? {
			rel: 'noreferrer nofollow',
			target: '_blank'
		} : {}
		
		if (isExternal) {
			// external link
			return (
				<a
					{...this.props.linkProps}
					className={buildClassName(this.props.className, [css.link, !this.props.noStyle])}
					href={this.props.href}
					{...externalProps}
				>
					{this.props.children}
					{(this.props.external !== false && !this.props.hideIcon) && (
						<ExternalLink size={16} className={css.icon} />
					)}
				</a>
			)
		}
		return (
			<NextLink href={this.props.href}>
				<a
					{...this.props.linkProps}
					{...externalProps}
					className={buildClassName(this.props.className, [css.link, !this.props.noStyle])}
				>{this.props.children}</a>
			</NextLink>
		)
	}

}
