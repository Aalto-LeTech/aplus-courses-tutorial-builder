import React from 'react';
import { TextInput, TextInputProps } from './itemUtils';
import Selector from './selector';

type ListItemProps = {
    title: string;
    info: string;
    onRemoveClick: (index: number) => void;
    listItems: string[];
};
type ListItemPropsChildren = ListItemProps & {
    children: React.ReactNode;
};

export type TextInputListItemProps = ListItemProps & {
    inputProps: TextInputProps<HTMLInputElement>;
    onAddClick: (value: string) => void;
};

export type SelectorListItemProps = ListItemProps & {
    selectorItems: Map<string, string>;
    inputProps: TextInputProps<HTMLSelectElement>;
    onAddClick: (value: string) => void;
};

const ListItem: React.FC<ListItemPropsChildren> = ({
    title,
    info,
    onRemoveClick,
    listItems,
    children,
}) => {
    return (
        <div className="bottom-item">
            <h2>{title}</h2>
            <div>{info}</div>
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
            <div className="list-item">{children}</div>
        </div>
    );
};

export const TextInputListItem: React.FC<TextInputListItemProps> = ({
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
            onRemoveClick={onRemoveClick}
        >
            <TextInput {...inputProps} />
            <button
                onClick={() => {
                    onAddClick(inputProps.value);
                    inputProps.setValue('');
                }}
            >
                Add
            </button>
        </ListItem>
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
            onRemoveClick={onRemoveClick}
        >
            <Selector inputProps={inputProps} items={selectorItems} />
            <button
                onClick={() => {
                    onAddClick(inputProps.value);
                    inputProps.setValue('');
                }}
            >
                Add
            </button>
        </ListItem>
    );
};
