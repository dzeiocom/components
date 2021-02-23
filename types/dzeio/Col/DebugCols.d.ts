import React from 'react';
declare enum Breakpoint {
    MOBILE = 0,
    TABLET = 1,
    COMPUT = 2
}
interface States {
    breakpoint: Breakpoint;
}
export default class DebugCols extends React.Component<unknown, States> {
    state: States;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render: () => JSX.Element;
    private onResize;
}
export {};
