import {Blog} from './blog';

class Category {
    id: number;
    name: string;
}

export class Post {
    id: number;
    title: string;
    summary: string;
    stars: number;
    date: Date;
    url: string;
    starred?: boolean;
    category: Category;
    blog: Blog;
}
