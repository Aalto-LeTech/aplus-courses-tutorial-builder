import React from 'react';
import './intellij.css';
import ProjectTree from './projectTree';
import Editor from './editor';
import { Task, Tutorial } from '../tutorial/types';
import { useGranularEffect } from 'granular-hooks';

type IntelliJProps = {
    selectedTask: Task | null;
    selectedTutorial: Tutorial | null;
    selectedFilePath: string;
    setSelectedFilePath: (path: string) => void;
    highlightedComponents: string[];
};

const IntelliJ: React.FC<IntelliJProps> = ({
    selectedTask,
    selectedTutorial,
    selectedFilePath,
    setSelectedFilePath,
    highlightedComponents,
}) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [files, setFiles] = React.useState<Map<string, File>>(new Map());
    const [hideOverlay, setHideOverlay] = React.useState(false);
    const isOverlay = !hideOverlay && highlightedComponents.length > 0;
    const darkClass = isOverlay ? 'intellij-dark' : '';

    useGranularEffect(
        () => {
            if (
                selectedFile === null ||
                selectedFile.webkitRelativePath === selectedFilePath
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
            style={isOverlay ? { backgroundColor: '#121314' } : {}}
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
                <span className="intellij-selected">Project</span>
                <span>Commit</span>
                <div className="flex-grow"></div>
                <span>Structure</span>
            </div>
            <div
                ref={projectTree}
                id="intellij-toolwindow-left"
                className={
                    highlightedComponents.length > 0 &&
                    !highlightedComponents.includes('projectTree')
                        ? 'intellij-dark'
                        : ''
                }
            >
                <ProjectTree
                    setSelectedFile={setSelectedFile}
                    setFiles={setFiles}
                />
            </div>
            <div
                ref={editor}
                id="intellij-editor"
                className={
                    isOverlay && !highlightedComponents.includes('editor')
                        ? 'intellij-dark'
                        : ''
                }
            >
                <Editor file={selectedFile} />
            </div>
            <div className={darkClass} id="intellij-toolwindow-right">
                <p>
                    You can open files with the project tree. Click the button
                    on the bottom of the tree to load modules.
                </p>
                <p>
                    Import tutorials with the Import Tutorials button. The
                    tutorial JSON has to have a "tutorials" field.
                </p>
            </div>
            <div className={darkClass} id="intellij-right-edge">
                <span className="intellij-selected">Information</span>
            </div>
            <div
                ref={repl}
                className={
                    isOverlay && !highlightedComponents.includes('repl')
                        ? 'intellij-dark'
                        : ''
                }
                id="intellij-toolwindow-bottom"
            >
                REPL
            </div>
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-toolbar-bottom"
            >
                <span>Version Control</span>
                <span className="intellij-selected">Run</span>
                <span>TODO</span>
                <span>Problems</span>
                <span>Terminal</span>
                <span>Build</span>
            </div>
            <div
                className={`intellij-whole-width ${darkClass}`}
                id="intellij-bottom-edge"
            >
                Build completed successfully with 1 warning in 12 sec, 77 ms
                (moments ago)
            </div>
        </div>
    );
};

export default IntelliJ;
