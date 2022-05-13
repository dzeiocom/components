import React from 'react'
import Link from '../Link'
import Box from '../Box'
import { Icon } from '../interfaces'
import { buildClassName } from '../Util'

import css from './Menu.module.styl'

interface Props {
	items: Array<{display?: string, value: any, selected?: boolean, icon?: Icon, href?: string}>
	outline?: boolean
	onClick?: (value: any, key: number) => void
	className?: string
	hideWhenEmpty?: boolean
}

export default class Menu extends React.Component<Props> {
	public render = () => (
		<Box className={buildClassName(css.menu, this.props.className, [css.outline, this.props.outline], [css.hidden, this.props.hideWhenEmpty, this.props.items.length === 0])}>
			<ul>
				{this.props.items.map((item, key) => {
					const content = (
						<>
							{item.icon && (
								<item.icon size="24" />
							)}
							{item.display ?? item.value}
						</>
					)
					if (item.href) {
						return (
						<li key={key} className={buildClassName([css.selected, item.selected])}>
							<Link noStyle href={item.href}>{content}</Link>
						</li>
						)
					}
					return (
						<li key={key} className={buildClassName([css.selected, item.selected])} onClick={() => this.props.onClick?.(item.value, key)}>
							{content}
						</li>
					)
				})}
			</ul>
		</Box>
	)
}
