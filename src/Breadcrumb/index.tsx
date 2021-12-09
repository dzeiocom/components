import React from 'react'
import Link from '../Link'
import Text from '../Text'
import css from './Breadcrumb.module.styl'
import { ChevronRight, Home } from 'lucide-react'

interface Props {
	items: Array<{
		display: string
		href?: string
	}>

	textProps?: Text['props']
}

/**
 * A breadcrumb compatible with Schema.org BreadcrumbList type
 *
 * @version 1.0.0
 */
export default class Breadcrumb extends React.Component<Props> {

	public render() {
		return (
			<nav className={css.breadcrumb}>
				<ol vocab="https://schema.org/" typeof="BreadcrumbList">
					<li>
						<Link className={css.item} href="/" noStyle>
							<Text {...this.props.textProps} tag="span"><Home size={16} /></Text>
						</Link>
					</li>
					{this.props.items.map((el, index) => (
						<li property="itemListElement" typeof="ListItem" key={index}>
							<Text {...this.props.textProps} tag="span"><ChevronRight size={14} /></Text>
							{el.href ? (
								<Link className={css.item} noStyle href={el.href.replace(/ /g, '-')} linkProps={{ property: "item", typeof: "WebPage" }}>
									<Text {...this.props.textProps} tag="span" textProps={{ property: "name" }}>{el.display}</Text>
								</Link>
							) : (
								<Text className={css.item} {...this.props.textProps} tag="span" weight="bold" textProps={{ property: "name" }}>{el.display}</Text>
							)}
							<meta property="position" content={index.toString()} />
						</li>
					))}
				</ol>
			</nav>
		)
	}
}
