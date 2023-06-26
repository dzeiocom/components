import React, { FocusEvent } from 'react'

import { objectEqual, objectOmit } from '@dzeio/object-util'
import { ChevronDown, MinusSquare, PlusSquare } from 'lucide-react'
import Menu from '../Menu'
import Text from '../Text'
import { buildClassName } from '../Util'
import { Icon } from '../interfaces'
import css from './Input.module.styl'

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

	/**
	 * Always display every choices
	 */
	displayAllOptions?: boolean

	/**
	 * Handle the change event
	 * you will be returned the value (for choices too)
	 */
	onValue?: (newValue: string) => void

	/**
	 * Make the input take the whole width
	 */
	block?: boolean

	/**
	 * if enabled value will not be sent if it is not contained in the choices
	 */
	strictChoices?: boolean

	/**
	 * Allows you to disable automatic icons
	 */
	disableAutoIcons?: boolean

	placeholder?: string
}

interface States {
	textAreaHeight?: number
	value?: string
	displayedValue?: string
	valueUpdate: boolean
	isInFirstPartOfScreen?: boolean
	list: Menu['props']['items']
}

export default class Input extends React.Component<Props, States> {

	public state: States = {
		valueUpdate: false,
		list: []
	}

	private inputRef: React.RefObject<HTMLInputElement> = React.createRef()
	private parentRef: React.RefObject<HTMLDivElement> = React.createRef()

	public componentDidMount() {

		// Handle Text Area
		if (this.props.type === 'textarea') {
			this.textareaHandler()
		}

		// Handle choices
		if (this.props.choices) {
			window.addEventListener('scroll', this.parentScroll)
			this.parentScroll()
		}

		// Handle default Value
		if (typeof (this.props.defaultValue ?? this.props.value) !== 'undefined') {
			const value = this.props.defaultValue ?? this.props.value ?? ''
			if (!this.props.choices) {
				this.setState({displayedValue: value.toString()})
			} else {
				const res = this.props.choices.find(
					(it) => typeof it === 'string' ? it === value : it.value === value
				)
				if (!res) {
					if (this.props.strictChoices) {
						this.setState({value: '', displayedValue: ''})
					} else {
						this.setState({displayedValue: value.toString()})
					}
					return
				}
				this.setState({
					displayedValue: typeof res === 'string' ? res : res.display
				})
			}
		}

		if (this.props.choices) {
			this.setState({list: this.buildList()})
		}
	}

	public componentWillUnmount() {
		if (this.props.choices) {
			window.removeEventListener('scroll', this.parentScroll)
		}
	}


