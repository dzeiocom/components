import React from 'react'
import css from './ProgressBox.module.styl'
import ProgressBar from '../ProgressBar'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import Box from '../Box'

interface Props {
	/**
	 * Number between 0 and 100%
	 */
	progress: number

	/**
	 * Text displayed in the middle
	 */
	text: string

	/**
	 * text displayed in the right of the box
	 */
	textProgress: string
}

/**
 * Display a simple Progress box that can be used for multiple things
 *
 * @version 1.0.0
 */
export default class extends React.PureComponent<Props> {

	public render = () => (
		<Box noPadding noBottomBorder>
			<Row className={css.padding}>
				<Col nogrow>
					<Text color="main">{this.props.progress}%</Text>
				</Col>
				<Col>
					<Text weight="bold" align="center">{this.props.text}</Text>
				</Col>
				<Col nogrow>
					<Text color="main">{this.props.textProgress}</Text>
				</Col>
			</Row>
			<ProgressBar noRoundBorders progress={this.props.progress} />
		</Box>
	)
}
