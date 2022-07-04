import React from 'react';
import {
    BottomToolWindow,
    replTW,
    terminalTW,
    versionControlTW,
} from './intellij';

type BottomToolwindowCProps = {
    highlightedComponents: string[];
    selectedBottomToolwindow: BottomToolWindow | null;
    repl: React.RefObject<HTMLDivElement>;
    isOverlay: boolean;
    overlay: (component: string) => 'intellij-dark' | '';
};

const BottomToolwindowC: React.FC<BottomToolwindowCProps> = ({
    highlightedComponents,
    selectedBottomToolwindow,
    repl,
    isOverlay,
    overlay,
}) => {
    if (selectedBottomToolwindow === versionControlTW) {
        return (
            <div
                ref={repl}
                className={overlay('git')}
                id="intellij-toolwindow-bottom"
            >
                Git
            </div>
        );
    } else if (selectedBottomToolwindow === replTW) {
        return (
            <div
                ref={repl}
                className={overlay('repl')}
                id="intellij-toolwindow-bottom"
            >
                REPL
            </div>
        );
    } else if (selectedBottomToolwindow === terminalTW) {
        return (
            <div
                ref={repl}
                className={overlay('terminal')}
                id="intellij-toolwindow-bottom"
            >
                Terminal
            </div>
        );
    } else {
        return <></>;
    }
};

export default BottomToolwindowC;