	public async componentDidUpdate(prevProps: Props, prevStates: States) {
		if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
			if (this.props.choices) {
				const choice = this.props.choices.find((it) => typeof it === 'string' ? it : it.value === this.props.value?.toString())
				if (choice) {
					this.setState({
						displayedValue: typeof choice === 'string' ? choice : choice.display,
						value: typeof choice === 'string' ? choice : choice.value,
						valueUpdate: true
					})
				}
			} else {
				this.setState({ displayedValue: this.props.value?.toString(), value : this.props.value?.toString(), valueUpdate: true })
			}
		}
		if (
			prevStates.value !== this.state.value ||
			prevStates.displayedValue !== this.state.displayedValue ||
			prevStates.valueUpdate !== this.state.valueUpdate ||
			!objectEqual(prevProps.choices ?? [], this.props.choices ?? [])
		) {
			this.setState({list: this.buildList()})
		}
	}

	/**
	 * return the real value of the field (depending if you a choices and the display value)
	 * @returns the value of the field
	 */
	public value(): string | number | ReadonlyArray<string> | undefined {
		return this.state?.value ?? this.state.displayedValue ?? this.props.value ?? undefined
	}

	public render() {
		const props: Props = objectOmit(this.props, 'iconLeft', 'iconRight', 'inputRed', 'helper', 'choices', 'onValue', 'block', 'defaultValue', 'label', 'strictChoices')

		const baseProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
			ref: this.props.inputRef || this.inputRef,
			className: buildClassName(
				[css.iconLeft, this.props.type === 'number' || this.props.iconLeft],
				[css.iconRight, this.props.type === 'number' || this.props.iconRight || this.props.choices]
			),
			onInvalid: (ev: React.FormEvent<HTMLInputElement>) => ev.preventDefault(),
			onFocus: (ev: FocusEvent<HTMLInputElement, Element>) => {
				this.setState({valueUpdate: false})

				if (props.onFocus) {
					props.onFocus(ev)
				}
			},
			value: this.state.displayedValue ?? this.state.value ?? this.props.value,
			onChange: this.onChange
		}

		let iconRight = this.props.iconRight
		let iconLeft = this.props.iconLeft

		let input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = <input
			{...props}
			{...baseProps}
		/>

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
				if (!this.props.disabled && !this.props.disableAutoIcons) {
					iconLeft = this.props.iconLeft ?? {icon: MinusSquare, transformer: (v) => {
						let value = this.ensureNumber(v)
						return (value - this.ensureNumber(this.props.step, 1)).toString()
					}}
					iconRight = this.props.iconRight ?? {icon: PlusSquare, transformer: (v) => {
						let value = this.ensureNumber(v)
						return (value + this.ensureNumber(this.props.step, 1)).toString()
					}}
				}
				input = <input
					{...props}
					{...baseProps}
				/>
				break
		}


		return (
			<>
				{this.props.label && (
					<label className={css.label} htmlFor={this.props.id}>{this.props.label}</label>
				)}
				<div
					className={buildClassName(
						css.parent,
						[css.block, this.props.block]
					)}
					ref={this.parentRef}
				>

					{input as any}

					{/* Left Icon */}
					{this.getIcon(iconLeft, 'left')}

					{/* Right Icon */}
					{iconRight ?
						this.getIcon(iconRight, 'right') :
						this.props.choices && !this.props.disabled && !this.props.disableAutoIcons && (
							<ChevronDown size="18" className={buildClassName(css.right, css.rotate)} />
						)
					}

					{/* Helper text */}
					{this.props.helper && (
						<Text>{this.props.helper}</Text>
					)}

					{/* List when this is an autocomplete */}
					{this.props.choices && (
						<Menu
							outline
							hideWhenEmpty
							className={buildClassName(css.autocomplete, [css.reverse, !this.state.isInFirstPartOfScreen])}
							items={this.state.list ?? []}
							onClick={this.listSelection}
						/>
					)}
				</div>
			</>
		)
	}

	private ensureNumber(item: string | number | undefined, defaultValue: number = 0): number {
		console.log('ensureNumber', item, typeof item)
		if (typeof item === 'number') return item
		if (typeof item === 'undefined') return defaultValue
		const res = parseFloat(item)
		if (isNaN(res)) {
			return defaultValue
		}
		return res
	}

	/**
	 * event for the menu to detect where on the screen it should be displayed
	 */
	private parentScroll = async () => {
		const div = this.parentRef.current
		if (!div) {return}
		const result = !(div.offsetTop - window.scrollY >= window.innerHeight / 2)

		if (this.state.isInFirstPartOfScreen !== result) {
			this.setState({isInFirstPartOfScreen: result})
		}
	}

	/**
	 * Build the interactive list for the item
	 * @returns the list
	 */
	private buildList(): Menu['props']['items'] {
		if (!this.props.choices) {
			return []
		}
		const v = this.state.displayedValue?.toLowerCase()
		return this.props.choices
			.map((item, index) => typeof item === 'string' ? {item: {display: item, value: item}, index} : {item, index})
			.filter(
				(item) => this.props.displayAllOptions || !this.state.valueUpdate || !v || item.item.display.toLowerCase().includes(v) || item.item.display.toLowerCase().toLowerCase().includes(v)
			)
			.map((item) => item.item)
	}

	/**
	 * handle when an item is selected
	 * @param key the index of the selected item
	 */
	private listSelection: Menu['props']['onClick'] = async (_, key) => {
		const newValue = this.state.list[key]

		if (!newValue) {
			return
		}

		if (typeof newValue === 'string') {
			this.setState({value: newValue, displayedValue: newValue, valueUpdate: true})
			return
		}

		this.setState({displayedValue: newValue.display, value: newValue.value, valueUpdate: true})
	}

	/**
	 * get the icon duh
	 * @param icon the icon
	 * @returns the icon
	 */
	private getIcon(Icon: Icon | {
		icon: Icon
		transformer: (value: string) => string
	} | undefined, position: 'left' | 'right') {
		if (!Icon) {
			return undefined
		}

		if ('icon' in Icon) {
			// 18 + 16 of padding
			return <Icon.icon size={16*2+18} className={buildClassName(css[position], css.iconClickable)} onClick={async () => {
				if (this.props.disabled) {return}
				const value = Icon.transformer(this.state.value ?? this.state.displayedValue ?? '')
				this.onChange(value)
			}} />
		}

		return <Icon size="18" className={css[position]} />
	}

	/**
	 * Handle textarea height changes
	 */
	private textareaHandler = async () => {
		this.setState({textAreaHeight: undefined}, () => {
			if (!this.inputRef.current) {return}
			this.setState({ textAreaHeight: this.inputRef.current.scrollHeight })
		})
	}

	/**
	 * handle the change event of the input
	 * @param event the event
	 */
	private onChange = async (event: React.ChangeEvent<HTMLInputElement>|string | number) => {
		// get the input
		let value = typeof event === 'object' ? event.currentTarget.value : event

		if (typeof value === 'number') {
			value = value.toString()
		}

		if (this.props.type === 'number') {
			const val = this.ensureNumber(value)
			const min = typeof this.props.min !== 'undefined' ? typeof this.props.min === 'string' ? this.ensureNumber(this.props.min) : this.props.min : -Infinity
			const max = typeof this.props.max !== 'undefined' ? typeof this.props.max === 'string' ? this.ensureNumber(this.props.max) : this.props.max : Infinity
			console.log('pouet', val, this.props.min, min, this.props.max, max)
			value = Math.min(max, Math.max(min, val)).toString()
		}

		if (this.props.strictChoices) {
			this.setState({ displayedValue: value, valueUpdate: true })
			return
		}

		if (this.props.onChange && typeof event === 'object') {
			event.currentTarget.value = value
			this.props.onChange(event)
		}

		this.props.onValue?.(value)

		this.setState({ value: value, displayedValue: value, valueUpdate: true })
	}

}
