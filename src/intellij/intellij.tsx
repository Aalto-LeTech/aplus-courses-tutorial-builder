import React from 'react';
import './intellij.css';
import ProjectTree from './projectTree';
import Editor from './editor';
import { Task, Tutorial } from '../tutorial/types';
import { useGranularEffect } from 'granular-hooks';
import BottomToolwindowC from './bottomToolwindow';
import {
    BottomToolWindowButton,
    LeftToolWindowButton,
    RightToolWindowButton,
} from './toolwindowButton';

type IntelliJProps = {
    selectedTask: Task | null;
    selectedTutorial: Tutorial | null;
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
    highlightedComponents: string[];
    autoSavedTime: Date | null;
};
export const versionControlTW = 'git';
export const replTW = 'repl';
export const terminalTW = 'terminal';
export const projectTW = 'project';
export const informationTW = 'information';
export const buildTW = 'build';

export type BottomToolWindow =
    | typeof versionControlTW
    | typeof replTW
    | typeof terminalTW
    | typeof buildTW;

const BottomToolWindows = [versionControlTW, replTW, terminalTW, buildTW];

const isBottomToolWindow = (tw: string): tw is BottomToolWindow => {
    return tw !== undefined && BottomToolWindows.includes(tw);
};

export type LeftToolWindow = typeof projectTW;

const LeftToolWindows = [projectTW];

const isLeftToolWindow = (tw: string): tw is LeftToolWindow => {
    return tw !== undefined && LeftToolWindows.includes(tw);
};

export type RightToolWindow = typeof informationTW;

const RightToolWindows = [informationTW];

const isRightToolWindow = (tw: string): tw is RightToolWindow => {
    return tw !== undefined && RightToolWindows.includes(tw);
};

export type ToolWindow = BottomToolWindow | LeftToolWindow | RightToolWindow;

