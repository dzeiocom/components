import React, { FC } from 'react';
import { IconProps, ColorType } from '../interfaces';
interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id?: string;
    label?: string;
    icon?: FC<IconProps>;
    helper?: string;
    characterCount?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    selectRef?: React.RefObject<HTMLSelectElement>;
    type?: 'color' | 'text' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'range' | 'search' | 'tel' | 'time' | 'url' | 'week' | 'select';
    maxLength?: number | undefined;
    infinityText?: string;
    filled?: boolean;
    opaque?: boolean;
    block?: boolean;
    color?: ColorType;
    children?: React.ReactNode;
}
export default class Input extends React.Component<Props> {
    private charCountRef;
    componentDidMount(): void;
    render(): JSX.Element;
    private updatecharCount;
}
export {};
