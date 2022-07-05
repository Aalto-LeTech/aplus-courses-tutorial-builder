import React from 'react';
import { BooleanInputProps } from './itemUtils';

type BooleanItemProps = {
    title: string;
    info: string;
    inputProps: BooleanInputProps;
};

const BooleanItem: React.FC<BooleanItemProps> = ({
    title,
    info,
    inputProps,
}) => {
    return (
        <div key={inputProps.uuid} className="bottom-item">
            <label htmlFor={inputProps.uuid}>
                <h2>{title}</h2>
                <div>{info}</div>
            </label>
            <label className="toggler-wrapper center">
                <input
                    type="checkbox"
                    checked={inputProps.value}
                    onChange={inputProps.onChange}
                    id={inputProps.uuid}
                />
                <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                </div>
            </label>
        </div>
    );
};

export default BooleanItem;
