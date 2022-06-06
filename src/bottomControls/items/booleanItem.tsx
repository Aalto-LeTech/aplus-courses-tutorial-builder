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
        <div className="bottom-item">
            <label>
                <h2>{title}</h2>
            </label>
            <div>{info}</div>
            <label className="toggler-wrapper center">
                <input
                    type="checkbox"
                    checked={inputProps.value}
                    onChange={inputProps.onChange}
                />
                <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                </div>
            </label>
        </div>
    );
};

export default BooleanItem;
