import React from 'react';
import { Task } from '../tutorial/types';
import './bottomToolwindow.css';
import {
    BottomToolWindow,
    buildTW,
    replTW,
    terminalTW,
    versionControlTW,
} from './intellij';

type BottomToolwindowCProps = {
    highlightedComponents: string[];
    selectedBottomToolwindow: BottomToolWindow | null;
    isOverlay: boolean;
    overlay: (component: string) => 'intellij-dark' | '';
    createPopup: () => JSX.Element;
    selectedComponent: string | undefined;
    selectedTask: Task | null;
};

const BottomToolwindowC: React.FC<BottomToolwindowCProps> = ({
    selectedBottomToolwindow,
    overlay,
    createPopup,
    selectedComponent,
    selectedTask,
}) => {
    if (selectedBottomToolwindow === versionControlTW) {
        return (
            <div className={overlay('git')} id="intellij-toolwindow-bottom">
                {selectedComponent === 'git' && createPopup()}
                Git
            </div>
        );
    } else if (selectedBottomToolwindow === replTW) {
        return (
            <div
                className={`${overlay('repl')} repl`}
                id="intellij-toolwindow-bottom"
            >
                {selectedComponent === 'repl' && createPopup()}
                <div className="toolwindow-toolbar" id="repl-toolbar">
                    Run: REPL
                    {selectedTask &&
                        selectedTask.actionArguments['module'] &&
                        ` for ${selectedTask.actionArguments['module']}`}
                </div>
                <pre id="repl-textarea">
                    <code>
                        {selectedTask && selectedTask.actionArguments['input'] && (
                            <>
                                {`scala> ${selectedTask.actionArguments['input']}`}
                                <br />
                            </>
                        )}
                        {selectedTask &&
                            selectedTask.actionArguments['inputs'] &&
                            selectedTask.actionArguments['inputs'].map(
                                (input: any) => (
                                    <>
                                        {`scala> ${input}`}
                                        <br />
                                    </>
                                )
                            )}
                        {selectedTask &&
                            selectedTask.actionArguments['output'] &&
                            selectedTask.actionArguments['output']}
                    </code>
                </pre>
            </div>
        );
    } else if (selectedBottomToolwindow === terminalTW) {
        return (
            <div
                className={overlay('terminal')}
                id="intellij-toolwindow-bottom"
            >
                {selectedComponent === 'terminal' && createPopup()}
                Terminal
            </div>
        );
    } else if (selectedBottomToolwindow === buildTW) {
        return (
            <div className={overlay('build')} id="intellij-toolwindow-bottom">
                {selectedComponent === 'build' && createPopup()}
                Build
            </div>
        );
    } else {
        return <></>;
    }
};

export default BottomToolwindowC;