const IntelliJ: React.FC<IntelliJProps> = ({
    selectedTask,
    selectedTutorial,
    selectedFilePath,
    setSelectedFilePath,
    checkFilePath,
    setCheckFilePath,
    highlightedComponents,
    autoSavedTime,
}) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [files, setFiles] = React.useState<Map<string, File>>(new Map());
    const [hideOverlay, setHideOverlay] = React.useState(false);

    const [selectedBottomToolwindow, setSelectedBottomToolwindow] =
        React.useState<null | BottomToolWindow>(null);
    const [selectedLeftToolwindow, setSelectedLeftToolwindow] =
        React.useState<null | LeftToolWindow>(projectTW);
    const [selectedRightToolwindow, setSelectedRightToolwindow] =
        React.useState<null | RightToolWindow>(informationTW);

    const setToolWindow = React.useCallback(
        (
            toolwindow: any,
            setToolWindow: React.Dispatch<React.SetStateAction<any>>
        ) => {
            setToolWindow((old: ToolWindow) =>
                old === toolwindow ? null : toolwindow
            );
        },
        []
    );

    const isOverlay = !hideOverlay && highlightedComponents.length > 0;
    const darkClass = isOverlay ? 'intellij-dark' : '';

    const overlay = React.useCallback(
        (component: string) => {
            return isOverlay && !highlightedComponents.includes(component)
                ? 'intellij-dark'
                : '';
        },
        [highlightedComponents, isOverlay]
    );

    const toolwindowProps = {
        setSelectedBottomToolwindow: setSelectedBottomToolwindow,
        setSelectedLeftToolwindow: setSelectedLeftToolwindow,
        setSelectedRightToolwindow: setSelectedRightToolwindow,
        selectedBottomToolwindow: selectedBottomToolwindow,
        selectedLeftToolwindow: selectedLeftToolwindow,
        selectedRightToolwindow: selectedRightToolwindow,
        setToolWindow: setToolWindow,
    };

    useGranularEffect(
        () => {
            console.log('checking ' + checkFilePath.path);
            for (const file of files) {
                if (file[0] === checkFilePath.path) {
                    const newCheckFilePath = { path: file[0], valid: true };
                    setCheckFilePath(newCheckFilePath);
                    console.log('found ' + file[0]);
                    return;
                }
            }
            if (checkFilePath.valid) {
                const newCheckFilePath = {
                    path: checkFilePath.path,
                    valid: false,
                };

                setCheckFilePath(newCheckFilePath);
            }
        },
        [checkFilePath.path],
        [files, setCheckFilePath]
    );

    useGranularEffect(
        () => {
            if (
                selectedFile?.webkitRelativePath === selectedFilePath ||
                selectedFilePath.trim() === ''
            )
                return;

            for (const file of files) {
                if (file[0] === selectedFilePath.trim()) {
                    setSelectedFile(file[1]);
                    return;
                }
            }

            alert(`File ${selectedFilePath} not found`);
            setSelectedFilePath('');
        },
        [selectedFilePath],
        [selectedFile, files, setSelectedFile]
    );

    useGranularEffect(
        () => {
            if (
                selectedFile === null ||
                selectedFile.webkitRelativePath === selectedFilePath
            )
                return;

            setSelectedFilePath(selectedFile.webkitRelativePath);
        },
        [selectedFile],
        [selectedFilePath, setSelectedFilePath]
    );

    useGranularEffect(
        () => {
            if (selectedTask === null) return;
            for (const closed of selectedTask.assertClosed) {
                if (isBottomToolWindow(closed)) {
                    setSelectedBottomToolwindow(null);
                } else if (isLeftToolWindow(closed)) {
                    setSelectedLeftToolwindow(null);
                } else if (isRightToolWindow(closed)) {
                    setSelectedRightToolwindow(null);
                }
            }
            for (const opened of selectedTask.component) {
                if (isBottomToolWindow(opened)) {
                    setSelectedBottomToolwindow(opened);
                } else if (isLeftToolWindow(opened)) {
                    setSelectedLeftToolwindow(opened);
                } else if (isRightToolWindow(opened)) {
                    setSelectedRightToolwindow(opened);
                } else if (opened === 'editor') {
                    const filePath = selectedTask.actionArguments['filePath'];
                    if (typeof filePath === 'string') {
                        setSelectedFilePath(filePath);
                    }
                }
            }
        },
        [selectedTask],
        []
    );

    const selectedComponent = selectedTask?.component[0];

    const createPopup = React.useCallback(() => {
        if (selectedTask === null || selectedComponent === undefined) {
            return <></>;
        }
        let onTop = false;
        let inside = false;
        switch (selectedComponent) {
            case 'repl':
                onTop = true;
                break;
            case 'editor':
                inside = true;
                break;
        }
        return (
            <div
                id="intellij-popup"
                style={{
                    bottom: onTop ? 'calc(100% + 10px)' : 'initial',
                    left: inside ? 'initial' : onTop ? 0 : 'calc(100% + 10px)',
                    right: inside ? '10px' : 'initial',
                    top: inside ? '10px' : 'initial',
                }}
            >
                <h2>{selectedTask?.instruction}</h2>
                <p>{selectedTask?.info}</p>
            </div>
        );
    }, [selectedTask, selectedComponent]);

    return (
        <div
            className="rounded-item"
            id="intellij"
            style={{
                backgroundColor: isOverlay ? '#121314' : '#3c3f41',
                gridTemplateRows: `30px 24px minmax(0, 3fr) ${
                    selectedBottomToolwindow === null ? 0 : 'minmax(0, 1fr)'
                } 24px 24px`,
                gridTemplateColumns: `24px ${
                    selectedLeftToolwindow === null ? 0 : 'minmax(0, 1fr)'
                } minmax(0, 4fr) ${
                    selectedRightToolwindow === null ? 0 : 'minmax(0, 1fr)'
                } 24px`,
            }}
        >
            {highlightedComponents.length > 0 && (
                <button
                    id="intellij-hide-overlay"
                    onClick={() => setHideOverlay((oldHide) => !oldHide)}
                >
                    {hideOverlay ? 'Show Overlay' : 'Hide Overlay'}
                </button>
            )}
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-menu"
            >
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Navigate</span>
                <span>Code</span>
                <span>Refactor</span>
                <span>Build</span>
                <span>Run</span>
                <span>Tools</span>
                <span>VCS</span>
                <span>Window</span>
                <span>Help</span>
                <span>A+</span>
            </div>
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-toolbar"
            >
                <span>A+ Courses Tutorial Builder</span>
            </div>
            <div className={darkClass} id="intellij-left-edge">
                <LeftToolWindowButton
                    toolwindow={projectTW}
                    {...toolwindowProps}
                />
            </div>
            <div
                id="intellij-toolwindow-left-container"
                className={overlay('projectTree')}
            >
                {selectedComponent === 'projectTree' && createPopup()}
                <div id="intellij-toolwindow-left">
                    <ProjectTree
                        setSelectedFile={setSelectedFile}
                        setFiles={setFiles}
                    />
                </div>
            </div>
            <div id="intellij-editor-container" className={overlay('editor')}>
                {selectedComponent === 'editor' && createPopup()}
                <div id="intellij-editor">
                    <Editor file={selectedFile} />
                </div>
            </div>
            {selectedRightToolwindow === informationTW && (
                <div className={darkClass} id="intellij-toolwindow-right">
                    <p>
                        You can open files with the project tree. Click the
                        button on the bottom of the tree to load modules.
                    </p>
                    <p>
                        Import tutorials with the Import Tutorials button. The
                        tutorial JSON has to have a "tutorials" field.
                    </p>
                </div>
            )}
            <div className={darkClass} id="intellij-right-edge">
                <RightToolWindowButton
                    toolwindow={informationTW}
                    {...toolwindowProps}
                />
            </div>
            <BottomToolwindowC
                highlightedComponents={highlightedComponents}
                selectedBottomToolwindow={selectedBottomToolwindow}
                isOverlay={isOverlay}
                overlay={overlay}
                createPopup={createPopup}
                selectedComponent={selectedComponent}
                selectedTask={selectedTask}
            />
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-toolbar-bottom"
            >
                <BottomToolWindowButton
                    toolwindow={versionControlTW}
                    {...toolwindowProps}
                />
                <BottomToolWindowButton
                    toolwindow={replTW}
                    {...toolwindowProps}
                />
                <BottomToolWindowButton
                    toolwindow={terminalTW}
                    {...toolwindowProps}
                />
                <BottomToolWindowButton
                    toolwindow={buildTW}
                    {...toolwindowProps}
                />
            </div>
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-bottom-edge"
            >
                {autoSavedTime === null
                    ? 'Changes will be auto-saved every minute'
                    : `Saved changes to local storage at ${autoSavedTime.toLocaleString()}`}
            </div>
        </div>
    );
};

export default IntelliJ;
