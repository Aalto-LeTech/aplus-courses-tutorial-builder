import React from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type TextInputProps<InputElement> = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: React.ChangeEventHandler<InputElement>;
    placeholder: string;
};

export function useTextInput(
    defaultValue: string,
    placeholder: string
): TextInputProps<InputElement> {
    const [value, setValue] = React.useState(defaultValue);
    const onChange: React.ChangeEventHandler<InputElement> = (e) => {
        setValue(e.target.value);
    };
    return {
        value,
        setValue,
        onChange,
        placeholder,
    };
}

export const TextInput: React.FC<TextInputProps<HTMLInputElement>> = (
    props
) => {
    return (
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    );
};

export const TextAreaInput: React.FC<TextInputProps<HTMLTextAreaElement>> = (
    props
) => {
    return (
        <textarea
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    );
};
