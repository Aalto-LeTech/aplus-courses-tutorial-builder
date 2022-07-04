import React from 'react';
import { TextAreaInput, TextInputProps } from './itemUtils';

type TextAreaItemProps = {
    title: string;
    inputProps: TextInputProps<HTMLTextAreaElement>;
};

const TextAreaItem: React.FC<TextAreaItemProps> = ({ title, inputProps }) => {
    return (
        <div className="bottom-item">
            <label>
                <h2>{title}</h2>
            </label>
            <TextAreaInput {...inputProps} />
        </div>
    );
};

export default TextAreaItem;
