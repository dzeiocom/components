import React from 'react'

import Text from '../Text'
import css from './Footer.module.styl'

export default class Footer extends React.Component {
	public render = () => (
		<footer className={css.footer}>
			<Text align="center">Made with <span className={css.animation}>💗</span> by Dzeio</Text>
			<Text align="center">Copyright © 2020 Dzeio. All rights reserved.</Text>
		</footer>
	)
}
