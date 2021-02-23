import React from 'react';
interface States {
    domain?: string;
    showUserMenu?: boolean;
}
interface Props {
    username?: string;
    userPic?: string;
    userMenu?: Array<{
        href: string;
        name: string;
    }>;
    loginUrl?: string;
    registerUrl?: string;
    logoUrl?: string;
    logoLabel?: string;
    logo?: {
        src: string;
        alt: string;
    };
}
export default class Navbar extends React.Component<Props, States> {
    state: States;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render: () => JSX.Element;
    private onClickAnywhere;
    private onMenuClick;
}
export {};
