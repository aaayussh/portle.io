import './Editor.css';
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Button from './Button';
import './index.css';


const EditorComponent = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('draftEditorContent');
    if (savedContent) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem('draftEditorContent', JSON.stringify(convertToRaw(contentState)));
  }, [editorState]);

  const onChange = newEditorState => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = command => {
    let newState;
    if (command === 'header-format') {
      newState = RichUtils.toggleBlockType(editorState, 'header-one');
    } else if (command === 'bold-format') {
      newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    } else if (command === 'red-line-format') {
      newState = RichUtils.toggleInlineStyle(editorState, 'RED_LINE');
    } else if (command === 'underline-format') {
      newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
    }
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFn = e => {
    if (e.key === '#' && e.getModifierState('Shift')) {
      return 'header-format';
    } else if (e.key === '*') {
      return 'bold-format';
    } else if (e.key === '+' && e.getModifierState('Shift')) {
      return 'red-line-format';
    } else if (e.key === '' && e.getModifierState('Alt')) {
      return 'underline-format';
    }
    return undefined;
  };
  

  return (
    <div>
    <div>
    <Button handleSave={() => {
        const contentState = editorState.getCurrentContent();
        localStorage.setItem('draftEditorContent', JSON.stringify(convertToRaw(contentState)));
      }} />
      </div>
    <div className='editor'>
      
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
      />
    </div>
    </div>
  );
};

export default EditorComponent;
