import React from 'react';
import { TextInputProps } from './itemUtils';

type SelectorProps = {
    inputProps: TextInputProps<HTMLSelectElement>;
    items: Map<string, string>;
};

const Selector: React.FC<SelectorProps> = ({ inputProps, items }) => {
    return (
        <select
            onChange={inputProps.onChange}
            placeholder={inputProps.placeholder}
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
