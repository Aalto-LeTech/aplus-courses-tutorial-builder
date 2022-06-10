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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    inputProps.onSubmit();
                    inputProps.setUnsavedChanges(false);
                }}
                className="list-item"
            >
                <TextInput {...inputProps} />
                <button type="submit">Save</button>
            </form>
            {children ?? <></>}
        </BottomItemBase>
    );
};

export default SingleLineItem;
