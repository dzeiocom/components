import React from 'react';
interface Props {
    color?: 'black' | 'white';
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'em';
    className?: string;
    noDarkTheme?: boolean;
    align?: 'right' | 'center';
    children: React.ReactNode;
}
export default class Text extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
