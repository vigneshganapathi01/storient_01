
import React from 'react';
import TemplateForm from './template-editor/TemplateForm';

interface TemplateEditorProps {
  onSuccess: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ onSuccess }) => {
  return <TemplateForm onSuccess={onSuccess} />;
};

export default TemplateEditor;
