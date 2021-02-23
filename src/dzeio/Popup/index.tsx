import React from 'react'
import { X } from 'react-feather'
import { BoxWrapper, BoxHeader, BoxBody } from '../Box'
import { Props as HeaderProps } from '../Box/BoxHeader'
import Row from '../Row'

import css from './Popup.module.styl'

interface Props {
	children: React.ReactNode
	onClose?: () => void
	header?: HeaderProps
}

export default class Popup extends React.Component<Props> {

	public render = () => (
		<Row onClick={this.parentClose} justify="center" align="center" className={css.popup}>
			<BoxWrapper className={css.popupChild}>
				<BoxHeader {...this.props.header}>
					<X onClick={this.props.onClose} className={css.exit} />
				</BoxHeader>
				<BoxBody>
					{this.props.children}
				</BoxBody>
			</BoxWrapper>
		</Row>
	)

	private parentClose = (ev: React.MouseEvent<HTMLDivElement>) => {
		if ((ev.target as HTMLElement).classList.contains(css.popup) && this.props.onClose) {
			this.props.onClose()
		}
	}

}
