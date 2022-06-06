import React from 'react';
import './export.css';
import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/base16/darcula.css';
import { Tutorial } from '../tutorial/types';
import { tutorialsToJson } from '../tutorial/importExport';

type ExportProps = {
    tutorials: Tutorial[];
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

const Export: React.FC<ExportProps> = ({ tutorials, visible, setVisible }) => {
    const [exportCode, setExportCode] = React.useState('');

    React.useEffect(() => {
        if (visible) {
            setExportCode(tutorialsToJson(tutorials));
            hljs.highlightAll();
        }
    }, [exportCode, visible, tutorials]);

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
