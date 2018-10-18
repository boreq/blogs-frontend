import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogsComponent} from './blogs/component/blogs/blogs.component';
import {PostsComponent} from './blogs/component/posts/posts.component';

const routes: Routes = [
    {
        path: 'blogs',
        component: BlogsComponent
    },
    {
        path: 'posts',
        component: PostsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
