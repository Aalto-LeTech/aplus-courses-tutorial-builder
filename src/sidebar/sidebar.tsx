import React from 'react';
import { Control } from '../bottomControls/bottomControls';
import { getTutorialsFromJson } from '../tutorial/importExport';
import { Actions, Task, Tutorial } from '../tutorial/types';
import './sidebar.css';
import TaskButton from './taskButton';

type SidebarProps = {
    setExportVisible: (visible: boolean) => void;
    tutorials: Tutorial[];
    setTutorials: React.Dispatch<React.SetStateAction<Tutorial[]>>;
    selectedTutorial: Tutorial | null;
    setSelectedTutorial: (tutorial: Tutorial | null) => void;
    updateSelectedTutorial: (updatedTutorial: Tutorial) => void;
    setSelectedTask: (task: Task | null) => void;
    setSelectedControl: (control: Control) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
    setExportVisible,
    tutorials,
    setTutorials,
    selectedTutorial,
    setSelectedTutorial,
    updateSelectedTutorial,
    setSelectedTask,
    setSelectedControl,
}) => {
    const [prevTutorialsLength, setPrevTutorialsLength] = React.useState(
        tutorials.length
    );

    const newTutorial = React.useCallback(() => {
        setTutorials((oldTutorials) => [
            ...oldTutorials,
            {
                name: `Tutorial ${oldTutorials.length + 1}`,
                moduleDependencies: [],
                tasks: [],
            },
        ]);
    }, [setTutorials]);

    const newTask = React.useCallback(() => {
        const action = Actions.get('openEditor');
        if (!selectedTutorial || !action) return;
        const newTask: Task = {
            action: action,
            actionArguments: {},
            assertClosed: [],
            component: [],
            freeRange: false,
            info: '',
            instruction: 'New task',
        };
        selectedTutorial.tasks.push(newTask);
        updateSelectedTutorial(selectedTutorial);
        setSelectedTask(newTask);
    }, [selectedTutorial, updateSelectedTutorial, setSelectedTask]);

    const handleTutorialImportChange: React.ChangeEventHandler<
        HTMLInputElement
    > = (e) => {
        let files = e.target.files;
        if (files === null || files.length !== 1) return;
        const file = files[0];
        importTutorialSteps(file);
    };

    const handleSelectedTutorialChange: React.ChangeEventHandler<
        HTMLSelectElement
    > = (e) => {
        if (e.target.value === '') {
            setSelectedTutorial(null);
        } else {
            setSelectedTutorial(tutorials[Number(e.target.value)]);
        }
    };

    const importTutorialSteps = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = String(e.target?.result);
            addTutorialsFromJson(text);
        };
        reader.readAsText(file);
    };

    const addTutorialsFromJson = (jsonString: string) => {
        setTutorials(getTutorialsFromJson(jsonString));
    };

    React.useEffect(() => {
        if (tutorials.length > 0 && prevTutorialsLength !== tutorials.length) {
            setSelectedTutorial(tutorials[tutorials.length - 1]);
            setSelectedControl(Control.TutorialSettings);
            setPrevTutorialsLength(tutorials.length);
        }
    }, [
        tutorials,
        setSelectedTutorial,
        setSelectedControl,
        prevTutorialsLength,
        setPrevTutorialsLength,
    ]);

    return (
        <div className="rounded-item" id="sidebar">
            <div id="sidebar-top">
                {tutorials.length > 0 && (
                    <div>
                        <label htmlFor="tutorial-select">Tutorial: </label>
                        <select
                            name="tutorial-select"
                            id="tutorial-select"
                            onChange={handleSelectedTutorialChange}
                            value={
                                selectedTutorial === null
                                    ? ''
                                    : tutorials.indexOf(selectedTutorial)
                            }
                        >
                            {Array.from(tutorials.entries()).map(
                                ([index, tutorial]) => (
                                    <option key={index} value={index}>
                                        {tutorial.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                )}
                <button onClick={() => newTutorial()}>New Tutorial</button>
            </div>
            {tutorials.length > 0 && selectedTutorial !== null && (
                <>
                    <div
                        className="sidebar-item rounded-item"
                        id="tutorial-settings-button"
                        onClick={() =>
                            setSelectedControl(Control.TutorialSettings)
                        }
                    >
                        Tutorial settings
                    </div>
                    <div id="tutorial-steps">
                        {selectedTutorial.tasks.map((task) => (
                            <TaskButton
                                key={selectedTutorial.tasks.indexOf(task) + 1}
                                task={task}
                                setSelectedTask={setSelectedTask}
                                selectedTutorial={selectedTutorial}
                                setSelectedControl={setSelectedControl}
                            />
                        ))}
                    </div>
                    <div
                        className="sidebar-item rounded-item"
                        id="new-task"
                        onClick={newTask}
                    >
                        + New task
                    </div>
                </>
            )}
            <div className="flex-grow"></div>
            <div id="sidebar-bottom">
                <div>
                    <label className="round-button" id="tutorial-import-label">
                        <input
                            className="file-input"
                            onChange={handleTutorialImportChange}
                            type="file"
                            id="tutorial-import"
                            name="tutorial-import"
                            accept=".json"
                        />
                        <span>Import Tutorials</span>
                    </label>
                </div>
                <button
                    id="export-button"
                    onClick={() => setExportVisible(true)}
                >
                    Export Tutorials
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
