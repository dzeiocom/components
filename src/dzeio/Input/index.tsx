import React, { FC } from 'react'

import { ChevronDown } from 'react-feather'
import { IconProps, ColorType } from '../interfaces'
import { buildClassName } from '../Util'
import css from './Input.module.styl'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id?: string
	label?: string
	icon?: FC<IconProps>
	helper?: string
	characterCount?: boolean
	inputRef?: React.RefObject<HTMLInputElement>
	selectRef?: React.RefObject<HTMLSelectElement>
	type?: 'color' | 'text' | 'date' | 'datetime-local' |
	'email' | 'file' | 'month' | 'number' | 'password' |
	'range' | 'search' | 'tel' | 'time' | 'url' | 'week' | 'select'
	maxLength?: number | undefined
	infinityText?: string
	filled?: boolean
	opaque?: boolean
	block?: boolean
	color?: ColorType
	children?: React.ReactNode
}

export default class Input extends React.Component<Props> {

	private charCountRef: React.RefObject<HTMLSpanElement> = React.createRef()

	public componentDidMount() {
		this.updatecharCount()
	}

	public render() {
		const props: Props = Object.assign({}, this.props)
		const Icon = this.props.icon
		delete props.label
		delete props.icon
		delete props.opaque
		delete props.helper
		delete props.infinityText
		delete props.filled
		delete props.inputRef
		delete props.selectRef
		delete props.block
		delete props.color
		delete props.characterCount

		const baseProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
			placeholder: this.props.placeholder || ' ',
			ref: this.props.inputRef,
			className: buildClassName(
				[css.hasIcon, Icon],
				[css.filled, this.props.filled],
				[css.opaque, this.props.opaque],
				[css[this.props.color as string], this.props.color]
			),
			onInvalid: (ev: React.FormEvent<HTMLInputElement>) => ev.preventDefault()
		}

		let input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

		if (this.props.type === 'number') {
			baseProps.type = 'text'
			baseProps.inputMode = 'numeric'
			baseProps.pattern = '[0-9]*'
		}

		if (this.props.type === 'select') {
			input = (
				<select
					ref={this.props.selectRef}
					className={buildClassName(
						css.hasIcon,
						[css.filled, this.props.filled],
						[css[this.props.color as string], this.props.color]
					)}
				>
					{this.props.children}
				</select>
			)
		} else {
			input = (
				<input
					{...props}
					{...baseProps}
				/>
			)
		}

		return (
			<div
				className={buildClassName(
					[css.parent],
					[css.block, this.props.block]
				)}
				onChangeCapture={this.props.characterCount ? this.updatecharCount : undefined}
			>
				{input}
				{this.props.type === 'select' && (
					<ChevronDown />
				)}
				{Icon && (
					<Icon />
				)}
				{this.props.label && (
					<label className={css.label} htmlFor={this.props.id}>{this.props.label}</label>
				)}
				{(this.props.helper || this.props.characterCount) && (
					<div>
						<span>{this.props.helper}</span>
						<span ref={this.charCountRef}></span>
					</div>
				)}
			</div>
		)
	}

	private updatecharCount = async (event?: React.FormEvent<HTMLDivElement>) => {
		if (this.props.characterCount && this.charCountRef.current) {
			const max = this.props.maxLength || this.props.infinityText || 'Infinity'
			let currentCount = 0
			if (event) {
				currentCount = (event.target as HTMLInputElement).value.length
			} else {
				if (this.props.defaultValue) {
					currentCount = this.props.defaultValue.toString().length
				} else if (this.props.value) {
					currentCount = this.props.value.toString().length
				}
			}
			this.charCountRef.current.innerText = currentCount + ' / ' + max
		}
	}

}
