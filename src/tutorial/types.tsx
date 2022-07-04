import { ActionArgumentFields, ArgumentInfo } from './actionArguments';

export const Components = [
    'projectTree',
    'editor',
    'build',
    'repl',
    'git',
    'terminal',
];

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

export const Actions = {
    openEditor: new Action(
        'openEditor',
        'Open a file',
        ActionArgumentFields.openEditor
    ),
    build: new Action('build', 'Build a module', ActionArgumentFields.build),
    comment: new Action(
        'comment',
        'Comment out a line of code',
        ActionArgumentFields.comment
    ),
    run: new Action('run', 'Run a program', ActionArgumentFields.run),
    null: new Action('null', 'Free-range task', ActionArgumentFields.null),
    openRepl: new Action(
        'openRepl',
        'Open REPL',
        ActionArgumentFields.openRepl
    ),
    replInput: new Action(
        'replInput',
        'REPL input',
        ActionArgumentFields.replInput
    ),
    replInputContains: new Action(
        'replInputContains',
        'REPL input with includes check',
        ActionArgumentFields.replInputContains
    ),
    declareVariable: new Action(
        'declareVariable',
        'Variable declaration',
        ActionArgumentFields.declareVariable
    ),
    assignStatement: new Action(
        'assignStatement',
        'Assign statement',
        ActionArgumentFields.assignStatement
    ),
    classDeclScala: new Action(
        'classDeclScala',
        'Class declaration',
        ActionArgumentFields.classDeclScala
    ),
    functionDefinition: new Action(
        'functionDefinition',
        'Function definition',
        ActionArgumentFields.functionDefinition
    ),
    methodCall: new Action(
        'methodCall',
        'Method call',
        ActionArgumentFields.methodCall
    ),
    stop: new Action(
        'stop',
        'Close a running application',
        ActionArgumentFields.stop
    ),
};

export type Tutorial = {
    name: string;
    moduleDependencies: string[];
    tasks: Task[];
};

export type Task = {
    instruction: string;
    info: string;
    component: string[];
    assertClosed: string[];
    freeRange: boolean;
    action: Action;
    actionArguments: any;
};
