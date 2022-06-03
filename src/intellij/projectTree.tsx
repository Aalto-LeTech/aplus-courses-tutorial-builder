import React, { ReactNode } from 'react';

type MyFile = {
    name: string;
    file: File | null;
    children: MyFile[];
}

type ProjectTreeProps = {
    setSelectedFile: (file: File | null) => void;
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ setSelectedFile }) => {
    const modulePicker = React.useRef<HTMLInputElement>(null);
    const [modules, setModules] = React.useState<MyFile[]>([]);
    // const [files, setFiles] = React.useState<Map<string, File>>(new Map());

    React.useEffect(() => {
        if (modulePicker.current !== null) {
            // modulePicker.current.setAttribute("directory", "");
            modulePicker.current.setAttribute("webkitdirectory", "");
        }
    }, [modulePicker]);


    const handleModulePickerChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let files = e.target.files ?? new FileList();
        addFiles(files);
    }

    const addFiles = (filelist: FileList) => {
        if (filelist.length === 0) return;
        const root = {
            "name": filelist[0].webkitRelativePath.split("/")[0], file: null, children: new Array<MyFile>()
        };
        for (const file of Array.from(filelist)) {
            const path = file.webkitRelativePath.split("/");
            let parent: MyFile = root;
            path.splice(1, path.length - 2).forEach(dir => {
                let myFile = parent.children.find(child => child.name === dir);
                if (myFile === undefined) {
                    myFile = { name: dir, file: null, children: new Array<MyFile>() }
                    parent.children.push(myFile);
                }
                parent = myFile;
            });
            parent.children.push({ name: file.name, file: file, children: [] });
            parent.children.sort((a, b) => b.children.length - a.children.length)
            // setFiles(oldFiles => oldFiles.set(file.webkitRelativePath, file));
        }
        setModules(oldModules => [...oldModules, root]);
    }



    const myfileToTreeNode = (file: MyFile): ReactNode => {
        if (file.children.length === 0) {
            return <div className="intellij-file" onClick={() => setSelectedFile(file?.file)}>{file.name}</div>
        }

        return (
            <details className='intellij-dir'>
                <summary>
                    {file.name}
                </summary>
                {file.children.map(child => myfileToTreeNode(child))}
            </details>
        );
    }




    return (
        <>
            <div id="intellij-project-toolbar">Project</div>
            <div id="intellij-project-tree">
                {modules.map(module => myfileToTreeNode(module))}
            </div>
            <div className="flex-grow"></div>
            <label className="round-button" id="module-picker-label">
                <input type="file" className="file-input" onChange={handleModulePickerChange} id="module-picker" name="modules" ref={modulePicker} multiple />
                <span>Open module</span>
            </label>
        </>
    );
}

export default ProjectTree;