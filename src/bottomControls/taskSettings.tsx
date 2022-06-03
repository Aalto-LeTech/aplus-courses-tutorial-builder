import React from 'react';
import { Actions, Component, Task, Tutorial } from '../tutorial/types';
import { useTextInput } from './items/itemUtils';
import { SelectorListItem } from './items/listItem';
import TextAreaItem from './items/textAreaItem';
import { useGranularEffect } from "granular-hooks";
import SelectorItem from './items/selectorItem';
import ActionArgumentItem from './items/actionArgumentItem';

type TaskSettingsProps = {
    selectedTask: Task | null;
    selectedTutorial: Tutorial | null;
    updateSelectedTask: (updatedTasks: Task) => void;
}

const TaskSettings: React.FC<TaskSettingsProps> = ({
    selectedTask,
    selectedTutorial,
    updateSelectedTask
}) => {
    const instructionInput = useTextInput("", "Instructions for the task");
    const infoInput = useTextInput("", "Extra info for the task");
    const componentInput = useTextInput("", "Component");
    const actionInput = useTextInput("", "Action");

    const index = selectedTutorial !== null && selectedTask !== null ? selectedTutorial.tasks.indexOf(selectedTask) + 1 : -1;

    useGranularEffect(() => {
        if (selectedTask === null) return;
        instructionInput.setValue(selectedTask.instruction);
        infoInput.setValue(selectedTask.info);
        actionInput.setValue(selectedTask.action.command);
    }, [selectedTask], [instructionInput, infoInput, actionInput]);

    const handleUpdateAction = React.useCallback(() => {
        if (selectedTask === null || actionInput.value === "") return;
        const newAction = Actions.get(actionInput.value);
        if (!newAction) return;
        selectedTask.action = newAction;
        updateSelectedTask(selectedTask);
    }, [selectedTask, actionInput, updateSelectedTask]);

    const handleInstructionSubmit = React.useCallback(() => {
        if (selectedTask === null || instructionInput.value === "") return;
        selectedTask.instruction = instructionInput.value;
        updateSelectedTask(selectedTask);
    }, [selectedTask, instructionInput, updateSelectedTask]);

    const handleInfoSubmit = React.useCallback(() => {
        if (selectedTask === null || infoInput.value === "") return;
        selectedTask.info = infoInput.value;
        updateSelectedTask(selectedTask);
    }, [selectedTask, instructionInput, updateSelectedTask]);

    if (!selectedTask) return <></>;

    return (
        <div className="bottom-container" id="task-settings">
            <div className="bottom-item bottom-item-title">
                <h1 id="task-settings-title">Task {index} settings</h1>
            </div>
            <TextAreaItem title='Instruction' inputProps={instructionInput} onSubmit={handleInstructionSubmit} />
            <TextAreaItem title='Info' inputProps={infoInput} onSubmit={handleInfoSubmit} />
            <SelectorListItem
                title='Highlighted components'
                info=""
                inputProps={componentInput}
                onAddClick={() => { }}
                onRemoveClick={() => { }}
                listItems={selectedTask?.component.map(component => component.toString())}
                selectorItems={new Map(Object.values(Component).map((component) => [component, component]))}
            />
            <SelectorItem
                title='Action'
                inputProps={actionInput}
                onSubmit={handleUpdateAction}
                items={new Map(Array.from(Actions.values()).map((action) => [action.command, `${action.command}: ${action.description}`]))}
            />
            {Array.from(selectedTask.action.fields.entries()).map(([fieldName, fieldInfo]) => <ActionArgumentItem key={fieldName} selectedTask={selectedTask} fieldName={fieldName} fieldInfo={fieldInfo} />)}
        </div>
    );
}

export default TaskSettings;