import React from 'react';
interface Props {
    children: React.ReactNode;
    className?: string;
}
export default class Container extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
