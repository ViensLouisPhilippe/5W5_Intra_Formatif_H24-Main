import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { guardGuard } from './guard.guard';
import { animalPreferenceGuard } from './animal-preference.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent,canActivate:[guardGuard, animalPreferenceGuard] },
  { path: 'dog', component: DogComponent,canActivate:[guardGuard] },
  { path: 'home', component: HomeComponent,canActivate:[guardGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
