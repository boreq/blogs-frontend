import {Blog} from './blog';
import {Category} from './category';
import {Tag} from './tag';

export class Post {
    id: number;
    title: string;
    summary: string;
    stars: number;
    date: Date;
    url: string;
    starred?: boolean;
    category: Category;
    tags: Tag[];
    blog: Blog;
}
