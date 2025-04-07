
import React from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  imagePreview: string;
  setImagePreview: (preview: string) => void;
  setImageFile: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imagePreview, 
  setImagePreview, 
  setImageFile 
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Cover Image</Label>
      <div className="flex items-center space-x-4">
        {imagePreview && (
          <div className="relative w-32 h-32 overflow-hidden rounded-md">
            <img 
              src={imagePreview} 
              alt="Cover preview" 
              className="object-cover w-full h-full" 
            />
            <Button 
              type="button"
              variant="destructive" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => {
                setImagePreview('');
                setImageFile(null);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div>
          <Label 
            htmlFor="image" 
            className="cursor-pointer flex items-center gap-2 p-2 border rounded-md bg-muted hover:bg-muted/80"
          >
            <Upload className="h-4 w-4" />
            <span>{imagePreview ? 'Change Image' : 'Upload Image'}</span>
          </Label>
          <Input 
            id="image"
            type="file" 
            onChange={handleImageChange} 
            accept="image/*"
            className="hidden" 
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
