import { useGranularEffect } from 'granular-hooks';
import React from 'react';
import BottomItemBase from './bottomItemBase';
import {
    InputElement,
    SelectInputProps,
    TextAreaInput,
    TextInput,
    TextInputProps,
    useTextInput,
} from './itemUtils';
import Selector from './selector';

type ListItemProps = {
    title: string;
    info: string;
    onRemoveClick: (index: number) => void;
    inputProps: TextInputProps<InputElement> | SelectInputProps;
    listItems: string[];
};

type ListItemPropsChildren = ListItemProps & {
    children: React.ReactNode;
};

export type TextInputListItemProps = ListItemProps & {
    inputProps: TextInputProps<HTMLInputElement>;
    onSaveClick: (index: number, value: string) => void;
    onAddClick: (value: string) => void;
};

export type SelectorListItemProps = ListItemProps & {
    selectorItems: Map<string, string>;
    inputProps: SelectInputProps;
    onAddClick: (value: string) => void;
};

const ListItem: React.FC<ListItemPropsChildren> = ({
    title,
    info,
    onRemoveClick,
    listItems,
    inputProps,
    children: inputChild,
}) => {
    return (
        <BottomItemBase title={title} info={info} inputProps={inputProps}>
            <div>
                {Array.from(listItems.entries()).map(([index, item]) => {
                    return (
                        <div key={index} className="list-item">
                            <span>{item}</span>
                            <button onClick={() => onRemoveClick(index)}>
                                Remove
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="list-item">{inputChild}</div>
        </BottomItemBase>
    );
};

export const TextInputListItem: React.FC<TextInputListItemProps> = ({
    title,
    info,
    inputProps,
    onRemoveClick,
    onSaveClick,
    onAddClick,
    listItems,
}) => {
    inputProps.setAutosave(false);
    return (
        <BottomItemBase title={title} info={info} inputProps={inputProps}>
            <div>
                {Array.from(listItems.entries()).map(([index, item]) => {
                    return (
                        <EditableListItem
                            key={index}
                            defaultValue={item}
                            index={index}
                            onSaveClick={onSaveClick}
                            onRemoveClick={onRemoveClick}
                        />
                    );
                })}
            </div>
            <div className="list-item">
                <TextInput {...inputProps} />
                <button
                    onClick={() => {
                        onAddClick(inputProps.value);
                        inputProps.setValue('');
                    }}
                >
                    Add
                </button>
            </div>
        </BottomItemBase>
    );
};

export type EditableListItemProps = {
    index: number;
    defaultValue: string;
    onSaveClick: (index: number, value: string) => void;
    onRemoveClick: (index: number) => void;
};

const EditableListItem: React.FC<EditableListItemProps> = ({
    index,
    defaultValue,
    onSaveClick,
    onRemoveClick,
}) => {
    const handleOnSubmit = React.useCallback(
        (value: string) => onSaveClick(index, value),
        [onSaveClick, index]
    );
    const inputProps = useTextInput('Value', handleOnSubmit);
    useGranularEffect(
        () => {
            inputProps.setValue(defaultValue);
        },
        [],
        [inputProps]
    );

    return (
        <div className="list-item">
            <TextAreaInput {...inputProps} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <button onClick={() => onRemoveClick(index)}>Remove</button>
            </div>
        </div>
    );
};

export const SelectorListItem: React.FC<SelectorListItemProps> = ({
    selectorItems,
    title,
    info,
    inputProps,
    onAddClick,
    onRemoveClick,
    listItems,
}) => {
    return (
        <ListItem
            title={title}
            info={info}
            listItems={listItems}
            inputProps={inputProps}
            onRemoveClick={onRemoveClick}
        >
            <Selector inputProps={inputProps} items={selectorItems} />
            <button
                onClick={() => {
                    onAddClick(inputProps.value);
                }}
            >
                Add
            </button>
        </ListItem>
    );
};
