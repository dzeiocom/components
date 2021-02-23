import React from 'react';
interface Props {
    children?: React.ReactNode;
    direction?: 'row-reverse' | 'column' | 'column-reverse';
    mobileDirection?: 'row-reverse' | 'column' | 'column-reverse';
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'flex-start' | 'center' | 'flex-end' | 'baseline';
    nowrap?: boolean;
    nogrow?: boolean;
    className?: string;
    nomargin?: boolean;
    onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export default class Row extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
