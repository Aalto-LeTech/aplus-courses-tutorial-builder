import { useGranularEffect } from 'granular-hooks';
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
    handleSaveListArgumentItem: (
        argumentName: string,
        index: number,
        value: string
    ) => void;
    handleSaveTextArgument: (argumentName: string, value: string) => void;
    handleChangeBooleanArgument: (
        argumentName: string,
        isFreeRange: boolean
    ) => void;
    selectedFilePath: string;
    setSelectedFilePath: (path: string) => void;
};

const ActionArgumentItem: React.FC<ActionArgumentItemProps> = ({
    selectedTask,
    argumentName,
    argumentInfo,
    handleAddListArgument,
    handleRemoveListArgument,
    handleSaveListArgumentItem,
    handleSaveTextArgument,
    handleChangeBooleanArgument,
    selectedFilePath,
    setSelectedFilePath,
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
    const placeholder =
        argumentInfo.type === ArgumentType.StringArray
            ? 'New argument'
            : 'Argument';
    const onSubmit =
        argumentInfo.type === ArgumentType.StringArray
            ? (value: string) => handleAddListArgument(argumentName, value)
            : (value: string) => handleSaveTextArgument(argumentName, value);
    const textInputProps = useTextInput(placeholder, onSubmit);

    useGranularEffect(
        () => {
            if (argumentInfo.type === ArgumentType.String)
                textInputProps.setValue(args);
        },
        [],
        [textInputProps]
    );

    const booleanInputProps = useBooleanInput(false, (checked) => {
        handleChangeBooleanArgument(argumentName, checked);
    });

    const argumentSpecificAddition = () => {
        if (argumentName === 'filePath') {
            return (
                <div>
                    <button
                        onClick={() =>
                            setSelectedFilePath(textInputProps.value)
                        }
                    >
                        Open file in editor
                    </button>
                    <button
                        onClick={() => {
                            textInputProps.setValue(selectedFilePath);
                            handleSaveTextArgument(
                                argumentName,
                                selectedFilePath
                            );
                        }}
                    >
                        Set path from open file
                    </button>
                </div>
            );
        }

        if (argumentName === 'module') {
            return (
                <div>
                    <button
                        onClick={() => {
                            const module = selectedFilePath.split('/')[0];
                            textInputProps.setValue(module);
                            handleSaveTextArgument(argumentName, module);
                        }}
                    >
                        Set module from open file
                    </button>
                </div>
            );
        }

        return <></>;
    };

    if (!selectedTask) return <></>;
    switch (argumentInfo.type) {
        case ArgumentType.String:
            return (
                <SingleLineItem
                    title={argumentName}
                    info={argumentInfo.info}
                    inputProps={textInputProps}
                >
                    {argumentSpecificAddition()}
                </SingleLineItem>
            );

        case ArgumentType.StringArray:
            return (
                <TextInputListItem
                    title={argumentName}
                    info={argumentInfo.info}
                    listItems={args}
                    inputProps={textInputProps}
                    onRemoveClick={(index) =>
                        handleRemoveListArgument(argumentName, index)
                    }
                    onSaveClick={(index, value) =>
                        handleSaveListArgumentItem(argumentName, index, value)
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
