import React, { FC } from 'react'

import { ChevronDown } from 'react-feather'
import Text from '../Text'
import { IconProps } from '../interfaces'
import { buildClassName } from '../Util'
import css from './Input.module.styl'
import Row from '../Row'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id?: string
	label?: string
	icon?: FC<IconProps>
	iconRight?: FC<IconProps>
	helper?: string
	characterCount?: boolean
	inputRef?: React.RefObject<HTMLInputElement>
	selectRef?: React.RefObject<HTMLSelectElement>
	type?: 'color' | 'text' | 'date' | 'datetime-local' |
	'email' | 'file' | 'month' | 'number' | 'password' |
	'range' | 'search' | 'tel' | 'time' | 'url' | 'week' |
	// Custom Types
	'select' | 'textarea'
	autocomplete?: Array<string>
	infinityText?: string
	filled?: boolean
	opaque?: boolean
	block?: boolean
	children?: React.ReactNode
}

interface States {
	charCount?: string
	textAreaHeight?: number
	value?: string
	isInFirstPartOfScreen?: boolean
}

export default class Input extends React.Component<Props, States> {

	public state: States = {}

	// any because f*ck types
	private inputRef: React.RefObject<any> = React.createRef()
	private parentRef: React.RefObject<HTMLDivElement> = React.createRef()

	public componentDidMount() {
		if (this.props.characterCount) {
			this.onChange()
		}
		if (this.props.type === 'textarea') {
			this.textareaHandler()
		}
		if (this.props.autocomplete) {
			window.addEventListener('scroll', this.parentScroll)
			this.parentScroll()
		}
	}

	public componentWillUnmount() {
		if (this.props.autocomplete) {
			window.removeEventListener('scroll', this.parentScroll)
		}
	}

	public render() {
		const props: Props = Object.assign({}, this.props)
		delete props.label
		delete props.children
		delete props.icon
		delete props.opaque
		delete props.helper
		delete props.infinityText
		delete props.autocomplete
		delete props.filled
		delete props.iconRight
		delete props.inputRef
		delete props.selectRef
		delete props.block
		delete props.color
		delete props.characterCount

		const baseProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
			placeholder: this.props.placeholder || ' ',
			ref: this.props.inputRef || this.inputRef,
			className: buildClassName(
				[css.iconLeft, this.props.icon],
				[css.iconRight, this.props.iconRight || this.props.autocomplete],
				[css.filled, this.props.filled],
				[css.opaque, this.props.opaque]
			),
			onInvalid: (ev: React.FormEvent<HTMLInputElement>) => ev.preventDefault(),
		}

		let input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

		if (this.props.type === 'number') {
			baseProps.onWheel = (ev: React.WheelEvent<HTMLInputElement>) => ev.currentTarget.blur()
		}

		if (this.props.type === 'select') {
			input = (
				<select
					ref={this.props.selectRef || this.inputRef}
					{...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>}
					className={buildClassName(
						[css.iconLeft, this.props.icon],
						[css.iconRight, !this.props.disabled || this.props.iconRight],
						[css.filled, this.props.filled],
						[css[this.props.color as string], this.props.color]
					)}
				>
					{this.props.children}
				</select>
			)
		} else if (this.props.type === 'textarea') {
			delete baseProps.ref
			input = (
				<textarea
					{...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>}
					{...baseProps as any}
					ref={this.inputRef}
					style={{minHeight: this.state?.textAreaHeight}}
					onKeyDown={this.textareaHandler}
					onKeyUp={this.textareaHandler}
					onFocus={this.textareaHandler}
				/>
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
				onChangeCapture={this.onChange}
				ref={this.parentRef}
			>
				{input}

				{/* Process Icon */}
				{this.props.icon && (
					<this.props.icon className={css.left} />
				)}

				{this.props.iconRight ? (
					<this.props.iconRight className={css.right} />
				) : ((this.props.type === 'select' || this.props.autocomplete) && !this.props.disabled) && (
					<ChevronDown className={buildClassName(css.right, css.rotate)} />
				)}

				{/* Input Label */}
				{this.props.label && (
					<label className={css.label} htmlFor={this.props.id}>{this.props.label}</label>
				)}
				{(this.props.helper || this.props.characterCount) && (
					<div>
						<Text type="span">{this.props.helper}</Text>
						{this.props.characterCount && (
							<Text type="span">{this.state?.charCount}</Text>
						)}
					</div>
				)}

				{this.props.autocomplete && this.props.autocomplete.indexOf(this.state?.value || '') === -1 && (
					<ul className={buildClassName(css.autocomplete, [css.reverse, !this.state.isInFirstPartOfScreen])}>
						{this.props.autocomplete.filter((item) => item.includes(this.state?.value || '')).map((item) => (<li key={item} onClick={this.onAutoCompleteClick(item)}><Text>{item}</Text></li>))}
					</ul>
				)}
			</div>
		)
	}

	private parentScroll = async () => {
		const div = this.parentRef.current
		if (!div) {return}
		const result = !(div.offsetTop - window.scrollY >= window.innerHeight / 2)
		console.log(result, div, this.state.isInFirstPartOfScreen)
		if (this.state.isInFirstPartOfScreen !== result) {
			this.setState({isInFirstPartOfScreen: result})
		}
	}

	private getElement(): undefined | HTMLInputElement {
		const item = this.props.inputRef || this.props.selectRef || this.inputRef
		if (!item || !item.current) {return}
		return item.current
	}

	private textareaHandler = async () =>
		this.setState({textAreaHeight: undefined}, () => {
			if (!this.inputRef.current) {return}
			this.setState({textAreaHeight: this.inputRef.current.scrollHeight})
		})

	private onAutoCompleteClick = (value: string) => () => {
		console.log('test')
		const item = this.getElement()
		if (!item) {return}
		const valueSetter = Object.getOwnPropertyDescriptor(item, 'value')?.set
		const prototype = Object.getPrototypeOf(item)
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
		if (valueSetter && valueSetter !== prototypeValueSetter) {
			// @ts-expect-error IDK why
			prototypeValueSetter.call(item, value)
		} else {
			// @ts-expect-error IDK why
			valueSetter.call(item, value)
		}
		item.dispatchEvent(new Event('input', {bubbles: true}))
	}

	private onChange = async (event?: React.FormEvent<HTMLDivElement>) => {
		if (this.props.characterCount) {
			const max = this.props.maxLength || this.props.infinityText || 'Infinity'
			const baseItem = this.props.value || this.props.defaultValue || ''
			let currentCount = baseItem.toString().length
			if (event) {
				currentCount = (event.target as HTMLInputElement).value.length
			}
			this.setState({charCount: `${currentCount}/${max}`})
		}
		if (event) {
			this.setState({value: (event.target as HTMLInputElement).value })
		}
	}

}
