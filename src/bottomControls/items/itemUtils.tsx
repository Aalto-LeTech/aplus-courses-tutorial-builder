import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export type InputElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

export type InputProps<T, E> = {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    onChange: React.ChangeEventHandler<E>;
    uuid: string;
};

export type TextInputProps<InputElement> = InputProps<string, InputElement> & {
    placeholder: string;
    onSubmit: () => void;
    autosave: boolean;
    setAutosave: (autosave: boolean) => void;
};

export type BooleanInputProps = InputProps<boolean, HTMLInputElement>;

export type SelectInputProps = InputProps<string, HTMLSelectElement>;

const useInput = <T,>(defaultValue: T) => {
    const [value, setValue] = React.useState(defaultValue);
    const uuid = uuidv4();
    return { value, setValue, uuid };
};

export const useTextInput = (
    placeholder: string,
    onSubmitCallback: (value: string) => void
): TextInputProps<InputElement> => {
    const { value, setValue, uuid } = useInput('');
    const [autosave, setAutosave] = React.useState(true);
    const onChange: React.ChangeEventHandler<InputElement> = (e) => {
        setValue(e.target.value);
        if (autosave) onSubmitCallback(e.target.value);
    };
    const onSubmit = React.useCallback(
        () => onSubmitCallback(value),
        [onSubmitCallback, value]
    );
    return {
        value,
        setValue,
        onChange,
        onSubmit,
        placeholder,
        uuid,
        autosave,
        setAutosave,
    };
};

export const useBooleanInput = (
    defaultValue: boolean,
    onChangeCallback: (checked: boolean) => void
): BooleanInputProps => {
    const { value, setValue, uuid } = useInput(defaultValue);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.checked);
        onChangeCallback(e.target.checked);
    };
    return {
        value,
        setValue,
        onChange,
        uuid,
    };
};

export const useSelectInput = (
    onChangeCallback: (value: string) => void = () => {}
): SelectInputProps => {
    const { value, setValue, uuid } = useInput('');
    const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setValue(e.target.value);
        onChangeCallback(e.target.value);
    };
    return {
        value,
        setValue,
        onChange,
        uuid,
    };
};

export const TextInput: React.FC<TextInputProps<HTMLInputElement>> = (
    props
) => {
    return (
        <input
            type="text"
            id={props.uuid}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={(ev) => {
                if (!props.autosave && ev.code === 'Enter') {
                    props.onSubmit();
                }
            }}
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
