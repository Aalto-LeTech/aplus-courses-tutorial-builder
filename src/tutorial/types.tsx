import { ActionArgumentFields, ArgumentInfo } from './actionArguments';

export enum Component {
    projectTree = 'projectTree',
    editor = 'editor',
    build = 'build',
    repl = 'repl',
}

export const getComponent = (name: string) => {
    switch (name) {
        case 'editor':
            return Component.editor;
        case 'build':
            return Component.build;
        case 'repl':
            return Component.repl;
        default:
            return Component.projectTree;
    }
};

export class Action {
    readonly command: string;
    readonly description: string;
    readonly fields: Map<string, ArgumentInfo>;

    constructor(
        command: string,
        description: string,
        fields: Map<string, any>
    ) {
        this.command = command;
        this.description = description;
        this.fields = fields;
    }

    toString() {
        return this.command;
    }
}

const actions: Action[] = [
    new Action('openEditor', 'Open a file', ActionArgumentFields.openEditor),
    new Action('build', 'Build a module', ActionArgumentFields.build),
    new Action(
        'comment',
        'Comment out a line of code',
        ActionArgumentFields.comment
    ),
    new Action('run', 'Run a program', ActionArgumentFields.run),
    new Action('null', 'Free-range task', ActionArgumentFields.null),
    new Action('openRepl', 'Open REPL', ActionArgumentFields.openRepl),
    new Action('replInput', 'REPL input', ActionArgumentFields.replInput),
    new Action(
        'replInputContains',
        'REPL input with includes check',
        ActionArgumentFields.replInputContains
    ),
    new Action(
        'declareVariable',
        'Variable declaration',
        ActionArgumentFields.declareVariable
    ),
    new Action(
        'assignStatement',
        'Assign statement',
        ActionArgumentFields.assignStatement
    ),
    new Action(
        'classDeclScala',
        'Class declaration',
        ActionArgumentFields.classDeclScala
    ),
    new Action(
        'functionDefinition',
        'Function definition',
        ActionArgumentFields.functionDefinition
    ),
    new Action('methodCall', 'Method call', ActionArgumentFields.methodCall),
    new Action(
        'stop',
        'Close a running application',
        ActionArgumentFields.stop
    ),
];

export const Actions: Map<string, Action> = new Map(
    actions.map((action) => [action.command, action])
);

export type Tutorial = {
    name: string;
    moduleDependencies: string[];
    tasks: Task[];
};

export type Task = {
    instruction: string;
    info: string;
    component: Component[];
    assertClosed: Component[] | undefined;
    freeRange: boolean;
    action: Action;
    actionArguments: any;
};
