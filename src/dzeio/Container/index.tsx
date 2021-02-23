import React from 'react'
import { buildClassName } from '../Util'

import css from './Container.module.styl'

interface Props {
	children: React.ReactNode
	className?: string
}

export default class Container extends React.Component<Props> {

	public render = () => (
		<div className={buildClassName(css.container, this.props.className)}>
			{this.props.children}
		</div>
	)

}
