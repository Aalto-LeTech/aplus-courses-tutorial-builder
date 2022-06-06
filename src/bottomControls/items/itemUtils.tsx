import React from 'react';

export type InputElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

export type TextInputProps<InputElement> = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: React.ChangeEventHandler<InputElement>;
    placeholder: string;
    unsavedChanges: boolean;
    setUnsavedChanges: (isUnsaved: boolean) => void;
};

export type BooleanInputProps = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const useTextInput = (
    defaultValue: string,
    placeholder: string
): TextInputProps<InputElement> => {
    const [value, setValue] = React.useState(defaultValue);
    const [unsavedChanges, setUnsavedChanges] = React.useState(false);
    const onChange: React.ChangeEventHandler<InputElement> = (e) => {
        setValue(e.target.value);
        setUnsavedChanges(true);
    };
    return {
        value,
        setValue,
        onChange,
        placeholder,
        unsavedChanges,
        setUnsavedChanges,
    };
};

export const useBooleanInput = (
    defaultValue: boolean,
    onChangeCallback: (checked: boolean) => void
): BooleanInputProps => {
    const [value, setValue] = React.useState(defaultValue);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.checked);
        onChangeCallback(e.target.checked);
    };
    return {
        value,
        setValue,
        onChange,
    };
};

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
