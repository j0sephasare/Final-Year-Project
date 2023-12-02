import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ExercisesPage } from './exercises/exercises.page';
import { ProfilePage } from './profile/profile.page';
import { ChatbotPage } from './chatbot/chatbot.page';
import { WeightworkoutsPage } from './weightworkouts/weightworkouts.page';
import { ExercisesListPage} from '../app/exercises-list/exercises-list.page';
import { MicroServiceLoginPage } from './micro-service-login/micro-service-login.page';
import { SavedExercisesComponent } from './saved-exercise/saved-exercise.component';
import { SavedExerciseListPage } from './saved-exercise-list/saved-exercise-list.page';
import { LocalgymsPage } from './localgyms/localgyms.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  },
  { path: 'chatbot', component: ChatbotPage },
  { path: 'saved-exercises', component: SavedExerciseListPage },
  {path: 'MicroServiceLoginPage', component: MicroServiceLoginPage},
  {path: 'local-gyms', component: LocalgymsPage},
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
  {
    path: 'micro-service-login',
    loadChildren: () => import('./micro-service-login/micro-service-login.module').then( m => m.MicroServiceLoginPageModule)
  },
  {
    path: 'profile-page-exercises',
    loadChildren: () => import('./profile-page-exercises/profile-page-exercises.module').then( m => m.ProfilePageExercisesPageModule)
  },
  {
    path: 'saved-exercise-list',
    loadChildren: () => import('./saved-exercise-list/saved-exercise-list.module').then( m => m.SavedExerciseListPageModule)
  },
 
  {
    path: 'localgyms',
    loadChildren: () => import('./localgyms/localgyms.module').then( m => m.LocalgymsPageModule)
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
