import React from 'react'
import Link from 'next/link'
import Row from '../Row'
import Col from '../Col'
import Image from '../Image'
import css from './Navbar.module.styl'


interface Props {
	logo?: {
		link?: string
		label?: string
		src: string
		alt?: string
	}
}

export default class Navbar extends React.Component<Props> {

	public render = () => (
		<nav className={css.navbar}>
			<Row nomargin>
				{this.props.logo && (
					<Col>
						<Row align="center">
							<Link href={this.props.logo.link || '/'}>
								<a aria-label={this.props.logo.label || 'Homepage'}>
									<Image
										alt={this.props.logo.alt}
										src={this.props.logo.src}
										height={38}
										width={120}
									/>
								</a>
							</Link>
						</Row>
					</Col>
				)}

				<Col>
					<Row justify="flex-end" align="center">
						{this.props.children}
					</Row>
				</Col>
			</Row>
		</nav>
	)
}
