import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogsComponent} from './blogs/component/blogs/blogs.component';
import {PostsComponent} from './blogs/component/posts/posts.component';
import {HomeComponent} from './blogs/component/home/home.component';
import {BlogComponent} from './blogs/component/blog/blog.component';
import {StarsComponent} from './blogs/component/stars/stars.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'me/stars',
        component: StarsComponent
    },
    {
        path: 'blogs',
        component: BlogsComponent
    },
    {
        path: 'posts',
        component: PostsComponent
    },
    {
        path: 'blog/:id',
        component: BlogComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
