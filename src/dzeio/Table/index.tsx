import React from 'react'

import css from './Table.module.styl'

interface Props {
	children: React.ReactNode
}

export default class Table extends React.Component<Props> {

	public render = () => (
		<table className={css.table}>{this.props.children}</table>
	)

}
