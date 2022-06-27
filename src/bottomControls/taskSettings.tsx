import React from 'react';
import { Action, Actions, Components, Task, Tutorial } from '../tutorial/types';
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
    removeSelectedTask: () => void;
};

const TaskSettings: React.FC<TaskSettingsProps> = ({
    selectedTask,
    selectedTutorial,
    updateSelectedTask,
    fullscreen,
    setFullscreen,
    selectedFilePath,
    setSelectedFilePath,
    removeSelectedTask,
}) => {
    const index =
        selectedTutorial !== null && selectedTask !== null
            ? selectedTutorial.tasks.indexOf(selectedTask) + 1
            : -1;

    const handleUpdateAction = React.useCallback(
        (value: string) => {
            if (selectedTask === null || value === '') return;
            const newAction = (Actions as any)[value];
            if (!newAction) return;
            selectedTask.action = newAction as Action;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleAddListArgument = React.useCallback(
        (
            fieldName: string,
            value: string,
            isActionArgument: boolean = true
        ) => {
            if (selectedTask === null || value.trim() === '') return;
            const oldArray =
                (isActionArgument
                    ? selectedTask.actionArguments[fieldName]
                    : (selectedTask as any)[fieldName]) ?? [];
            const updatedArray = [...oldArray, value];
            if (isActionArgument) {
                selectedTask.actionArguments[fieldName] = updatedArray;
            } else {
                (selectedTask as any)[fieldName] = updatedArray;
            }

            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleRemoveListArgument = React.useCallback(
        (
            fieldName: string,
            index: number,
            isActionArgument: boolean = true
        ) => {
            if (selectedTask === null) return;
            (isActionArgument
                ? selectedTask.actionArguments[fieldName]
                : (selectedTask as any)[fieldName]
            ).splice(index, 1);
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleSaveListArgumentItem = React.useCallback(
        (argumentName: string, index: number, value: string) => {
            if (selectedTask === null || value === '') return;
            selectedTask.actionArguments[argumentName][index] = value;
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask]
    );

    const handleSaveTextArgument = React.useCallback(
        (
            fieldName: string,
            value: string,
            isActionArgument: boolean = true
        ) => {
            if (selectedTask === null) return;
            if (isActionArgument) {
                selectedTask.actionArguments[fieldName] = value;
            } else {
                (selectedTask as any)[fieldName] = value;
            }
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

    const actionInput = useSelectInput(handleUpdateAction);

    const handleFreeRangeChange = React.useCallback(
        (isFreeRange: boolean) => {
            if (selectedTask === null) return;
            selectedTask.freeRange = isFreeRange;
            if (isFreeRange) {
                selectedTask.action = Actions.null;
                actionInput.setValue('null');
            }
            updateSelectedTask(selectedTask);
        },
        [selectedTask, updateSelectedTask, actionInput]
    );

    const instructionInput = useTextInput(
        'Instructions for the task',
        (value) => handleSaveTextArgument('instruction', value, false)
    );
    const infoInput = useTextInput('Extra info for the task', (value) =>
        handleSaveTextArgument('info', value, false)
    );
    const componentInput = useSelectInput();
    const assertClosedInput = useSelectInput();
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
                <button
                    onClick={() => {
                        if (window.confirm('Remove this task?'))
                            removeSelectedTask();
                    }}
                >
                    Remove Task
                </button>
            </div>
            <details open>
                <summary>Base Settings</summary>
                <TextAreaItem
                    title="Instruction"
                    inputProps={instructionInput}
                />
                <TextAreaItem title="Info" inputProps={infoInput} />
                <SelectorListItem
                    title="Highlighted components"
                    info=""
                    key="highlighted"
                    inputProps={componentInput}
                    onAddClick={(value) =>
                        handleAddListArgument('component', value, false)
                    }
                    onRemoveClick={(index) =>
                        handleRemoveListArgument('component', index, false)
                    }
                    listItems={selectedTask?.component.map((component) =>
                        component.toString()
                    )}
                    selectorItems={
                        new Map(
                            Components.map((component) => [
                                component,
                                component,
                            ])
                        )
                    }
                />
                <SelectorListItem
                    title="Assert closed"
                    info="This field can be used to make sure that a component is closed before the beginning of a Task"
                    key="assertClosed"
                    inputProps={assertClosedInput}
                    onAddClick={(value) =>
                        handleAddListArgument('assertClosed', value, false)
                    }
                    onRemoveClick={(index) =>
                        handleRemoveListArgument('assertClosed', index, false)
                    }
                    listItems={selectedTask?.assertClosed.map((component) =>
                        component.toString()
                    )}
                    selectorItems={
                        new Map(
                            Components.map((component) => [
                                component,
                                component,
                            ])
                        )
                    }
                />
                <hr style={{ width: '100%' }} />
            </details>
            <details open>
                <summary>Action Settings</summary>
                <BooleanItem
                    key={`${index}-freerange`}
                    title="Free range"
                    info="By setting this to true, this Task will not have listeners registered and instead, there will be a button available that the students will click to signal that they are done with the described Task."
                    inputProps={freeRangeInput}
                />
                <SelectorItem
                    title="Action"
                    inputProps={actionInput}
                    onSubmit={() => {}}
                    items={
                        new Map(
                            Object.values(Actions).map((action) => [
                                action.command,
                                `${action.command}: ${action.description}`,
                            ])
                        )
                    }
                    hasSaveButton={false}
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
                            handleSaveListArgumentItem={
                                handleSaveListArgumentItem
                            }
                            handleSaveTextArgument={handleSaveTextArgument}
                            handleChangeBooleanArgument={
                                handleChangeBooleanArgument
                            }
                            selectedFilePath={selectedFilePath}
                            setSelectedFilePath={setSelectedFilePath}
                        />
                    )
                )}
            </details>
        </div>
    );
};

export default TaskSettings;
