import React, { ReactNode } from 'react';

type MyFile = {
    name: string;
    file: File | null;
    children: MyFile[];
};

type ProjectTreeProps = {
    setSelectedFile: (file: File | null) => void;
    setFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>;
};

const ProjectTree: React.FC<ProjectTreeProps> = ({
    setSelectedFile,
    setFiles,
}) => {
    const modulePicker = React.useRef<HTMLInputElement>(null);
    const [modules, setModules] = React.useState<MyFile[]>([]);

    React.useEffect(() => {
        if (modulePicker.current !== null) {
            // modulePicker.current.setAttribute("directory", "");
            modulePicker.current.setAttribute('webkitdirectory', '');
        }
    }, [modulePicker]);

    const handleModulePickerChange: React.ChangeEventHandler<
        HTMLInputElement
    > = (e) => {
        let files = e.target.files ?? new FileList();
        addFiles(files);
    };

    const addFiles = (filelist: FileList) => {
        if (filelist.length === 0) return;
        const root = {
            name: filelist[0].webkitRelativePath.split('/')[0],
            file: null,
            children: new Array<MyFile>(),
        };
        for (const file of Array.from(filelist)) {
            const path = file.webkitRelativePath.split('/');
            let parent: MyFile = root;
            path.splice(1, path.length - 2).forEach((dir) => {
                let myFile = parent.children.find(
                    (child) => child.name === dir
                );
                if (myFile === undefined) {
                    myFile = {
                        name: dir,
                        file: null,
                        children: new Array<MyFile>(),
                    };
                    parent.children.push(myFile);
                }
                parent = myFile;
            });
            parent.children.push({ name: file.name, file: file, children: [] });

            setFiles((oldFiles) => oldFiles.set(file.webkitRelativePath, file));
        }
        sortMyFile(root);
        setModules((oldModules) => [...oldModules, root]);
    };

    const sortMyFile = (file: MyFile) => {
        file.children.sort((a, b) => {
            if (
                (a.children.length > 0 && b.children.length > 0) ||
                (a.children.length === 0 && b.children.length === 0)
            )
                return a.name.localeCompare(b.name);
            return a.children.length > 0 ? -1 : 1;
        });
        file.children.forEach((child) => sortMyFile(child));
    };

    const myfileToTreeNode = (file: MyFile): ReactNode => {
        if (file.children.length === 0) {
            return (
                <div
                    className="intellij-file"
                    key={file.file?.webkitRelativePath}
                    onClick={() => setSelectedFile(file?.file)}
                >
                    {file.name}
                </div>
            );
        }

        return (
            <details
                className="intellij-dir"
                key={file.file?.webkitRelativePath ?? file.name}
            >
                <summary key={file.file?.webkitRelativePath + 'summary'}>
                    {file.name}
                </summary>
                {file.children.map((child) => myfileToTreeNode(child))}
            </details>
        );
    };

    return (
        <>
            <div id="intellij-project-toolbar" className="toolwindow-toolbar">
                Project
            </div>
            <div id="intellij-project-tree">
                {modules.map((module) => myfileToTreeNode(module))}
            </div>
            <div className="flex-grow"></div>
            <label className="round-button" id="module-picker-label">
                <input
                    type="file"
                    className="file-input"
                    onChange={handleModulePickerChange}
                    id="module-picker"
                    name="modules"
                    ref={modulePicker}
                    multiple
                />
                <span>Open module</span>
            </label>
        </>
    );
};

export default ProjectTree;
