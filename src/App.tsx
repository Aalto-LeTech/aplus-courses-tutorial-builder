import React from 'react';
import './App.css';
import IntelliJ from './intellij/intellij';
import Sidebar from './sidebar/sidebar';
import BottomControls, { Control } from './bottomControls/bottomControls';
import Export from './export/export';
import { Component, Task, Tutorial } from './tutorial/types';

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
        Component[]
    >([]);

    React.useEffect(() => {
        if (!selectedTask) {
            setHighlightedComponents([]);
            return;
        }
        setHighlightedComponents(selectedTask.component);
    }, [selectedTask, setHighlightedComponents]);

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
                setSelectedTask={setSelectedTask}
                setSelectedControl={setSelectedControl}
            />
            <IntelliJ
                selectedTask={selectedTask}
                selectedFilePath={selectedFilePath}
                setSelectedFilePath={setSelectedFilePath}
                highlightedComponents={highlightedComponents}
            />
            <BottomControls
                selectedControl={selectedControl}
                selectedTask={selectedTask}
                selectedTutorial={selectedTutorial}
                updateSelectedTutorial={updateSelectedTutorial}
                updateSelectedTask={updateSelectedTask}
            />
        </div>
    );
}

export default App;
