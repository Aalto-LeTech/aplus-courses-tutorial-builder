import React from 'react';
import { TextInput, TextInputProps } from './itemUtils';

type SingleLineItemProps = {
    title: string;
    info: string;
    inputProps: TextInputProps<HTMLInputElement>;
    onSubmit: (value: string) => void;
};

const SingleLineItem: React.FC<SingleLineItemProps> = ({
    title,
    info,
    inputProps,
    onSubmit,
}) => {
    return (
        <form
            className="bottom-item"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputProps.value);
                inputProps.setUnsavedChanges(false);
            }}
        >
            <label>
                <h2>{title}</h2>
            </label>
            <div>{info}</div>
            <TextInput {...inputProps} />
            {inputProps.unsavedChanges && (
                <p style={{ marginTop: 0, marginBottom: 0 }}>Unsaved changes</p>
            )}
            <button type="submit">Save</button>
        </form>
    );
};

export default SingleLineItem;
