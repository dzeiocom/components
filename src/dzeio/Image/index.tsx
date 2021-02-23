import React from 'react'
import { buildClassName } from '../Util'
import NextImage from 'next/image'

import css from './Image.module.styl'

export interface ImageProps {
	src: string
	deleteOnError?: boolean
	canFullscreen?: boolean
	width: number
	height: number
	alt?: string

	// ClassNames
	parentClassName?: string
	className?: string

	// Events
	onClick?: () => void
}

type evType<T = HTMLImageElement> = React.SyntheticEvent<T, Event>

export default class Image extends React.Component<ImageProps> {

	private ref: React.RefObject<HTMLImageElement> = React.createRef()
	private plchldr: React.RefObject<HTMLDivElement> = React.createRef()
	private parent: React.RefObject<HTMLDivElement> = React.createRef()
	private pic: React.RefObject<HTMLDivElement> = React.createRef()

	private cardPos: Array<number> = []
	private cardSize: Array<number> = []

	private isFullscreen = false

	public async componentDidMount() {
		if (this.props.canFullscreen) {
			window.addEventListener('scroll', this.onScroll)
			window.addEventListener('resize', this.onResize)
			this.onScroll()
			this.onResize()
		}
	}

	public async componentDidUpdate() {
		this.pic.current?.classList.remove(css.none)
		if (this.props.canFullscreen) {
			this.onScroll()
			this.onResize()
		}
		if (this.isFullscreen) {
			this.onClick()
		}
	}

	public async componentWillUnmount() {
		if (this.props.canFullscreen) {
			window.removeEventListener('scroll', this.onScroll)
			window.removeEventListener('resize', this.onResize)
		}
	}

	public render() {
		const pic = (
			<div ref={this.pic} className={buildClassName(this.props.parentClassName, css.parent)}>
				<NextImage
					className={buildClassName([css.image], [this.props.className])}
					src={this.props.src}
					onClick={this.props.canFullscreen ? this.onClick : this.props.onClick}
					onError={this.props.deleteOnError && this.onError || undefined}
					// layout="fill"
					width={this.props.width}
					height={this.props.height}
					alt={this.props.alt}
				/>
			</div>
		)
		if (this.props.canFullscreen) {
			return (
				<div ref={this.parent}>
					<div ref={this.plchldr} className={css.none}></div>
					{pic}
				</div>
			)
		}
		return pic
	}

	private onScroll = async () => {
		if (!this.ref.current || this.isFullscreen || !this.props.canFullscreen) {
			return
		}

		this.cardPos = [this.ref.current.offsetTop - window.scrollY, this.ref.current.offsetLeft - window.scrollX]
		this.ref.current.style.top = this.cardPos[0] + 'px'
		this.ref.current.style.left = this.cardPos[1] + 'px'
	}

	private onResize = async () => {
		if (!this.ref.current || !this.plchldr.current || !this.props.canFullscreen || this.isFullscreen) {
			return
		}
		let tmp = [this.ref.current.offsetHeight, this.ref.current.offsetWidth]
		if (this.parent.current) {
			tmp = [this.parent.current.offsetHeight, this.ref.current.offsetWidth]
		}
		this.plchldr.current.style.width = `${tmp[1]}px`
		this.plchldr.current.style.height = `${tmp[0]}px`
	}

	private onClick = async () => {
		if (!this.ref.current || !this.props.canFullscreen || !this.plchldr.current) {
			return
		}
		if (this.props.onClick) {
			this.props.onClick()
		}

		const i = this.ref.current
		const c = this.plchldr.current
		const body = document.body
		i.style.top = this.cardPos[0] + 'px'
		i.style.left = this.cardPos[1] + 'px'

		if (this.isFullscreen) {
			i.style.width = this.cardSize[1] + 'px'
			i.style.height = this.cardSize[0] + 'px'
			body.classList.remove(css.hideOverflow)
			i.classList.remove(css.ph2)
			i.classList.add(css.after)

			setTimeout(() => {
				if (i.classList.contains(css.ph2) || i.classList.contains(css.ph1) || this.isFullscreen) {
					return
				}
				const w = this.valToPixel(this.props.width)
				const mh = this.valToPixel(this.props?.height)
				const mw = this.valToPixel(this.props?.width)
				c.classList.add(css.none)
				i.style.height = ''
				i.style.width = w
				i.style.maxHeight = mh
				i.style.maxWidth = mw
				i.classList.remove(css.after)
			}, 350)
			this.isFullscreen = false
		} else {
			i.classList.add(css.ph1)
			c.classList.remove(css.none)
			i.classList.add(css.ph2)
			i.classList.remove(css.ph1)
			body.classList.add(css.hideOverflow)
			this.isFullscreen = true
		}
	}

	private valToPixel(value: number|string|undefined): string {
		if (typeof value === 'number') {
			return `${value}px`
		}
		if (typeof value === 'undefined') {
			return ''
		}
		return value
	}

	private onLoad = async (ev: evType) => {
		ev.currentTarget.style.height = ''
		ev.currentTarget.style.width = ''
	}

	private onError = async (ev: evType) => {
		this.w('Picture not loaded', ev.currentTarget.src)
		ev.currentTarget.parentElement?.classList.add(css.none)
	}

	private w(...messages: any) {
		console.warn('[ Picture ]', ...messages)
	}

}
