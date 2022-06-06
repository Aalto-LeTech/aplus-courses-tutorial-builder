import React from 'react';
import { TextAreaInput, TextInputProps } from './itemUtils';

type TextAreaItemProps = {
    title: string;
    inputProps: TextInputProps<HTMLTextAreaElement>;
    onSubmit: () => void;
};

const TextAreaItem: React.FC<TextAreaItemProps> = ({
    title,
    inputProps,
    onSubmit,
}) => {
    return (
        <form
            className="bottom-item"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <label>
                <h2>{title}</h2>
            </label>
            <TextAreaInput {...inputProps} />
            <button type="submit">Save</button>
        </form>
    );
};

export default TextAreaItem;
