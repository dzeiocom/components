import React, { FC } from 'react'
import { Heart } from 'react-feather'
import Link from '../Link'
import { Icon } from 'react-feather'
import Text from '../Text'
import css from './Footer.module.styl'
import Image from 'next/image'

interface Props {
	text?: string
	company?: string
	links?: Array<{
		path: string
		name: string
	}>
	socials?: Array<{
		href: string
		icon: Icon | string
	}>
}

export default class Footer extends React.Component<Props> {
	public render = () => (
		<footer className={css.footer}>
			{this.props.text ? (
				<Text align="center">{this.props.text}</Text>
			) : (
				<Text align="center">Made with <span className={css.animation}><Heart color={'#E6808A'} fill={'#E6808A'} size={16} fillOpacity={0.5} /></span> by {this.props.company || 'Dzeio'}</Text>
			)}
			{this.props.links && (
				<ul>{this.props.links.map((l, index) => (
					<li key={l.path}><Text>{index !== 0 && (<>&nbsp;- </>)}<Link href={l.path}>{l.name}</Link></Text></li>
				))}</ul>
			)}
			{this.props.socials && (
				<ul className={css.socials}>{this.props.socials.map((l, index) => (
					<li key={l.href}><Text><Link noStyle href={l.href}>
						{typeof l.icon === 'string' ? (
							<Image width={24} height={24} src={l.icon} />
						) : (
							<l.icon size={24} />
					)}
					</Link></Text></li>
				))}</ul>
			)}
		</footer>
	)
}