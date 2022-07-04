import React from 'react';
import { SelectInputProps } from './itemUtils';
import Selector from './selector';

type SelectorItemProps = {
    title: string;
    inputProps: SelectInputProps;
    items: Map<string, string>;
    onSubmit: () => void;
};

const SelectorItem: React.FC<SelectorItemProps> = ({
    title,
    inputProps,
    items,
    onSubmit,
}) => {
    return (
        <div>
            <label>
                <h2>{title}</h2>
            </label>
            <Selector inputProps={inputProps} items={items} />
        </div>
    );
};

export default SelectorItem;
