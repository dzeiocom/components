import { buildClassName } from '../Util'
import Button from '../Button'
import Box from '../Box'
import Text from '../Text'
import Router from 'next/router'
import React from 'react'
import { X } from 'lucide-react'

import css from './NotificationManager.module.styl'

export interface Notification {
	message: string
	actions?: Array<{
		txt: string
		action: (this: HTMLInputElement, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	}>
	ttl?: number
	internal?: {
		timeRemaining: number
	}
}

interface Props {
	manageRoutes?: boolean
	ttl?: number
	notifications?: Array<string | Notification>
}

interface State {
	notifications: Array<Notification | undefined>
}

export default class NotificationManager extends React.Component<Props, State> {

	private static instance: NotificationManager


	public state: State = {
		notifications: []
	}

	private interval?: NodeJS.Timeout
	private freezedNotification?: number

	public constructor(props: Props | Readonly<Props>) {
		super(props)
		NotificationManager.instance = this
	}

	public static addNotification(notif: Omit<Notification, 'internal'> | string): number {
		const realNotif: Notification = typeof notif === 'string' ? { message: notif, ttl: this.instance.props.ttl ?? 2000 } : notif

		if (realNotif.ttl) {
			realNotif.ttl /= 100
			realNotif.internal = { timeRemaining: realNotif.ttl }
		}
		const notifs = this.instance.state.notifications
		const id = notifs.push(realNotif) - 1
		this.instance.setState({
			notifications: notifs
		})
		return id
	}

	public static removeNotification(id: number, array?: Array<Notification|undefined>) {
		const notifs = array || this.instance.state.notifications
		notifs[id] = undefined
		if (array) {
			return
		}
		this.instance.setState({
			notifications: notifs
		})
	}

	public componentDidMount() {
		if (this.props.notifications) {
			for (const notif of this.props.notifications) {
				NotificationManager.addNotification(notif)
			}
		}
		if (this.props.manageRoutes) {
			Router.events.on('routeChangeComplete', this.checkRouteForMessage)
			this.checkRouteForMessage()
		}
	}

	public componentDidUpdate() {
		if (this.state.notifications.length > 0 && !this.interval) {
			this.interval = setInterval(() => {
				const notifs = this.state.notifications
				for (let id = 0; id < notifs.length; id++) {
					const notif = notifs[id]
					if (this.freezedNotification === id && notif?.ttl) {
						notif.internal = {timeRemaining: notif.ttl}
					}
					if (!notif || typeof notif.internal?.timeRemaining !== 'number' || id === this.freezedNotification) {
						continue
					}
					if (notif.internal.timeRemaining < 1) {
						NotificationManager.removeNotification(id)
					}
					notif.internal.timeRemaining -= 1
				}
				this.setState({
					notifications: notifs
				})
			}, 100)
		}
		if (this.state.notifications.length === 0 && this.interval) {
			clearInterval(this.interval)
			this.interval = undefined
		}
	}

	public componentWillUnMount() {
		if (this.interval) {
			clearInterval(this.interval)
		}
	}

	public render = () => (
		<section className={css.section}>
			{this.state.notifications.map((el, index) => {
				if (el === undefined) {
					return
				}
				return (
					<div
						key={index}
						onMouseEnter={this.onMouseEnter(index)}
						onMouseLeave={this.onMouseExit(index)}
						className={buildClassName([css.remove, typeof el.internal?.timeRemaining === 'number' && el.internal.timeRemaining <= 3])}
					>
						<Box
							title={el.message}
							rightHeader={(
								<Text><X onClick={() => NotificationManager.removeNotification(index)} /></Text>
							)}
						>
							{el.actions && (
								<div>
									{el.actions.map((btn, aIndex) => (
										<Button
											onClick={btn.action as unknown as ((event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void)}
											key={aIndex}
										>{btn.txt}</Button>
									))}
								</div>
							)}
						</Box>
					</div>
				)
			})}
		</section>
	)

	private onMouseEnter = (id: number) => () => {
		this.freezedNotification = id
	}

	private onMouseExit = (id: number) => () => {
		if (this.freezedNotification === id) {
			this.freezedNotification = undefined
		}
	}

	private checkRouteForMessage = () => {
		const msg = Router.query.msg
		console.log(msg)
		if (typeof msg === 'string') {
			NotificationManager.addNotification(decodeURI(msg))
		}
	}
}
