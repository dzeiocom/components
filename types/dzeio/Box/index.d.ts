import React from 'react';
import BoxWrapper from './BoxWrapper';
import BoxHeader from './BoxHeader';
import BoxBody from './BoxBody';
interface Props {
    outline?: boolean;
    className?: string;
    title?: string;
    titleColSize?: number;
    subtitle?: string;
    delimiter?: boolean;
    titleClassName?: string;
    headerButtons?: React.ReactNode;
    noPadding?: boolean;
}
export default class Box extends React.Component<Props> {
    render: () => JSX.Element;
}
export { BoxWrapper, BoxHeader, BoxBody };
