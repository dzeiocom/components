import { SVGAttributes } from 'react'

export type ColorType = 'primary' | 'info' | 'success' | 'error' | 'warning'

export interface IconProps extends SVGAttributes<SVGElement> {
	color?: string
	size?: string | number
}
