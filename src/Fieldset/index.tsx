import React from 'react'

import css from './Fieldset.module.styl'

interface Props {
	title?: string
	children?: React.ReactNode
}

export default class Fieldset extends React.Component<Props> {

	public render = () => (
		<fieldset className={css.fieldset}>
			{this.props.title && (
				<legend>{this.props.title}</legend>
			)}
			{this.props.children}
		</fieldset>
	)

}
