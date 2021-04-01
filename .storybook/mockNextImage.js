// https://stackoverflow.com/a/64765638/7335674

import * as nextImage from 'next/image'

Object.defineProperty(nextImage, 'default', {
	configurable: true,
	value: (props) => {
		return (
			<div style={{display: 'inline-block', maxWidth: '100%', overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0}}>
				<div style={{boxSizing: 'border-box', display: 'block', maxWidth: '100%'}}>
					<img {...props} alt="" aria-hidden="true" role="presentation" style={{maxWidth: '100%', display: 'block', margin: 0, border: 'none', padding: 0}} />
				</div>
				<img {...props} style={{position: 'absolute', inset: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%'}} />
			</div>
		)
	},
})
