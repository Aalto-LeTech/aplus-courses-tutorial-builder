import React from 'react';
import { Actions, Components, Task, Tutorial } from '../tutorial/types';
import {
    useBooleanInput,
    useSelectInput,
    useTextInput,
} from './items/itemUtils';
import { SelectorListItem } from './items/listItem';
import TextAreaItem from './items/textAreaItem';
import { useGranularEffect } from 'granular-hooks';
import SelectorItem from './items/selectorItem';
import ActionArgumentItem from './items/actionArgumentItem';
import BooleanItem from './items/booleanItem';

type TaskSettingsProps = {
    selectedTask: Task | null;
    selectedTutorial: Tutorial | null;
    updateSelectedTask: (updatedTasks: Task) => void;
    fullscreen: boolean;
    setFullscreen: (fullscreen: boolean) => void;
    selectedFilePath: string;
    setSelectedFilePath: (path: string) => void;
};

const TaskSettings: React.FC<TaskSettingsProps> = ({
    selectedTask,
    selectedTutorial,
    updateSelectedTask,
    fullscreen,
    setFullscreen,
    selectedFilePath,
    setSelectedFilePath,
}) => {
    const instructionInput = useTextInput('Instructions for the task');
    const infoInput = useTextInput('Extra info for the task');
    const componentInput = useSelectInput();
    const actionInput = useTextInput('Action');

    const index =
        selectedTutorial !== null && selectedTask !== null
            ? selectedTutorial.tasks.indexOf(selectedTask) + 1
            : -1;

    const handleUpdateAction = React.useCallback(() => {
        if (selectedTask === null || actionInput.value === '') return;
        const newAction = Actions.get(actionInput.value);
        if (!newAction) return;
        selectedTask.action = newAction;
        updateSelectedTask(selectedTask);
    }, [selectedTask, actionInput, updateSelectedTask]);

    const handleInstructionSubmit = React.useCallback(() => {
        if (selectedTask === null || instructionInput.value === '') return;
        selectedTask.instruction = instructionInput.value;
        updateSelectedTask(selectedTask);
    }, [selectedTask, instructionInput, updateSelectedTask]);

    const handleInfoSubmit = React.useCallback(() => {
        if (selectedTask === null || infoInput.value === '') return;
        selectedTask.info = infoInput.value;
        updateSelectedTask(selectedTask);
    }, [selectedTask, updateSelectedTask, infoInput]);

    const handleAddComponent = React.useCallback(
        (value: string) => {
            if (selectedTask === null || value.trim() === '') return;
            selectedTask.component = Array.from(
                new Set([...selectedTask.component, value.trim()])
            );
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleRemoveComponent = React.useCallback(
        (index: number) => {
            if (selectedTask === null || componentInput.value === '') return;
            selectedTask.component.splice(index, 1);
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask, componentInput]
    );

    const handleAddListArgument = React.useCallback(
        (argumentName: string, value: string) => {
            if (selectedTask === null || value.trim() === '') return;
            selectedTask.actionArguments[argumentName] = [
                ...(selectedTask.actionArguments[argumentName] ?? []),
                value,
            ];
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleRemoveListArgument = React.useCallback(
        (argumentName: string, index: number) => {
            if (selectedTask === null || componentInput.value === '') return;
            selectedTask.actionArguments[argumentName].splice(index, 1);
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask, componentInput]
    );

    const handleSaveListArgumentItem = React.useCallback(
        (argumentName: string, index: number, value: string) => {
            if (selectedTask === null || componentInput.value === '') return;
            selectedTask.actionArguments[argumentName][index] = value;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask, componentInput]
    );

    const handleSaveTextArgument = React.useCallback(
        (argumentName: string, value: string) => {
            if (selectedTask === null) return;
            selectedTask.actionArguments[argumentName] = value;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleChangeBooleanArgument = React.useCallback(
        (argumentName: string, isFreeRange: boolean) => {
            if (selectedTask === null) return;
            selectedTask.actionArguments[argumentName] = isFreeRange;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleFreeRangeChange = React.useCallback(
        (isFreeRange: boolean) => {
            if (selectedTask === null) return;
            selectedTask.freeRange = isFreeRange;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const freeRangeInput = useBooleanInput(false, handleFreeRangeChange);

    useGranularEffect(
        () => {
            if (selectedTask === null) return;
            instructionInput.setValue(selectedTask.instruction);
            infoInput.setValue(selectedTask.info);
            actionInput.setValue(selectedTask.action.command);
            freeRangeInput.setValue(selectedTask.freeRange);
        },
        [selectedTask],
        [instructionInput, infoInput, actionInput, freeRangeInput]
    );

    if (!selectedTask) return <></>;

    return (
        <div
            className={`bottom-container ${fullscreen ? 'fullscreen' : ''}`}
            id="task-settings"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bottom-item bottom-item-title">
                <h1 id="task-settings-title">Task {index} settings</h1>
                <button onClick={() => setFullscreen(!fullscreen)}>
                    Toggle Fullscreen
                </button>
            </div>
            <TextAreaItem
                title="Instruction"
                inputProps={instructionInput}
                onSubmit={handleInstructionSubmit}
            />
            <TextAreaItem
                title="Info"
                inputProps={infoInput}
                onSubmit={handleInfoSubmit}
            />
            <SelectorListItem
                title="Highlighted components"
                info=""
                inputProps={componentInput}
                onAddClick={handleAddComponent}
                onRemoveClick={handleRemoveComponent}
                listItems={selectedTask?.component.map((component) =>
                    component.toString()
                )}
                selectorItems={
                    new Map(
                        Components.map((component) => [component, component])
                    )
                }
            />
            <BooleanItem
                key={`${index}-freerange`}
                title="Free range"
                info="By setting this to true, this Task will not have listeners registered and instead, there will be a button available that the students will click to signal that they are done with the described Task."
                inputProps={freeRangeInput}
            />
            <SelectorItem
                title="Action"
                inputProps={actionInput}
                onSubmit={handleUpdateAction}
                items={
                    new Map(
                        Array.from(Actions.values()).map((action) => [
                            action.command,
                            `${action.command}: ${action.description}`,
                        ])
                    )
                }
            />
            {Array.from(selectedTask.action.fields.entries()).map(
                ([fieldName, fieldInfo]) => (
                    <ActionArgumentItem
                        key={`${index}-${fieldName}`}
                        selectedTask={selectedTask}
                        argumentName={fieldName}
                        argumentInfo={fieldInfo}
                        handleAddListArgument={handleAddListArgument}
                        handleRemoveListArgument={handleRemoveListArgument}
                        handleSaveListArgumentItem={handleSaveListArgumentItem}
                        handleSaveTextArgument={handleSaveTextArgument}
                        handleChangeBooleanArgument={
                            handleChangeBooleanArgument
                        }
                        selectedFilePath={selectedFilePath}
                        setSelectedFilePath={setSelectedFilePath}
                    />
                )
            )}
        </div>
    );
};

export default TaskSettings;
