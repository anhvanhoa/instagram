import { CroppedRect, Position } from 'react-avatar-editor';
import { User } from './auth';

export interface Posts {
    _id: string;
    author: User;
    description: string;
    contents: string[];
    comments: {
        content: string;
        time: string;
        user_id: string;
    }[];
    likes: { count: number; user_id: string[] };
    tags: string[];
}

export interface TypeImgCrop {
    fileCrop: File;
    aspect: string;
    clientSize: Position;
    serverSize: CroppedRect;
}
