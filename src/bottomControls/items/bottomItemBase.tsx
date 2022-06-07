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
    const unsavedChangesText = React.useCallback(() => {
        return (inputProps as TextInputProps<InputElement>)?.unsavedChanges ? (
            <p style={{ userSelect: 'none' }}>Unsaved changes</p>
        ) : (
            <></>
        );
    }, [inputProps]);
    return (
        <div
            className={`bottom-item ${
                (inputProps as TextInputProps<InputElement>)?.unsavedChanges
                    ? 'unsaved'
                    : ''
            }`}
        >
            <label htmlFor={inputProps.uuid}>
                <h2>{title}</h2>
                <div>{info}</div>
            </label>
            {children}
            {unsavedChangesText()}
        </div>
    );
};

export default BottomItemBase;
