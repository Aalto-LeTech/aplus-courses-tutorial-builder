import React from 'react';
import './intellij.css';
import ProjectTree from './projectTree';
import Editor from './editor';
import { Component, Task } from '../tutorial/types';

type IntelliJProps = {
    selectedTask: Task | null;
    selectedFilePath: string;
    setSelectedFilePath: (path: string) => void;
    highlightedComponents: Component[];
};

const IntelliJ: React.FC<IntelliJProps> = ({
    selectedTask,
    selectedFilePath,
    setSelectedFilePath,
    highlightedComponents,
}) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const isOverlay = highlightedComponents.length > 0;
    const darkClass = isOverlay ? 'intellij-dark' : '';

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
            case Component.build:
                // TODO what is this
                break;
            case Component.editor:
                highlightedEl = editorEl;
                break;
            case Component.projectTree:
                highlightedEl = projectTreeEl;
                break;
            case Component.repl:
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
                  top - popupHeight - intellijTop - 10
              }px)`
            : `translate(${left + width - intellijLeft + 10}px, ${
                  top - intellijTop
              }px)`;
    }, [selectedTask, isOverlay]);

    return (
        <div ref={intellij} className="rounded-item" id="intellij">
            <div ref={popup} id="intellij-popup">
                <h2>{selectedTask?.instruction}</h2>
                <p>{selectedTask?.info}</p>
            </div>
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
                    !highlightedComponents.includes(Component.projectTree)
                        ? 'intellij-dark'
                        : ''
                }
            >
                <ProjectTree setSelectedFile={setSelectedFile} />
            </div>
            <div
                ref={editor}
                id="intellij-editor"
                className={
                    highlightedComponents.length > 0 &&
                    !highlightedComponents.includes(Component.editor)
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
                    isOverlay && !highlightedComponents.includes(Component.repl)
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
