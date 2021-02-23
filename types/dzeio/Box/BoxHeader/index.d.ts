import React from 'react';
export interface Props {
    title?: string;
    titleColSize?: number;
    subtitle?: string;
    delimiter?: boolean;
    titleClassName?: string;
}
export default class BoxHeader extends React.Component<Props> {
    render: () => JSX.Element;
}
