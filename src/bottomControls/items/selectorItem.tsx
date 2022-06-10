import React from 'react';
import { SelectInputProps } from './itemUtils';
import Selector from './selector';

type SelectorItemProps = {
    title: string;
    inputProps: SelectInputProps;
    items: Map<string, string>;
    onSubmit: () => void;
    hasSaveButton: boolean;
};

const SelectorItem: React.FC<SelectorItemProps> = ({
    title,
    inputProps,
    items,
    onSubmit,
    hasSaveButton,
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
            <Selector inputProps={inputProps} items={items} />
            {hasSaveButton && <button type="submit">Save</button>}
        </form>
    );
};

export default SelectorItem;
