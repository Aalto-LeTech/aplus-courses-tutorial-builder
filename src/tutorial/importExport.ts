import { Actions, Task, Tutorial } from "./types";

export const getTutorialsFromJson = (jsonString: string): Tutorial[] => {
    const obj = JSON.parse(jsonString);
    const jsonTutorials: object = obj["tutorials"];
    if (!jsonTutorials) {
        console.error(`JSON doesn't contain field "tutorials"`);
        return [];
    }
    const tutorials: Tutorial[] = [];
    Object.entries(jsonTutorials).forEach(([name, jsonTutorial]) => {
        if (jsonTutorial["moduleDependencies"] === undefined) {
            console.error(`Tutorial with id ${name} missing field "moduleDependencies". Stopping export`);
            return;
        }
        if (jsonTutorial["tasks"] === undefined) {
            console.error(`Tutorial with id ${name} missing field "tasks". Stopping export`);
            return;
        }
        const moduleDependencies: string[] = jsonTutorial["moduleDependencies"];
        const jsonTasks = jsonTutorial["tasks"];
        // Convert component to array
        for (const task of jsonTasks) {
            if (Array.isArray(task.component)) {
            } else if (task.component === undefined) {
                task.component = [];
            } else {
                task.component = [task.component];
            }
            task.action = Actions.get(task.action);
        }
        const tasks: Task[] = jsonTasks;
        tutorials.push({ name, moduleDependencies, tasks })
    });
    return tutorials;
}

export const tutorialsToJson = (tutorials: Tutorial[]): string => {
    let exported: Map<string, any> = new Map();
    for (const tutorial of tutorials) {
        const id = tutorial.name;
        const row: any = { ...tutorial };
        delete row.name;
        row.tasks = tutorial.tasks.map(task => {
            let newTask: any = { ...task };
            if (task.action !== undefined) {
                newTask.action = task.action.toString();
            }
            return newTask;
        })
        exported.set(id, row);
    }
    return JSON.stringify({ tutorials: Object.fromEntries(exported) }, null, 4);
}