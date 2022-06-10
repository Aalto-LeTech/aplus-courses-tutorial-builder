import React from 'react';
import { TextAreaInput, TextInputProps } from './itemUtils';

type TextAreaItemProps = {
    title: string;
    inputProps: TextInputProps<HTMLTextAreaElement>;
};

const TextAreaItem: React.FC<TextAreaItemProps> = ({ title, inputProps }) => {
    return (
        <form
            className={`bottom-item ${
                inputProps.unsavedChanges ? 'unsaved' : ''
            }`}
            onSubmit={(e) => {
                e.preventDefault();
                inputProps.onSubmit();
            }}
        >
            <label>
                <h2>{title}</h2>
            </label>
            <TextAreaInput {...inputProps} />
            {inputProps.unsavedChanges && (
                <p style={{ margin: 0 }}>Unsaved changes</p>
            )}
            <button type="submit">Save</button>
        </form>
    );
};

export default TextAreaItem;
