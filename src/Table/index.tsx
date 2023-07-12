import React from 'react'
import { buildClassName } from '../Util'

import css from './Table.module.styl'

interface Props {
	children: React.ReactNode
	parentClassName?: string
	className?: string
	horizontalBorders?: boolean
	verticalBorders?: boolean
}

export default class Table extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(
			css.parent,
			this.props.parentClassName
		)}>
			<table className={buildClassName(
				css.table,
				this.props.className,
				[css.horizontalBorders, this.props.horizontalBorders],
				[css.verticalBorders, this.props.verticalBorders]
			)}>{this.props.children}</table>
		</div>
	)

}
