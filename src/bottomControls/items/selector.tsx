import { useGranularEffect } from 'granular-hooks';
import React from 'react';
import { SelectInputProps } from './itemUtils';

type SelectorProps = {
    inputProps: SelectInputProps;
    items: Map<string, string>;
};

const Selector: React.FC<SelectorProps> = ({ inputProps, items }) => {
    useGranularEffect(
        () => {
            inputProps.setValue([...items.keys()][0]);
        },
        [],
        [inputProps, items]
    );
    return (
        <select
            id={inputProps.uuid}
            onChange={inputProps.onChange}
            value={inputProps.value}
        >
            {Array.from(items.entries()).map(([value, text]) => (
                <option key={value} value={value}>
                    {text}
                </option>
            ))}
        </select>
    );
};

export default Selector;
