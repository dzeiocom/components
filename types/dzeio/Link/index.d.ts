import React from 'react';
interface Props {
    href: string;
    children?: React.ReactNode;
    className?: string;
    forceNewTab?: boolean;
}
export default class Link extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
