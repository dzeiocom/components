import React from 'react'
import { X } from 'lucide-react'
import Text from '../Text'
import Box from '../Box'
import Row from '../Row'

import css from './Popup.module.styl'

interface Props {
	children: React.ReactNode
	onClose?: () => void
	header?: Box['props']
}

export default class Popup extends React.Component<Props> {

	public render = () => (
		<Row nomargin onClick={this.parentClose} justify="center" align="center" className={css.popup}>
			<Box {...this.props.header} className={css.popupChild} onClick={(ev) => ev.stopPropagation()} headerButtons={(<Text><X onClick={this.props.onClose} className={css.exit} /></Text>)}>
				{this.props.children}
			</Box>
		</Row>
	)

	private parentClose = (ev: React.MouseEvent<HTMLDivElement>) => {
		const target = ev.currentTarget
		if (target.classList.contains(css.popup) && this.props.onClose) {
			this.props.onClose()
		}
	}

}
