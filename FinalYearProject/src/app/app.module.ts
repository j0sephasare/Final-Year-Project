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





@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,AuthModule.forRoot({
    domain:'dev-mejvcseurlxwqamz.us.auth0.com',
    clientId:'USCIpDB8QbzVkN5khAGOKs28xpCg7A3E',
    authorizationParams:{
      redirect_uri:window.location.origin
    }

})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    TimerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
