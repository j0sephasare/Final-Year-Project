import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ExercisesPage } from './exercises/exercises.page';
import { ProfilePage } from './profile/profile.page';
import { ChatbotPage } from './chatbot/chatbot.page';
import { WeightworkoutsPage } from './weightworkouts/weightworkouts.page';
import { ExercisesListPage} from '../app/exercises-list/exercises-list.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  },
  { path: 'chatbot', component: ChatbotPage },
  { path: 'profile', component: ProfilePage },
  { path: 'exercises', component: ExercisesPage },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule) },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
 
  { path: 'weight-workouts', component: WeightworkoutsPage },
  { path: 'exercise-list', component: ExercisesListPage }, // Add this line
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'exercises',
    loadChildren: () => import('./exercises/exercises.module').then( m => m.ExercisesPageModule)
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'weightworkouts',
    loadChildren: () => import('./weightworkouts/weightworkouts.module').then( m => m.WeightworkoutsPageModule)
  },
  {
    path: 'exercises-list',
    loadChildren: () => import('./exercises-list/exercises-list.module').then( m => m.ExercisesListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
