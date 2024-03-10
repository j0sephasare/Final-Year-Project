import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { TimerService } from './timer.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExercisesListPageModule } from './exercises-list/exercises-list.module';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAhmTi_WidvwSyxqMvOlf7I_MBW8Cdb7OA",
  authDomain: "herculethes.firebaseapp.com",
  projectId: "herculethes",
  storageBucket: "herculethes.appspot.com",
  messagingSenderId: "1042521842531",
  appId: "1:1042521842531:web:5e886afb76c00dff70e956",
  measurementId: "G-G94GJB51JW"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,AuthModule.forRoot({
    domain:'dev-mejvcseurlxwqamz.us.auth0.com',
    clientId:'USCIpDB8QbzVkN5khAGOKs28xpCg7A3E',
    authorizationParams:{
      redirect_uri:'com.FinalYearProject.app://dev-mejvcseurlxwqamz.us.auth0.com/android/com.FinalYearProject.app/callback'
    }

})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    TimerService],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
