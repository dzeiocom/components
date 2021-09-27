import React, { FC } from 'react'

import { ChevronDown } from 'lucide-react'
import Text from '../Text'
import { Icon } from '../interfaces'
import { buildClassName } from '../Util'
import css from './Input.module.styl'
import Menu from '../Menu'
import { objectClone } from '@dzeio/object-util'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id?: string
	label?: string
	iconLeft?: Icon | {
		icon: Icon
		transformer: (value: string) => string
	}
	iconRight?: Icon | {
		icon: Icon
		transformer: (value: string) => string
	}
	helper?: string
	inputRef?: React.RefObject<HTMLInputElement>
	type?: 'color' | 'text' | 'date' | 'datetime-local' |
	'email' | 'file' | 'month' | 'number' | 'password' |
	'range' | 'search' | 'tel' | 'time' | 'url' | 'week' |
	// Custom Types
	'textarea'
	choices?: Array<string | {display: string, value: string}>
}

interface States {
	textAreaHeight?: number
	value?: string
	isInFirstPartOfScreen?: boolean
}

export default class Input extends React.PureComponent<Props, States> {

	public state: States = {}

	// any because f*ck types
	private inputRef: React.RefObject<HTMLInputElement> = React.createRef()
	private parentRef: React.RefObject<HTMLDivElement> = React.createRef()

	public componentDidMount() {
		if (this.props.type === 'textarea') {
			this.textareaHandler()
		}
		if (this.props.choices) {
			window.addEventListener('scroll', this.parentScroll)
			this.parentScroll()
		}
	}

	public componentDidUpdate() {
		console.log(this.state)
	}

	public componentWillUnmount() {
		if (this.props.choices) {
			window.removeEventListener('scroll', this.parentScroll)
		}
	}

	public render() {
		const props: Props = objectClone(this.props)
		delete props.label
		delete props.iconLeft
		delete props.iconRight
		delete props.inputRef
		delete props.helper
		delete props.choices

		const baseProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
			placeholder: this.props.label || this.props.placeholder || ' ',
			ref: this.props.inputRef || this.inputRef,
			className: buildClassName(
				[css.iconLeft, this.props.iconLeft],
				[css.iconRight, this.props.iconRight || this.props.choices]
			),
			onInvalid: (ev: React.FormEvent<HTMLInputElement>) => ev.preventDefault(),
		}

		let input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

		switch (this.props.type) {
			case 'textarea':
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
				break
			case 'number':
				baseProps.onWheel = (ev: React.WheelEvent<HTMLInputElement>) => ev.currentTarget.blur()
			default:
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
				{input as any}

				{/* Left Icon */}
				{this.getIcon('left')}

				{/* Right Icon */}
				{this.props.iconRight ?
					this.getIcon('right') :
					(this.props.choices && !this.props.disabled) && (
					<ChevronDown size="18" className={buildClassName(css.right, css.rotate)} />
				)}

				{/* Helper text */}
				{(this.props.helper) && (
					<Text>{this.props.helper}</Text>
				)}

				{/* List when this is an autocomplete */}
				{this.props.choices && (
					// <ul className={buildClassName(css.autocomplete, [css.reverse, !this.state.isInFirstPartOfScreen])}>
					// 	{this.props.choices
					// 		.map((item, index) => typeof item === 'string' ? ({item: {display: item, value: item}, index}) : {item, index})
					// 		.filter(
					// 			(item) => !this.getValue() || [item.item.display.toLowerCase(), item.item.value.toLowerCase()]
					// 				.includes(this.getValue())
					// 		)
					// 		.map((item) => (<li key={item.index} onClick={this.onAutoCompleteClick(item.index)}><Text>{item.item.display}</Text></li>))}
					// </ul>
					<Menu
						outline
						hideWhenEmpty
						className={buildClassName(css.autocomplete, [css.reverse, !this.state.isInFirstPartOfScreen])}
						items={this.buildList()}
						onClick={this.listSelection}
					/>
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

	private buildList(): Menu['props']['items'] {
		if (!this.props.choices) {
			return []
		}
		const v = this.getValue().toLowerCase()
		return this.props.choices
		.map((item, index) => typeof item === 'string' ? ({item: {display: item, value: item}, index}) : {item, index})
		.filter(
			(item) => !v || item.item.display.toLowerCase().includes(v) || item.item.display.toLowerCase().toLowerCase().includes(v)
		)
		.map((item) => ({display: item.item.display, value: item.index}))
	}

	private listSelection: Menu['props']['onClick'] = async (value: number, key) => {
		const newValue = this.props.choices?.[value]
		if (!newValue) {
			return
		}
		if (typeof newValue === 'string') {
			return this.setValue(newValue)
		}
		await this.setValue(newValue.display)
		this.setState({value: newValue.value})
	}

	private getIcon(icon: 'left' | 'right') {
		const Icon = icon === 'left' ? this.props.iconLeft : this.props.iconRight
		if (!Icon) {
			return undefined
		}
		if ('icon' in Icon) {
			return <Icon.icon size="18" className={buildClassName(css[icon], css.iconClickable)} onClick={() => {
				const el = this.getElement()
				console.log(el, 'pouet')
				if (!el) {
					return
				}
				el.value = Icon.transformer(el.value)
			}} />
		}

		return <Icon size="18" className={css[icon]} />
	}

	private getValue(): string {
		return this.state?.value?.toLowerCase() ?? this.props.value?.toString().toLowerCase() ?? ''
	}

	private getElement(): undefined | HTMLInputElement {
		const item = this.props.inputRef || this.inputRef
		if (!item || !item.current) {return}
		return item.current
	}

	private textareaHandler = async () =>
		this.setState({textAreaHeight: undefined}, () => {
			if (!this.inputRef.current) {return}
			this.setState({textAreaHeight: this.inputRef.current.scrollHeight})
		})

		private async setValue(value: string) {
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
