import React from 'react';
import './bottomToolwindow.css';
import {
    BottomToolWindow,
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
};

const BottomToolwindowC: React.FC<BottomToolwindowCProps> = ({
    highlightedComponents,
    selectedBottomToolwindow,
    isOverlay,
    overlay,
    createPopup,
    selectedComponent,
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
                </div>
                <pre id="repl-textarea">
                    <code>test</code>
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
    } else {
        return <></>;
    }
};

export default BottomToolwindowC;
