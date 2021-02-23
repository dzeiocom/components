import React from 'react';
import { ColorType } from '../interfaces';
interface Props {
    color?: ColorType;
    className?: string;
    children: React.ReactNode;
}
export default class GradientBackground extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
