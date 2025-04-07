
import React from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FileUploadProps {
  templateFileName: string;
  setTemplateFileName: (name: string) => void;
  setTemplateFile: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  templateFileName,
  setTemplateFileName,
  setTemplateFile
}) => {
  const handleTemplateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateFile(file);
      setTemplateFileName(file.name);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Template File</Label>
      <div className="flex items-center space-x-4">
        {templateFileName && (
          <div className="flex-1 p-2 border rounded-md bg-muted">
            <div className="flex items-center justify-between">
              <span className="truncate text-sm">{templateFileName}</span>
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => {
                  setTemplateFileName('');
                  setTemplateFile(null);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
        <div>
          <Label 
            htmlFor="templateFile" 
            className="cursor-pointer flex items-center gap-2 p-2 border rounded-md bg-muted hover:bg-muted/80"
          >
            <Upload className="h-4 w-4" />
            <span>{templateFileName ? 'Change File' : 'Upload File'}</span>
          </Label>
          <Input 
            id="templateFile"
            type="file" 
            onChange={handleTemplateFileChange} 
            accept=".pdf,.pptx,.doc,.docx,.xls,.xlsx"
            className="hidden" 
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
