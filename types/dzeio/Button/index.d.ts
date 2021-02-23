import React, { FC } from 'react';
import { ColorType, IconProps } from '../interfaces';
interface Props {
    outline?: boolean;
    nomargintop?: boolean;
    color?: ColorType;
    children?: React.ReactNode;
    icon?: FC<IconProps> | string;
    size?: 'large' | 'small' | 'block';
    href?: string;
    as?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}
export default class Button extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
