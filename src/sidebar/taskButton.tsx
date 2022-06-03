import React from 'react';
import { Control } from '../bottomControls/bottomControls';
import { Task, Tutorial } from '../tutorial/types';
import "./sidebar.css";

type TaskButtonProps = {
    selectedTutorial: Tutorial | null;
    task: Task;
    setSelectedTask: (task: Task | null) => void;
    setSelectedControl: (control: Control) => void;
}

const TaskButton: React.FC<TaskButtonProps> = ({ selectedTutorial, task, setSelectedTask, setSelectedControl }) => {
    return (<>
        {selectedTutorial &&
            <div className="task sidebar-item rounded-item" onClick={() => { setSelectedTask(task); setSelectedControl(Control.TaskSettings) }}>
                <div className='task-index'>{selectedTutorial.tasks.indexOf(task) + 1}</div>
                <div>{task.instruction}</div>
            </div>
        }</>
    );
}

export default TaskButton;