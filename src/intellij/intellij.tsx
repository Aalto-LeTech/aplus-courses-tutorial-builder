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
    highlightedComponents: string[];
    autoSavedTime: Date | null;
};
export const versionControlTW = 'git';
export const replTW = 'repl';
export const terminalTW = 'terminal';
export const projectTW = 'project';
export const informationTW = 'information';

export type BottomToolWindow =
    | typeof versionControlTW
    | typeof replTW
    | typeof terminalTW;

export type LeftToolWindow = typeof projectTW;

export type RightToolWindow = typeof informationTW;

export type ToolWindow = BottomToolWindow | LeftToolWindow | RightToolWindow;

const IntelliJ: React.FC<IntelliJProps> = ({
    selectedTask,
    selectedTutorial,
    selectedFilePath,
    setSelectedFilePath,
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

    const popup = React.useRef<HTMLDivElement>(null);
    const intellij = React.useRef<HTMLDivElement>(null);
    const projectTree = React.useRef<HTMLDivElement>(null);
    const editor = React.useRef<HTMLDivElement>(null);
    const repl = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const popupEl = popup.current;
        if (!isOverlay && popupEl) {
            popupEl.style.display = 'none';
            return;
        }
        const intellijEl = intellij.current;
        const projectTreeEl = projectTree.current;
        const editorEl = editor.current;
        const replEl = repl.current;
        if (
            !selectedTask ||
            !selectedTutorial ||
            !popupEl ||
            !intellijEl ||
            !projectTreeEl ||
            !editorEl ||
            !replEl
        )
            return;
        let highlightedEl: HTMLDivElement | undefined = undefined;
        let onTop = false;
        switch (selectedTask.component[0]) {
            case 'build':
                // TODO what is this
                break;
            case 'editor':
                highlightedEl = editorEl;
                break;
            case 'projectTree':
                highlightedEl = projectTreeEl;
                break;
            case 'repl':
                highlightedEl = replEl;
                onTop = true;
                break;
        }
        if (highlightedEl === undefined) {
            return;
        }
        const width = highlightedEl.getBoundingClientRect().width;
        const left = highlightedEl.getBoundingClientRect().left;
        const top = highlightedEl.getBoundingClientRect().top;
        const intellijLeft = intellijEl.getBoundingClientRect().left;
        const intellijTop = intellijEl.getBoundingClientRect().top;
        const popupHeight = popupEl.getBoundingClientRect().height;
        popupEl.style.display = 'flex';
        popupEl.style.transform = onTop
            ? `translate(${left - intellijLeft}px, ${
                  top - popupHeight - intellijTop - 20
              }px)`
            : `translate(${left + width - intellijLeft}px, ${
                  top - intellijTop
              }px)`;
    }, [selectedTutorial, selectedTask, isOverlay]);

    return (
        <div
            ref={intellij}
            className="rounded-item"
            id="intellij"
            style={{
                backgroundColor: isOverlay ? '#121314' : '#3c3f41',
                gridTemplateRows: `30px 24px 3fr ${
                    selectedBottomToolwindow === null ? 0 : '1fr'
                } 24px 24px`,
                gridTemplateColumns: `24px ${
                    selectedLeftToolwindow === null ? 0 : '1fr'
                } 4fr ${selectedRightToolwindow === null ? 0 : '1fr'} 24px`,
            }}
        >
            <div ref={popup} id="intellij-popup">
                <h2>{selectedTask?.instruction}</h2>
                <p>{selectedTask?.info}</p>
            </div>
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
                ref={projectTree}
                id="intellij-toolwindow-left"
                className={overlay('projectTree')}
            >
                <ProjectTree
                    setSelectedFile={setSelectedFile}
                    setFiles={setFiles}
                />
            </div>
            <div
                ref={editor}
                id="intellij-editor"
                className={overlay('editor')}
            >
                <Editor file={selectedFile} />
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
                repl={repl}
                isOverlay={isOverlay}
                overlay={overlay}
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
