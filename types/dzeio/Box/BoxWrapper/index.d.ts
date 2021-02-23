import React from 'react';
interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    outline?: boolean;
    className?: string;
}
export default class BoxWrapper extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
