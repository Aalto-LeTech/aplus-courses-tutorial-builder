import React from 'react';
import {
    BooleanInputProps,
    InputElement,
    SelectInputProps,
    TextInputProps,
} from './itemUtils';

type BottomItemBaseProps = {
    title: string;
    info: string;
    inputProps:
        | TextInputProps<InputElement>
        | BooleanInputProps
        | SelectInputProps;
    children: JSX.Element | JSX.Element[];
};

const BottomItemBase: React.FC<BottomItemBaseProps> = ({
    title,
    info,
    inputProps,
    children,
}) => {
    return (
        <div className="bottom-item">
            <label htmlFor={inputProps.uuid}>
                <h2>{title}</h2>
                <div>{info}</div>
            </label>
            {children}
        </div>
    );
};

export default BottomItemBase;
