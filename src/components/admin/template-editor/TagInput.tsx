
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {tag}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 rounded-full"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Add a tag" 
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
        </div>
        <Button 
          type="button" 
          size="icon" 
          onClick={handleAddTag}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TagInput;
