import React from 'react';
import { Props as HeaderProps } from '../Box/BoxHeader';
interface Props {
    children: React.ReactNode;
    onClose?: () => void;
    header?: HeaderProps;
}
export default class Popup extends React.Component<Props> {
    render: () => JSX.Element;
    private parentClose;
}
export {};
