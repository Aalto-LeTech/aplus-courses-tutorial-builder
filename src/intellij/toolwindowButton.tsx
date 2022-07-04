import React from 'react';
import {
    BottomToolWindow,
    informationTW,
    LeftToolWindow,
    projectTW,
    replTW,
    RightToolWindow,
    terminalTW,
    ToolWindow,
    versionControlTW,
} from './intellij';

type BaseToolWindowButtonProps = {
    toolwindow: ToolWindow;
    selectedToolwindow: ToolWindow | null;
    setSelectedToolwindow: React.Dispatch<React.SetStateAction<any>>;
    setToolWindow: (
        toolwindow: any,
        setToolWindow: React.Dispatch<React.SetStateAction<any>>
    ) => void;
};

type ToolWindowButtonProps = {
    toolwindow: ToolWindow;
    selectedBottomToolwindow: ToolWindow | null;
    setSelectedBottomToolwindow: React.Dispatch<
        React.SetStateAction<BottomToolWindow | null>
    >;
    selectedLeftToolwindow: LeftToolWindow | null;
    setSelectedLeftToolwindow: React.Dispatch<
        React.SetStateAction<LeftToolWindow | null>
    >;
    selectedRightToolwindow: RightToolWindow | null;
    setSelectedRightToolwindow: React.Dispatch<
        React.SetStateAction<RightToolWindow | null>
    >;
    setToolWindow: (
        toolwindow: any,
        setToolWindow: React.Dispatch<React.SetStateAction<any>>
    ) => void;
};

const BaseToolWindowButton: React.FC<BaseToolWindowButtonProps> = ({
    toolwindow,
    selectedToolwindow,
    setSelectedToolwindow,
    setToolWindow,
}) => {
    const toolwindowTitles: Map<ToolWindow, string> = new Map([
        [versionControlTW, 'Version Control'],
        [replTW, 'Run'],
        [terminalTW, 'Terminal'],
        [projectTW, 'Project'],
        [informationTW, 'Information'],
    ]);
    return (
        <span
            onClick={() => setToolWindow(toolwindow, setSelectedToolwindow)}
            className={
                selectedToolwindow === toolwindow ? 'intellij-selected' : ''
            }
        >
            {toolwindowTitles.get(toolwindow)}
        </span>
    );
};

export const BottomToolWindowButton: React.FC<ToolWindowButtonProps> = ({
    toolwindow,
    selectedBottomToolwindow,
    setSelectedBottomToolwindow,
    setToolWindow,
}) => {
    return (
        <BaseToolWindowButton
            toolwindow={toolwindow}
            selectedToolwindow={selectedBottomToolwindow}
            setSelectedToolwindow={setSelectedBottomToolwindow}
            setToolWindow={setToolWindow}
        />
    );
};

export const LeftToolWindowButton: React.FC<ToolWindowButtonProps> = ({
    toolwindow,
    selectedLeftToolwindow,
    setSelectedLeftToolwindow,
    setToolWindow,
}) => {
    return (
        <BaseToolWindowButton
            toolwindow={toolwindow}
            selectedToolwindow={selectedLeftToolwindow}
            setSelectedToolwindow={setSelectedLeftToolwindow}
            setToolWindow={setToolWindow}
        />
    );
};

export const RightToolWindowButton: React.FC<ToolWindowButtonProps> = ({
    toolwindow,
    selectedRightToolwindow,
    setSelectedRightToolwindow,
    setToolWindow,
}) => {
    return (
        <BaseToolWindowButton
            toolwindow={toolwindow}
            selectedToolwindow={selectedRightToolwindow}
            setSelectedToolwindow={setSelectedRightToolwindow}
            setToolWindow={setToolWindow}
        />
    );
};
