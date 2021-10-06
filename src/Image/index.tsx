import React, { MouseEventHandler } from 'react'

import NextImage, { ImageProps } from 'next/image'
import css from './Image.module.styl'
import { buildClassName } from '../Util'

interface Props {
	imageProps: ImageProps
	/**
	 * Define if the image can go fullscreen
	 */
	fullscreen?: boolean
}

interface States {
	image?: {
		size: [number | string, number | string]
		pos: [number, number]
	}
	transform?: [number, number]
	className?: string
}

export default class Image extends React.Component<Props, States> {

	public state: States = {}

	private animationCount = 0

	public componentDidUpdate() {
		if (!this.props.fullscreen) {return}
		if (this.state.image) {
			document.body.classList.add(css.body)
		} else {
			document.body.classList.remove(css.body)
		}
	}

	public componentWillUnmount() {
		if (!this.props.fullscreen) {return}
		document.body.classList.remove(css.body)
	}

	public render() {
		if (!this.props.fullscreen) {
			return <NextImage
				{...this.props.imageProps}
				objectFit="contain"
			/>
		}
		return (
			<>
				{this.state.image && (
					<div style={{width: this.state.image.size[0], height: this.state.image.size[1]}}></div>
				)}

				<div
					className={buildClassName(css.parent, [css.fs1, this.state.image], [this.state.className, this.state.image])}
					style={this.state.image ? {
						top: this.state.image.pos[1],
						left: this.state.image.pos[0],
						width: this.state.image.size[0],
						height: this.state.image.size[1]
					} : undefined}
					onClick={this.props.fullscreen ? this.onClick : undefined}

				>
					<NextImage
						priority
						quality={100}
						{...this.props.imageProps}
						objectFit="contain"
					/>
				</div>
			</>
		)
	}

	private onClick: MouseEventHandler<HTMLDivElement> = (ev) => {
		const target = ev.currentTarget
		const isFullscreen = !(this.state.image && this.state.className)
		const currentCount = ++this.animationCount
		this.setState(isFullscreen ? {
			image: this.state.image ?? {
				size: [target.offsetWidth, target.offsetHeight],
				pos: [target.offsetLeft - window.scrollX, target.offsetTop - window.scrollY]
			},
			className: undefined
		} : {
			className: undefined
		}, () => {
			setTimeout(() => {
				if (this.animationCount !== currentCount) {
					return
				}
				this.setState({
					className: isFullscreen ? css.fs2 : undefined,
					image: isFullscreen ? this.state.image : undefined
				})
			}, isFullscreen ? 10 : 310)
		})
	}
}
