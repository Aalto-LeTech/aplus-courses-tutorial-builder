export enum ArgumentType {
    String,
    StringArray,
    Boolean,
}

export class ArgumentInfo {
    type: ArgumentType;
    info: string;

    constructor(type: ArgumentType, info: string) {
        this.type = type;
        this.info = info;
    }
}

export const ActionArgumentFields = {
    openEditor: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The path of the file to be opened by the student'
            ),
        ],
    ]),
    build: new Map([
        [
            'actionName',
            new ArgumentInfo(
                ArgumentType.String,
                'The name of the build action that is used by IntelliJ'
            ),
        ],
    ]),
    comment: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited'
            ),
        ],
        [
            'text',
            new ArgumentInfo(
                ArgumentType.String,
                'The text that the commented-out line should have'
            ),
        ],
    ]),
    run: new Map([
        [
            'actionNames',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'The accepted names of the triggered IntelliJ actions'
            ),
        ],
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The name of the application to be run (more specifically the file through which it is initiated)'
            ),
        ],
    ]),
    null: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The path of the highlighted file, if the editor is highlighted'
            ),
        ],
    ]),
    openRepl: new Map([
        [
            'module',
            new ArgumentInfo(
                ArgumentType.String,
                'The module which module the REPL will be opened for'
            ),
        ],
    ]),
    replInput: new Map([
        [
            'module',
            new ArgumentInfo(
                ArgumentType.String,
                'The module which module the REPL will be opened for'
            ),
        ],
        [
            'input',
            new ArgumentInfo(
                ArgumentType.String,
                'The command to be given by the user'
            ),
        ],
        [
            'output',
            new ArgumentInfo(
                ArgumentType.String,
                'The output to be displayed by the REPL console'
            ),
        ],
    ]),
    replInputContains: new Map([
        [
            'module',
            new ArgumentInfo(
                ArgumentType.String,
                'The module which module the REPL will be opened for'
            ),
        ],
        [
            'inputs',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'An array of the tokens at least one of which needs to be included in the REPL command given by the student'
            ),
        ],
        [
            'output',
            new ArgumentInfo(
                ArgumentType.String,
                "This text should be contained in the REPL's output"
            ),
        ],
    ]),
    declareVariable: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited to contain the variable'
            ),
        ],
        [
            'variableName',
            new ArgumentInfo(ArgumentType.String, 'The name of the variable'),
        ],
        [
            'variableType',
            new ArgumentInfo(
                ArgumentType.String,
                'Whether the variable should be var or val'
            ),
        ],
        [
            'valueTokens',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'The lexical tokens that describe the value that should be assigned to the variable (without the equals sign)'
            ),
        ],
    ]),
    assignStatement: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited to contain the variable'
            ),
        ],
        [
            'variableName',
            new ArgumentInfo(ArgumentType.String, 'The name of the variable'),
        ],
        [
            'valueTokens',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'The lexical tokens that describe the value that should be assigned to the variable (without the equals sign)'
            ),
        ],
    ]),
    classDeclScala: new Map([
        [
            'className',
            new ArgumentInfo(
                ArgumentType.String,
                'The name of the declared class'
            ),
        ],
        [
            'classArguments',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'The arguments to be given to the constructor'
            ),
        ],
        [
            'classHierarchy',
            new ArgumentInfo(
                ArgumentType.String,
                'Can be left empty, any classes that our class extends'
            ),
        ],
        [
            'traitHierarchy',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'Any traits that our class incorporates using the “with” keyword'
            ),
        ],
        [
            'typeParamClause',
            new ArgumentInfo(
                ArgumentType.String,
                'Any type parameters for the class'
            ),
        ],
        [
            'modifiers',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'An array where each value corresponds to each of the arguments specified previously, used to define the modifiers of each argument'
            ),
        ],
        [
            'annotations',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'An array where each value corresponds to each of the arguments specified previously, used to define the annotations of each argument'
            ),
        ],
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited to contain the variable'
            ),
        ],
    ]),
    functionDefinition: new Map([
        [
            'methodName',
            new ArgumentInfo(ArgumentType.String, 'The name of the method'),
        ],
        [
            'methodArguments',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'An array that includes the arguments of the method'
            ),
        ],
        [
            'methodBody',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'The contents of the method. To be specified by a developer according to how the PSI interprets the code'
            ),
        ],
        [
            'typeParamClause',
            new ArgumentInfo(ArgumentType.String, 'Possible type parameters'),
        ],
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited to contain the function'
            ),
        ],
        [
            'checkEquals',
            new ArgumentInfo(
                ArgumentType.Boolean,
                'Set to true if the existence of an “=” sign between the function’s signature and body is necessary'
            ),
        ],
    ]),
    methodCall: new Map([
        [
            'filePath',
            new ArgumentInfo(
                ArgumentType.String,
                'The file that should be edited to contain the method call'
            ),
        ],
        [
            'methodName',
            new ArgumentInfo(
                ArgumentType.String,
                'The name of the method to be called'
            ),
        ],
        [
            'argsList',
            new ArgumentInfo(
                ArgumentType.StringArray,
                'An array with the arguments that should be passed to the method'
            ),
        ],
    ]),
    stop: new Map([
        [
            'appName',
            new ArgumentInfo(
                ArgumentType.String,
                'The name of the application to be stopped'
            ),
        ],
    ]),
};
