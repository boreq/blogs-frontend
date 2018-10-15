import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogsComponent} from './blogs/component/blogs/blogs.component';

const routes: Routes = [
    {
        path: 'blogs',
        component: BlogsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
