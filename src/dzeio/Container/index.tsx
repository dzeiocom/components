import React from 'react'
import { buildClassName } from '../Util'

import css from './Container.module.styl'

interface Props {
	children: React.ReactNode
	className?: string
	mainContainer?: boolean
}

export default class Container extends React.Component<Props> {

	public render = () => React.createElement(this.props.mainContainer ? 'main' : 'div', {className: buildClassName(css.container, this.props.className, [css.main, this.props.mainContainer]), children: this.props.children})

}
