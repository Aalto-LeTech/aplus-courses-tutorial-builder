import React from 'react';
import { ArgumentInfo, ArgumentType } from '../../tutorial/actionArguments';
import { Task } from '../../tutorial/types';
import BooleanItem from './booleanItem';
import { useBooleanInput, useTextInput } from './itemUtils';
import { TextInputListItem } from './listItem';
import SingleLineItem from './singleLineItem';

type ActionArgumentItemProps = {
    selectedTask: Task | null;
    argumentName: string;
    argumentInfo: ArgumentInfo;
    handleAddListArgument: (argumentName: string, value: string) => void;
    handleRemoveListArgument: (argumentName: string, index: number) => void;
    handleSaveTextArgument: (argumentName: string, value: string) => void;
    handleChangeBooleanArgument: (
        argumentName: string,
        isFreeRange: boolean
    ) => void;
};

const ActionArgumentItem: React.FC<ActionArgumentItemProps> = ({
    selectedTask,
    argumentName,
    argumentInfo,
    handleAddListArgument,
    handleRemoveListArgument,
    handleSaveTextArgument,
    handleChangeBooleanArgument,
}) => {
    let args = selectedTask?.actionArguments[argumentName];
    if (args === undefined) {
        switch (argumentInfo.type) {
            case ArgumentType.String:
                args = '';
                break;
            case ArgumentType.StringArray:
                args = [];
                break;
            case ArgumentType.Boolean:
                args = true;
                break;
        }
    }
    const textInputProps = useTextInput(
        argumentInfo.type === ArgumentType.StringArray ? '' : args,
        argumentInfo.type === ArgumentType.StringArray
            ? 'New argument'
            : 'Argument'
    );
    const booleanInputProps = useBooleanInput(false, (checked) => {
        handleChangeBooleanArgument(argumentName, checked);
    });
    if (!selectedTask) return <></>;
    switch (argumentInfo.type) {
        case ArgumentType.String:
            return (
                <SingleLineItem
                    title={argumentName}
                    info={argumentInfo.info}
                    inputProps={textInputProps}
                    onSubmit={(value) =>
                        handleSaveTextArgument(argumentName, value)
                    }
                />
            );

        case ArgumentType.StringArray:
            return (
                <TextInputListItem
                    title={argumentName}
                    info={argumentInfo.info}
                    listItems={args}
                    inputProps={textInputProps}
                    onAddClick={(value) =>
                        handleAddListArgument(argumentName, value)
                    }
                    onRemoveClick={(index) =>
                        handleRemoveListArgument(argumentName, index)
                    }
                />
            );
        case ArgumentType.Boolean:
            return (
                <BooleanItem
                    title={argumentName}
                    info={argumentInfo.info}
                    inputProps={booleanInputProps}
                />
            );
    }
};

export default ActionArgumentItem;
