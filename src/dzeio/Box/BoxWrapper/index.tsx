import React from 'react'

import css from './BoxWrapper.module.styl'
import { buildClassName } from '../../Util'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	outline?: boolean
	className?: string
}

export default class BoxWrapper extends React.Component<Props> {

	public render = () => (
		<div {...this.props}
			className={buildClassName(css.box, [css.outline, this.props.outline], this.props.className)}
		>
			{this.props.children}
		</div>
	)

}

/*
Wrapper extends div

Body
noPadding?: boolean
*/
