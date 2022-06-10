import { ArgumentType } from './actionArguments';
import { Actions, Task, Tutorial } from './types';

export const getTutorialsFromJson = (jsonString: string): Tutorial[] => {
    const obj = JSON.parse(jsonString);
    const jsonTutorials: object = obj['tutorials'];
    if (!jsonTutorials) {
        console.error(`JSON doesn't contain field "tutorials"`);
        return [];
    }
    const tutorials: Tutorial[] = [];
    Object.entries(jsonTutorials).forEach(([name, jsonTutorial]) => {
        if (jsonTutorial['moduleDependencies'] === undefined) {
            console.error(
                `Tutorial with id ${name} missing field "moduleDependencies". Stopping export`
            );
            return;
        }
        if (jsonTutorial['tasks'] === undefined) {
            console.error(
                `Tutorial with id ${name} missing field "tasks". Stopping export`
            );
            return;
        }
        const moduleDependencies: string[] = jsonTutorial['moduleDependencies'];
        const jsonTasks = jsonTutorial['tasks'];

        for (const task of jsonTasks) {
            // Convert component to array
            if (Array.isArray(task.component)) {
            } else if (task.component === undefined) {
                task.component = [];
            } else {
                task.component = [task.component];
            }
            // Make assertClosed array if undefined
            if (task.assertClosed === undefined) task.assertClosed = [];
            // Get more action info based on action name
            task.action = (Actions as any)[task.action];
        }
        const tasks: Task[] = jsonTasks;
        tutorials.push({ name, moduleDependencies, tasks });
    });
    return tutorials;
};

export const tutorialsToJson = (
    tutorials: Tutorial[],
    hideWrongFields: boolean
): string => {
    let exported: Map<string, any> = new Map();
    for (const tutorial of tutorials) {
        const id = tutorial.name;
        const row: any = { ...tutorial };
        delete row.name;
        row.tasks = tutorial.tasks.map((task) => {
            let newTask: any = { ...task };
            if (task.action !== undefined) {
                newTask.action = task.action.toString();
                if (hideWrongFields) {
                    const actionArguments: any = {};
                    const action = task.action;
                    for (const [key, value] of Object.entries(
                        task.actionArguments
                    )) {
                        if (action.fields.has(key)) {
                            actionArguments[key] = value;
                        }
                    }
                    newTask.actionArguments = actionArguments;
                }
                if (task.actionArguments === undefined) {
                    task.actionArguments = {};
                }
                for (const [
                    command,
                    argument,
                ] of task.action.fields.entries()) {
                    if (!task.actionArguments[command]) {
                        let value: any;
                        if (argument.type === ArgumentType.String) {
                            value = '';
                        } else if (argument.type === ArgumentType.StringArray) {
                            value = [];
                        } else if (argument.type === ArgumentType.Boolean) {
                            value = false;
                        }
                        task.actionArguments[command] = value;
                    }
                }
            }

            return newTask;
        });
        exported.set(id, row);
    }
    return JSON.stringify({ tutorials: Object.fromEntries(exported) }, null, 4);
};

export const saveJson = (jsonString: string) => {
    let el = document.createElement('a');
    el.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString)
    );
    el.setAttribute('download', 'tutorial.json');

    el.click();
};
