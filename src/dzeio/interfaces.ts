import { SVGAttributes } from 'react'

export type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warning'

export interface IconProps extends SVGAttributes<SVGElement> {
	color?: string
	size?: string | number
}
