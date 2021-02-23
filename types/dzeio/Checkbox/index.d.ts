import React from 'react';
import { ColorType } from '../interfaces';
interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    id: string;
    type?: undefined;
    radio?: boolean;
    switch?: boolean;
    color?: ColorType;
}
export default class Checkbox extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
