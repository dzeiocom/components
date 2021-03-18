import React from 'react'
import { Heart } from 'react-feather'
import Link from '../Link'

import Text from '../Text'
import css from './Footer.module.styl'

interface Props {
	text?: string
	company?: string
	links?: Array<{
		path: string
		name: string
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
		</footer>
	)
}