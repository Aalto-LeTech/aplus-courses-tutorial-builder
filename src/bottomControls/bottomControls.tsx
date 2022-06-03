import React from 'react';
import { Task, Tutorial } from '../tutorial/types';
import "./bottomControls.css";
import EmptyControl from './emptyControl';
import TaskSettings from './taskSettings';
import TutorialSettings from './tutorialSettings';

export enum Control {
    Empty,
    TutorialSettings,
    TaskSettings
}

type BottomControlsProps = {
    selectedControl: Control;
    selectedTutorial: Tutorial | null;
    updateSelectedTutorial: (updatedTutorial: Tutorial) => void;
    updateSelectedTask: (updatedTasks: Task) => void;
    selectedTask: Task | null;
}

const BottomControls: React.FC<BottomControlsProps> = ({ selectedControl, selectedTutorial, updateSelectedTutorial, updateSelectedTask, selectedTask }) => {
    return (
        <div className="rounded-item" id="bottom-controls">
            {selectedControl === Control.TaskSettings ? <TaskSettings selectedTask={selectedTask} selectedTutorial={selectedTutorial} updateSelectedTask={updateSelectedTask} />
                : selectedControl === Control.TutorialSettings ? <TutorialSettings selectedTutorial={selectedTutorial} updateSelectedTutorial={updateSelectedTutorial} />
                    : <EmptyControl />}
        </div>
    );
}

export default BottomControls;