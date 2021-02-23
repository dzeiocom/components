import React from 'react'
import css from './BoxBody.module.styl'
import { buildClassName } from '../../Util'


interface Props {
	noPadding?: boolean
}

export default class BoxBody extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName([css.body, !this.props.noPadding])}>
			{this.props.children}
		</div>
	)

}
