import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChartsModule } from 'ng2-charts';

import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Push } from '@ionic-native/push';

import { BellePoubelleApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AboutEditPage } from '../pages/about-edit/about-edit';
import { AccountPage } from '../pages/account/account';
import { AccountEditPage } from '../pages/account-edit/account-edit';
import { AccountPasswordPage } from '../pages/account-password/account-password';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { PrivacyPage } from '../pages/privacy/privacy';
import { LegalPage } from '../pages/legal/legal';
import { PostDetailPage} from "../pages/post-detail/post-detail";
import { PostDetailEditPage} from "../pages/post-detail-edit/post-detail-edit";
import { PostDetailNewPage} from "../pages/post-detail-new/post-detail-new";
import { PostListPage} from "../pages/post-list/post-list";
import { PoubelleMapPage } from '../pages/poubelle-map/poubelle-map';
import { AlertListPage} from "../pages/alert-list/alert-list";
import { AlertDetailPage} from "../pages/alert-detail/alert-detail";
import { AlertVotingPage } from "../pages/alert-voting/alert-voting";
import { PoubelleReportPage} from "../pages/poubelle-report/poubelle-report";
import { PoubelleScannerPage} from "../pages/poubelle-scanner/poubelle-scanner";


import { API } from '../providers/api';
import { AccountService } from '../providers/account-service';
import { AddressService } from '../providers/address-service';
import { AlertService } from '../providers/alert-service';
import { CategoryService } from '../providers/category-service';
import { ImageService } from '../providers/image-service';
import { OperatorService } from '../providers/operator-service';
import { PoubelleService } from '../providers/poubelle-service';
import { SensorService } from '../providers/sensor-service';
import { PostService } from '../providers/post-service';
import { QRScanner } from "@ionic-native/qr-scanner";




@NgModule({
  declarations: [
    BellePoubelleApp,
    AboutPage,
    AboutEditPage,
    AccountPage,
    AccountEditPage,
    AccountPasswordPage,
    LoginPage,
    SignupPage,
    TabsPage,
    PrivacyPage,
    LegalPage,
    PoubelleMapPage,
    PostDetailPage,
    PostDetailEditPage,
    PostDetailNewPage,
    PostListPage,
    AlertVotingPage,
    AlertDetailPage,
    AlertListPage,
    PoubelleReportPage,
    PoubelleScannerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwingModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    IonicModule.forRoot(BellePoubelleApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 't' },
      
        { component: PostListPage, name: 'PostList', segment: 'posts' },
        { component: PostDetailPage, name: 'PostDetail', segment: 'posts/:id' },
        { component: PostDetailEditPage, name: 'PostDetailEdit', segment: 'posts/:id/edit' },
        { component: PostDetailNewPage, name: 'PostDetailNew', segment: 'posts/new' },
      
        { component: PoubelleMapPage, name: 'PoubelleMapPage', segment: 'poubelles' },
        { component: PoubelleReportPage, name: 'PoubelleReportPage', segment: 'poubelles/:id' },
        { component: PoubelleScannerPage, name: 'PoubelleScannerPage', segment: 'scanner' },
        
        { component: AlertListPage, name: 'AlertListPage', segment: 'alerts' },
        { component: AlertDetailPage, name: 'AlertDetailPage', segment: 'alerts/:id' },
        
        { component: AlertVotingPage, name: 'AlertVotingPage', segment: 'voting' },
      
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: AboutEditPage, name: 'AboutEdit', segment: 'about/edit' },
        
        { component: LegalPage, name: 'LegalPage', segment: 'legal' },
        { component: PrivacyPage, name: 'PrivacyPage', segment: 'privacy' },
        
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: AccountEditPage, name: 'AccountEditPage', segment: 'account/edit' },
        { component: AccountPasswordPage, name: 'AccountPasswordPage', segment: 'account/changePassword' }

      ]
    }),
    IonicStorageModule.forRoot({
      name: '__bellepoubelledb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BellePoubelleApp,
    AboutPage,
    AboutEditPage,
    AccountPage,
    AccountEditPage,
    AccountPasswordPage,
    LoginPage,
    SignupPage,
    //TabsPage,
    PrivacyPage,
    LegalPage,
    PoubelleMapPage,
    PostDetailPage,
    PostDetailEditPage,
    PostDetailNewPage,
    PostListPage,
    AlertVotingPage,
    AlertDetailPage,
    AlertListPage,
    PoubelleReportPage,
    PoubelleScannerPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    File,
    Transfer,
    Camera,
    Push,
    FilePath,
    InAppBrowser,
    SplashScreen,
    Geolocation,
    QRScanner,
    API,
    AccountService,
    AddressService,
    AlertService,
    CategoryService,
    ImageService,
    OperatorService,
    PoubelleService,
    SensorService,
    PostService
  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
