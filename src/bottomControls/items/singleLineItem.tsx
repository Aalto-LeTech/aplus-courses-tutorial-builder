import React from 'react';
import { TextInput, TextInputProps } from './itemUtils';

type SingleLineItemProps = {
    title: string;
    info: string;
    inputProps: TextInputProps<HTMLInputElement>;
    onSubmit: () => void;
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
                onSubmit();
            }}
        >
            <label>
                <h2>{title}</h2>
            </label>
            <div>{info}</div>
            <TextInput {...inputProps} />
            <button type="submit">Save</button>
        </form>
    );
};

export default SingleLineItem;
