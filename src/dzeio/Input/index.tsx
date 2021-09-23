import React, { FC } from 'react'

import { ChevronDown } from 'lucide-react'
import Text from '../Text'
import { IconProps } from '../interfaces'
import { buildClassName } from '../Util'
import css from './Input.module.styl'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id?: string
	label?: string
	icon?: FC<IconProps>
	iconRight?: FC<IconProps>
	helper?: string
	inputRef?: React.RefObject<HTMLInputElement>
	selectRef?: React.RefObject<HTMLSelectElement>
	type?: 'color' | 'text' | 'date' | 'datetime-local' |
	'email' | 'file' | 'month' | 'number' | 'password' |
	'range' | 'search' | 'tel' | 'time' | 'url' | 'week' |
	// Custom Types
	'select' | 'textarea'
	autocomplete?: Array<string>
	children?: React.ReactNode
}

interface States {
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
		delete props.helper
		delete props.autocomplete
		delete props.iconRight
		delete props.inputRef
		delete props.selectRef
		delete props.color

		const baseProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
			placeholder: this.props.label || this.props.placeholder || ' ',
			ref: this.props.inputRef || this.inputRef,
			className: buildClassName(
				[css.iconLeft, this.props.icon],
				[css.iconRight, this.props.iconRight || this.props.autocomplete]
			),
			onInvalid: (ev: React.FormEvent<HTMLInputElement>) => ev.preventDefault(),
		}

		let input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

		if (this.props.type === 'number') {
			baseProps.onWheel = (ev: React.WheelEvent<HTMLInputElement>) => ev.currentTarget.blur()
		}

		if (this.props.type === 'select' && !this.props.readOnly) {
			input = (
				<select
					ref={this.props.selectRef || this.inputRef}
					{...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>}
					className={buildClassName(
						[css.iconLeft, this.props.icon],
						[css.iconRight, !this.props.disabled || this.props.iconRight],
						[css[this.props.color as string], this.props.color]
					)}
				>
					{this.props.children}
				</select>
			)
		// select is readonly
		} else if (this.props.type === 'select') {
			input = (
				<input
					{...props}
					{...baseProps}
					type="text"
				/>
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
					css.parent
				)}
				onChangeCapture={this.onChange}
				ref={this.parentRef}
			>
				{input}

				{/* Left Icon */}
				{this.props.icon && (
					<this.props.icon size="18" className={css.left} />
				)}

				{/* Right Icon */}
				{this.props.iconRight ? (
					<this.props.iconRight size="18" className={css.right} />
				) : ((this.props.type === 'select' || this.props.autocomplete) && !this.props.disabled) && (
					<ChevronDown size="18" className={buildClassName(css.right, css.rotate)} />
				)}

				{/* Helper text */}
				{(this.props.helper) && (
					<Text>{this.props.helper}</Text>
				)}

				{/* List when this is an autocomplete */}
				{this.props.autocomplete && this.props.autocomplete.indexOf(this.state?.value ?? this.props.value?.toString() ?? '') === -1 && (
					<ul className={buildClassName(css.autocomplete, [css.reverse, !this.state.isInFirstPartOfScreen])}>
						{this.props.autocomplete.filter((item) => item.toLowerCase().includes(this.state?.value?.toLowerCase() ?? this.props.value?.toString().toLowerCase() ?? '')).map((item) => (<li key={item} onClick={this.onAutoCompleteClick(item)}><Text>{item}</Text></li>))}
					</ul>
				)}
			</div>
		)
	}

	/**
	 * event for autocomplete to detect where on the screen it shoul display
	 */
	private parentScroll = async () => {
		const div = this.parentRef.current
		if (!div) {return}
		const result = !(div.offsetTop - window.scrollY >= window.innerHeight / 2)
		// console.log(result, div, this.state.isInFirstPartOfScreen)
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

	private onAutoCompleteClick = (value: string) => async () => {
		// console.log('test')
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
		if (this.props.type === 'textarea') {
			await this.parentScroll()
		}
	}

	private onChange = async (event?: React.FormEvent<HTMLDivElement>) => {
		if (event) {
			this.setState({value: (event.target as HTMLInputElement).value })
		}
	}

}
