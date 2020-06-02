import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DashboardComponent} from './dashboard/dashboard.component'

const appRoute: Routes = [
    {
        path: '',
        redirectTo: 'dashboard', 
        pathMatch: 'full'
    },
    {
        path: 'dashboard', 
        component: DashboardComponent
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }
]

@NgModule({
    declarations:[DashboardComponent],
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
