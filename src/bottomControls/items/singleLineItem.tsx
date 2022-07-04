import React from 'react';
import BottomItemBase from './bottomItemBase';
import { TextInput, TextInputProps } from './itemUtils';

type SingleLineItemProps = {
    title: string;
    info: string;
    inputProps: TextInputProps<HTMLInputElement>;
    children?: JSX.Element;
};

const SingleLineItem: React.FC<SingleLineItemProps> = ({
    title,
    info,
    inputProps,
    children,
}) => {
    return (
        <BottomItemBase title={title} info={info} inputProps={inputProps}>
            <TextInput {...inputProps} />
            {children ?? <></>}
        </BottomItemBase>
    );
};

export default SingleLineItem;
