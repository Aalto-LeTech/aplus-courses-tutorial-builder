import React from 'react';
import { Control } from '../bottomControls/bottomControls';
import { Task, Tutorial } from '../tutorial/types';
import './sidebar.css';

type TaskButtonProps = {
    selectedTutorial: Tutorial | null;
    selectedTask: Task | null;
    task: Task;
    setSelectedTask: (task: Task | null) => void;
    setSelectedControl: (control: Control) => void;
    updateSelectedTutorial: (updatedTutorial: Tutorial) => void;
};

const TaskButton: React.FC<TaskButtonProps> = ({
    selectedTutorial,
    selectedTask,
    task,
    setSelectedTask,
    setSelectedControl,
    updateSelectedTutorial,
}) => {
    const index = selectedTutorial?.tasks.indexOf(task) ?? -1;
    const changeTaskIndex = React.useCallback(
        (up: boolean) => {
            if (selectedTutorial === null) return;
            const newIndex = up
                ? Math.min(selectedTutorial.tasks.length - 1, index + 1)
                : Math.max(0, index - 1);
            const oldTask = selectedTutorial.tasks[newIndex];
            selectedTutorial.tasks[newIndex] = task;
            selectedTutorial.tasks[index] = oldTask;
            updateSelectedTutorial(selectedTutorial);
        },
        [index, selectedTutorial, task, updateSelectedTutorial]
    );
    return (
        <>
            {selectedTutorial && (
                <div
                    className="task sidebar-item rounded-item"
                    onClick={() => {
                        setSelectedTask(task);
                        setSelectedControl(Control.TaskSettings);
                    }}
                >
                    <div
                        className={`task-index ${
                            selectedTask === task ? 'task-index-selected' : ''
                        }`}
                    >
                        {selectedTutorial.tasks.indexOf(task) + 1}
                        <div style={{ flexGrow: 1 }}></div>
                        <button
                            className="move-task"
                            onClick={() => changeTaskIndex(false)}
                        >
                            {'<'}
                        </button>
                        <button
                            className="move-task"
                            onClick={() => changeTaskIndex(true)}
                        >
                            {'>'}
                        </button>
                    </div>
                    <div
                        style={{ hyphens: 'auto', overflowWrap: 'break-word' }}
                    >
                        <p>
                            <b>{task.instruction}</b>
                            {task.instruction.trim() === '' && (
                                <em style={{ opacity: 0.7 }}>
                                    Task with no instruction
                                </em>
                            )}
                        </p>
                        <p>{task.info}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskButton;
