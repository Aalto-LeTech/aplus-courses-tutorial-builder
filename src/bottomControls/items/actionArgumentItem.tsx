import React from 'react';
import { FieldInfo, FieldType } from '../../tutorial/actionArguments';
import { Task } from '../../tutorial/types';
import { useTextInput } from './itemUtils';
import { TextInputListItem } from './listItem';
import SingleLineItem from './singleLineItem';

type ActionArgumentItemProps = {
    selectedTask: Task | null;
    fieldName: string;
    fieldInfo: FieldInfo;
}

const ActionArgumentItem: React.FC<ActionArgumentItemProps> = ({ selectedTask, fieldName, fieldInfo }) => {
    let args = selectedTask?.actionArguments[fieldName];
    if (args === undefined) {
        switch (fieldInfo.type) {
            case FieldType.String:
                args = "";
                break;
            case FieldType.StringArray:
                args = [];
                break;
            case FieldType.Boolean:
                args = true;
                break;
        }
    }
    const inputProps = useTextInput(
        fieldInfo.type === FieldType.StringArray ? "" : args,
        fieldInfo.type === FieldType.StringArray ? "New argument" : "Argument"
    )
    if (!selectedTask) return <></>;
    switch (fieldInfo.type) {
        case FieldType.String:
            return <SingleLineItem title={fieldName} info={fieldInfo.info} inputProps={inputProps} onSubmit={() => { }} />

        case FieldType.StringArray:
            return <TextInputListItem title={fieldName} info={fieldInfo.info} listItems={args} inputProps={inputProps} onAddClick={() => { }} onRemoveClick={() => { }} />
        case FieldType.Boolean:
            break;
    }
    return <div>{fieldName} {selectedTask.actionArguments[fieldName]}</div>
}

export default ActionArgumentItem;