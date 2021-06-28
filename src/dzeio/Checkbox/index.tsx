import React from 'react'
import { Check } from 'lucide-react'
import { buildClassName } from '../Util'

import css from './Checkbox.module.styl'
import Text from '../Text'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	type?: 'checkbox' | 'radio' | 'switch'
}

export default class Checkbox extends React.Component<Props> {

	public render() {
		const props: Partial<Props> = Object.assign({}, this.props)
		delete props.label
		delete props.type

		const realType = this.props.type ?? 'checkbox'

		return (
			<label htmlFor={this.props.id ?? this.props.label} className={buildClassName(
				[css.label],
				[css.radio, realType === 'radio'],
				[css.switch, realType === 'switch'],
				[css[this.props.color as string], this.props.color]
			)}>
				<input {...props}
					id={this.props.id ?? this.props.label}
					type={realType === 'switch' ? 'checkbox' : realType}
				/>
				<span>
					{realType === 'checkbox' && (
						<Check strokeWidth={4} size={16}/>
					)}
				</span>
				<Text>{this.props.label}</Text>
			</label>
		)
	}

}
