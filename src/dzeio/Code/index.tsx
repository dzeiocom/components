import React from 'react'

import css from './Code.module.styl'

interface Props {
	block?: boolean
}

export default class Code extends React.Component<Props> {

	public render = () => {
		const code = (
			<code className={css.code}>
				{this.props.children}
			</code>
		)
		if (!this.props.block) {
			return code
		}

		return (
			<pre>
				{code}
			</pre>
		)
	}

}
