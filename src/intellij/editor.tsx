import React from 'react';
import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/base16/darcula.css';

type EditorProps = {
    file: File | null;
};

const Editor: React.FC<EditorProps> = ({ file }) => {
    const [fileText, setFileText] = React.useState<string>('');
    const [lineNumbers, setLineNumbers] = React.useState<string>('');
    const ref = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        if (ref.current !== null)
            ref.current.setAttribute('spellcheck', 'false');
    }, [ref]);

    React.useEffect(() => {
        if (file === null) {
            setFileText('');
            setLineNumbers('');
            return;
        }
        const reader = new FileReader();
        const split = file.name.split('.');
        const language = split[split.length - 1];
        reader.onload = (e) => {
            // const text = <string>(e.target?.result ?? "");
            const result = e.target?.result;
            const text = String(result);
            try {
                setFileText(hljs.highlight(text, { language: language }).value);
            } catch (error) {
                setFileText(hljs.highlightAuto(text).value);
            }
            let linenumbersText = '';
            for (let i = 1; i < text.split('\n').length; i++) {
                linenumbersText += `${i}<br>`;
            }
            setLineNumbers(linenumbersText);
            hljs.highlightAll();
        };
        reader.readAsText(file);
    }, [file]);

    return (
        <>
            <pre>
                <div
                    id="intellij-linenumbers"
                    dangerouslySetInnerHTML={{ __html: lineNumbers }}
                ></div>
                <code
                    id="intellij-code-editor"
                    dangerouslySetInnerHTML={{ __html: fileText }}
                    contentEditable
                    ref={ref}
                ></code>
            </pre>
        </>
    );
};

export default Editor;
