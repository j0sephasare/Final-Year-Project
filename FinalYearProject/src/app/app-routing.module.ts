import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ExercisesPage } from './exercises/exercises.page';
import { ProfilePage } from './profile/profile.page';
import { ChatbotPage } from './chatbot/chatbot.page';
import { WeightworkoutsPage } from './weightworkouts/weightworkouts.page';
import { ExercisesListPage} from '../app/exercises-list/exercises-list.page';

import { SavedExerciseListPage } from './saved-exercise-list/saved-exercise-list.page';
import { LocalgymsPage } from './localgyms/localgyms.page';
import { ChallengesPage } from './challenges/challenges.page';

import { RonaldoPage } from './ronaldo/ronaldo.page';
import { MealsPage } from './meals/meals.page';

import { MacroCounterPage } from './macro-counter/macro-counter.page';
import {
  redirectUnauthorizedTo, // Used to redirect to login screen if user is not logged in.
  redirectLoggedInTo, // Used to redirect to home screen if user is already logged in.
  canActivate, // Used to protect routes by checking if user is logged in.
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
 
    // the spread operator ... is used to expand the properties of the object returned by the canActivate function into the route configuration object.
  },
  { path: 'chatbot', component: ChatbotPage },

  { path: 'macroCounter', component: MacroCounterPage },
  { path: 'mealPlanner', component: MealsPage },
  { path: 'challenges', component: ChallengesPage },

  { path: 'ronaldo', component: RonaldoPage },
  { path: 'saved-exercises', component: SavedExerciseListPage },

  {path: 'local-gyms', component: LocalgymsPage},
  { path: 'profile', component: ProfilePage },
  { path: 'exercises', component: ExercisesPage },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  
  { path: 'weight-workouts', component: WeightworkoutsPage },
  { path: 'exercise-list', component: ExercisesListPage }, // Add this line

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
    path: 'saved-exercise-list',
    loadChildren: () => import('./saved-exercise-list/saved-exercise-list.module').then( m => m.SavedExerciseListPageModule)
  },
 
  {
    path: 'localgyms',
    loadChildren: () => import('./localgyms/localgyms.module').then( m => m.LocalgymsPageModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./challenges/challenges.module').then( m => m.ChallengesPageModule)
  },
 
  {
    path: 'ronaldo',
    loadChildren: () => import('./ronaldo/ronaldo.module').then( m => m.RonaldoPageModule)
  },
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module').then( m => m.MealsPageModule)
  },
  
  {
    path: 'macro-counter',
    loadChildren: () => import('./macro-counter/macro-counter.module').then( m => m.MacroCounterPageModule)
  },
  
  {
    path: 'finish-workout',
    loadChildren: () => import('./finish-workout/finish-workout.module').then( m => m.FinishWorkoutPageModule)
  },
  {
    path: 'go-for-run',
    loadChildren: () => import('./go-for-run/go-for-run.module').then( m => m.GoForRunPageModule)
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
