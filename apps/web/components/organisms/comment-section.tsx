'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

export function CommentSection({ comments, onAddComment, currentUser }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div>
      <h2 className="text-base font-medium mb-4">Comments</h2>
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-sm text-muted-foreground">{format(new Date(comment.createdAt), 'dd/MM/yyyy, HH:mm')}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          <Avatar className="h-8 w-8">
            {currentUser?.avatar ? (
              <AvatarImage src={currentUser.avatar} />
            ) : (
              <AvatarFallback>{currentUser?.name?.[0] ?? <User className="h-4 w-4" />}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2 resize-none"
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment}>Post</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
