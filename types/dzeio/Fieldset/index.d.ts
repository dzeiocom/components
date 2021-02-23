import React from 'react';
interface Props {
    title?: string;
    children?: React.ReactNode;
}
export default class Fieldset extends React.Component<Props> {
    render: () => JSX.Element;
}
export {};
