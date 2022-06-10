import React from 'react';
import './App.css';
import IntelliJ from './intellij/intellij';
import Sidebar from './sidebar/sidebar';
import BottomControls, { Control } from './bottomControls/bottomControls';
import Export from './export/export';
import { Task, Tutorial } from './tutorial/types';
import { getTutorialsFromJson, tutorialsToJson } from './tutorial/importExport';
import { useInterval } from 'usehooks-ts';

function App() {
    const [exportVisible, setExportVisible] = React.useState(false);
    const [tutorials, setTutorials] = React.useState<Tutorial[]>([]);
    const [selectedTutorial, setSelectedTutorial] =
        React.useState<Tutorial | null>(null);
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
    const [selectedControl, setSelectedControl] = React.useState<Control>(
        Control.Empty
    );
    const [selectedFilePath, setSelectedFilePath] = React.useState<string>('');
    const [highlightedComponents, setHighlightedComponents] = React.useState<
        string[]
    >([]);
    const [autoSavedTime, setAutoSavedTime] = React.useState<Date | null>(null);

    React.useEffect(() => {
        const tutorialJson = window.localStorage.getItem('tutorialJson');
        if (
            tutorialJson !== null &&
            Object.keys(JSON.parse(tutorialJson).tutorials).length > 0 &&
            tutorials.length === 0 &&
            window.confirm('Open auto-saved tutorials?')
        ) {
            setTutorials(getTutorialsFromJson(tutorialJson));
        }
    }, []);

    useInterval(() => {
        if (tutorials.length > 0) {
            window.localStorage.setItem(
                'tutorialJson',
                tutorialsToJson(tutorials, false)
            );
            setAutoSavedTime(new Date());
        }
    }, 60000);

    React.useEffect(() => {
        if (!selectedTask || !selectedTutorial) return;
        if (!selectedTutorial.tasks.includes(selectedTask))
            setSelectedControl(Control.TutorialSettings);
    }, [selectedTutorial, selectedTask, setSelectedControl]);

    React.useEffect(() => {
        if (!selectedTask) {
            setHighlightedComponents([]);
            return;
        }
        setHighlightedComponents(selectedTask.component);
    }, [selectedTutorial, selectedTask, setHighlightedComponents]);

    React.useEffect(() => {
        if (selectedControl === Control.TutorialSettings) {
            setSelectedTask(null);
        }
    }, [selectedControl, setSelectedTask]);

    const updateSelectedTutorial = React.useCallback(
        (updatedTutorial: Tutorial) => {
            if (!selectedTutorial) return;
            const updatedTutorials = [...tutorials];
            updatedTutorials[tutorials.indexOf(selectedTutorial)] =
                updatedTutorial;
            setTutorials(updatedTutorials);
            setSelectedTutorial(updatedTutorial);
        },
        [tutorials, selectedTutorial]
    );

    const updateSelectedTask = React.useCallback(
        (updatedTask: Task) => {
            if (!selectedTutorial || !selectedTask) return;
            const updatedTasks = [...selectedTutorial.tasks];
            updatedTasks[selectedTutorial.tasks.indexOf(selectedTask)] =
                updatedTask;
            const updatedTutorial = { ...selectedTutorial };
            updatedTutorial.tasks = updatedTasks;
            setSelectedTask(updatedTask);
            updateSelectedTutorial(updatedTutorial);
        },
        [selectedTutorial, selectedTask, updateSelectedTutorial]
    );

    return (
        <div id="container">
            <Export
                tutorials={tutorials}
                visible={exportVisible}
                setVisible={setExportVisible}
            />
            <Sidebar
                setExportVisible={setExportVisible}
                tutorials={tutorials}
                setTutorials={setTutorials}
                selectedTutorial={selectedTutorial}
                setSelectedTutorial={setSelectedTutorial}
                updateSelectedTutorial={updateSelectedTutorial}
                setSelectedTask={setSelectedTask}
                setSelectedControl={setSelectedControl}
            />
            <IntelliJ
                selectedTask={selectedTask}
                selectedTutorial={selectedTutorial}
                selectedFilePath={selectedFilePath}
                setSelectedFilePath={setSelectedFilePath}
                highlightedComponents={highlightedComponents}
                autoSavedTime={autoSavedTime}
            />
            <BottomControls
                selectedControl={selectedControl}
                selectedTask={selectedTask}
                selectedTutorial={selectedTutorial}
                updateSelectedTutorial={updateSelectedTutorial}
                updateSelectedTask={updateSelectedTask}
                selectedFilePath={selectedFilePath}
                setSelectedFilePath={setSelectedFilePath}
            />
        </div>
    );
}

export default App;
