import React from 'react';
export interface ImageProps {
    defaultHeight?: number;
    src?: string;
    sources?: Array<string>;
    deleteOnError?: boolean;
    downgradeOnError?: string;
    canFullscreen?: boolean;
    max?: {
        height?: number | string;
        width?: number | string;
    };
    width?: number | string;
    default?: {
        height?: number | string;
        width?: number | string;
    };
    alt?: string;
    classes?: string;
    className?: string;
    onClick?: () => void;
}
export default class Image extends React.Component<ImageProps> {
    private ref;
    private plchldr;
    private parent;
    private pic;
    private wasDowngraded;
    private cardPos;
    private cardSize;
    private isFullscreen;
    componentDidMount(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    render(): JSX.Element;
    private onScroll;
    private onResize;
    private onClick;
    private valToPixel;
    private onLoad;
    private onError;
    private w;
}
