import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  loader: any;

  constructor(platform: Platform, public loadingCtrl: LoadingController, public storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.showLoading();
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.get('introShown').then((introShown) => {
        if (introShown) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
          this.storage.set('introShown', false);
        }
      });

      this.loader.dismiss();
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  private showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    })

    this.loader.present();
  }
}
