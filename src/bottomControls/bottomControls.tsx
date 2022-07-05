import React from 'react';
import { useState } from 'react';
import { Task, Tutorial } from '../tutorial/types';
import './bottomControls.css';
import EmptyControl from './emptyControl';
import TaskSettings from './taskSettings';
import TutorialSettings from './tutorialSettings';

export enum Control {
    Empty,
    TutorialSettings,
    TaskSettings,
}

type BottomControlsProps = {
    selectedControl: Control;
    selectedTutorial: Tutorial | null;
    updateSelectedTutorial: (updatedTutorial: Tutorial) => void;
    updateSelectedTask: (updatedTasks: Task) => void;
    selectedTask: Task | null;
    selectedFilePath: string;
    setSelectedFilePath: (path: string) => void;
    checkFilePath: {
        path: string;
        valid: boolean;
    };
    setCheckFilePath: React.Dispatch<
        React.SetStateAction<{
            path: string;
            valid: boolean;
        }>
    >;
    removeSelectedTask: () => void;
    removeSelectedTutorial: () => void;
};

const BottomControls: React.FC<BottomControlsProps> = ({
    selectedControl,
    selectedTutorial,
    updateSelectedTutorial,
    updateSelectedTask,
    selectedTask,
    selectedFilePath,
    setSelectedFilePath,
    checkFilePath,
    setCheckFilePath,
    removeSelectedTask,
    removeSelectedTutorial,
}) => {
    const [fullscreen, setFullscreen] = useState(false);
    return (
        <>
            {fullscreen && (
                <div
                    id="bottom-controls-fullscreen-background"
                    onClick={() => setFullscreen(false)}
                ></div>
            )}
            <div
                className={`rounded-item ${
                    selectedControl === Control.Empty ? 'welcome' : ''
                } ${fullscreen ? 'fullscreen' : ''}`}
                id="bottom-controls"
            >
                {selectedControl === Control.TaskSettings ? (
                    <TaskSettings
                        selectedTask={selectedTask}
                        selectedTutorial={selectedTutorial}
                        updateSelectedTask={updateSelectedTask}
                        fullscreen={fullscreen}
                        setFullscreen={setFullscreen}
                        selectedFilePath={selectedFilePath}
                        setSelectedFilePath={setSelectedFilePath}
                        checkFilePath={checkFilePath}
                        setCheckFilePath={setCheckFilePath}
                        removeSelectedTask={removeSelectedTask}
                    />
                ) : selectedControl === Control.TutorialSettings ? (
                    <TutorialSettings
                        selectedTutorial={selectedTutorial}
                        updateSelectedTutorial={updateSelectedTutorial}
                        removeSelectedTutorial={removeSelectedTutorial}
                    />
                ) : (
                    <EmptyControl />
                )}
            </div>
        </>
    );
};

export default BottomControls;
