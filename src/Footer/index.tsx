import React from 'react'
import { Heart } from 'lucide-react'
import Link from '../Link'
import Text from '../Text'
import css from './Footer.module.styl'
import Image from 'next/image'
import { Icon } from '../interfaces'
import Container from '../Container'
import Row from '../Row'
import Col from '../Col'

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
			<Container>
				<Row>
					<Col>
						{this.props.text ? (
							<Text>{this.props.text}</Text>
						) : (
							<Text>Made with <span className={css.animation}><Heart color={'#E6808A'} fill={'#E6808A'} size={16} fillOpacity={0.5} /></span> by {this.props.company || 'Dzeio'}</Text>
						)}
					</Col>
					<Col>
							<ul>
								{this.props.links && this.props.links.map((l, index) => (
									<li key={l.path + index}><Text><Link href={l.path} hideIcon>{l.name}</Link></Text></li>
								))}
								{this.props.socials && this.props.socials.map((l, index) => (
									<li key={l.href + index} className={css.icon}><Text><Link hideIcon noStyle href={l.href}>
										{typeof l.icon === 'string' ? (
											<Image width={24} height={24} src={l.icon} />
										) : (
											<l.icon size={24} />
									)}
									</Link></Text></li>
								))}
							</ul>
					</Col>
				</Row>
			</Container>

		</footer>
	)
}
