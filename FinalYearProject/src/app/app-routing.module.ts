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
import { ChallengesPage } from './challenges/challenges.page';
import { MealPlanPage } from './meal-plan/meal-plan.page';
import { RonaldoPage } from './ronaldo/ronaldo.page';
import { MealsPage } from './meals/meals.page';
import { ImageuploadPage } from './imageupload/imageupload.page';
import { MacroCounterPage } from './macro-counter/macro-counter.page';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  },
  { path: 'chatbot', component: ChatbotPage },
  { path: 'mealPlan', component: MealPlanPage },
  { path: 'macroCounter', component: MacroCounterPage },
  { path: 'mealPlanner', component: MealsPage },
  { path: 'challenges', component: ChallengesPage },
  {path: 'image-upload', component:ImageuploadPage},
  { path: 'ronaldo', component: RonaldoPage },
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
  {
    path: 'challenges',
    loadChildren: () => import('./challenges/challenges.module').then( m => m.ChallengesPageModule)
  },
  {
    path: 'meal-plan',
    loadChildren: () => import('./meal-plan/meal-plan.module').then( m => m.MealPlanPageModule)
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
    path: 'imageupload',
    loadChildren: () => import('./imageupload/imageupload.module').then( m => m.ImageuploadPageModule)
  },
  {
    path: 'macro-counter',
    loadChildren: () => import('./macro-counter/macro-counter.module').then( m => m.MacroCounterPageModule)
  },  {
    path: 'boxing-exercises',
    loadChildren: () => import('./boxing-exercises/boxing-exercises.module').then( m => m.BoxingExercisesPageModule)
  },
  {
    path: 'boxing-workout',
    loadChildren: () => import('./boxing-workout/boxing-workout.module').then( m => m.BoxingWorkoutPageModule)
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
