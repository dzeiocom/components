import React from 'react';
interface Props {
    size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    children?: React.ReactNode;
    className?: string;
    nogrow?: boolean;
    tabletSize?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    tabletoffset?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    tabletGrow?: boolean;
    mobileSize?: 0 | 1 | 2 | 3 | 4;
    mobileoffset?: 1 | 2 | 3;
    mobileGrow?: boolean;
}
export default class Col extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
