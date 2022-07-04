import React from 'react';
import './export.css';
import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/base16/darcula.css';
import { Tutorial } from '../tutorial/types';
import { saveJson, tutorialsToJson } from '../tutorial/importExport';

type ExportProps = {
    tutorials: Tutorial[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

const Export: React.FC<ExportProps> = ({ tutorials, visible, setVisible }) => {
    const [exportCode, setExportCode] = React.useState('');
    const [hideWrongFields, setHideWrongFields] = React.useState(true);
    const [copyButtonText, setCopyButtonText] =
        React.useState('Copy to clipboard');

    React.useEffect(() => {
        if (visible) {
            setExportCode(tutorialsToJson(tutorials, hideWrongFields));
            hljs.highlightAll();
        }
    }, [exportCode, visible, tutorials, hideWrongFields]);

    const handleCopyToClipboard = React.useCallback(() => {
        navigator.clipboard
            .writeText(exportCode)
            .then(() => setCopyButtonText('Copied'))
            .catch(() => setCopyButtonText('Error'))
            .finally(() =>
                setTimeout(() => setCopyButtonText('Copy to clipboard'), 2000)
            );
    }, [exportCode]);

    return (
        <div
            className={visible ? '' : 'hidden'}
            id="export-container"
            onClick={() => setVisible(false)}
        >
            <div
                className="rounded-item"
                id="export-window"
                onClick={(event) => event.stopPropagation()}
            >
                <p>
                    Add this output to the course configuration JSON file.
                    <br />
                    <a href="https://github.com/Aalto-LeTech/aplus-courses/wiki/Course-Configuration">
                        Instructions for creating the file.
                    </a>
                </p>
                <div id="export-buttons">
                    <button onClick={() => saveJson(exportCode)}>Save</button>
                    <button onClick={handleCopyToClipboard}>
                        {copyButtonText}
                    </button>
                    <button onClick={() => setHideWrongFields((old) => !old)}>
                        {hideWrongFields
                            ? 'Show all saved action arguments'
                            : 'Show only correct action arguments'}
                    </button>
                    <button onClick={() => setVisible(false)}>Close</button>
                </div>
                <pre>
                    <code className="language-json" id="export-code">
                        {exportCode}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default Export;
