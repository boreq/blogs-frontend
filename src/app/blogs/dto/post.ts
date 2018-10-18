import {Blog} from './blog';
import {Category} from './category';

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
