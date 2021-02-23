import React from 'react';
interface Props {
    pos?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    content: Array<{
        name: string;
        href: string;
        as?: string;
    }>;
    show?: boolean;
}
export default class Menu extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
