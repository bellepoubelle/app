import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
//import { TabsPage } from '../pages/tabs/tabs';
import { PrivacyPage } from '../pages/privacy/privacy';
import { LegalPage } from '../pages/legal/legal';
import { AboutPage} from '../pages/about/about';
import { PostDetailPage} from "../pages/post-detail/post-detail";
import { PostDetailEditPage} from "../pages/post-detail-edit/post-detail-edit";
import { PostDetailNewPage} from "../pages/post-detail-new/post-detail-new";
import { PostListPage} from "../pages/post-list/post-list";
import { AlertListPage} from "../pages/alert-list/alert-list";
import { AlertVotingPage} from "../pages/alert-voting/alert-voting";
import { AlertDetailPage} from "../pages/alert-detail/alert-detail";
import { PoubelleReportPage} from "../pages/poubelle-report/poubelle-report";
import { PoubelleScannerPage} from "../pages/poubelle-scanner/poubelle-scanner";

import { PoubelleMapPage} from '../pages/poubelle-map/poubelle-map';

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

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class BellePoubelleApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  appPages: PageInterface[] = [
    { title: 'POUBELLES', name: 'PoubelleMapPage', component: PoubelleMapPage, icon: 'trash' },
    { title: 'SCANNER', name: 'PoubelleScannerPage', component: PoubelleScannerPage, icon: 'qr-scanner' },
    //{ title: 'STATISTICS', name: 'PoubelleMapPage', component: PoubelleMapPage, icon: 'pulse' },
    //{ title: 'ALERTS', name: 'AlertListPage', component: AlertListPage, icon: 'alert' },
    //{ title: 'POSTS', name: 'PostListPage', component: PostListPage, icon: 'book' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'ACCOUNT', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'VOTING', name: 'AlertVotingPage', component: AlertVotingPage, icon: 'heart' },
    { title: 'ABOUT', name: 'AboutPage', component: AboutPage, icon: 'information-circle' }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'LOGIN', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'SIGNUP', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  footerPages: PageInterface[] = [
    { title: 'LEGAL', name: 'LegalPage', component: LegalPage, icon: 'information-circle' },
    { title: 'PRIVACY', name: 'PrivacyPage', component: PrivacyPage, icon: 'analytics' }
  ];
  
  rootPage: any;
  
  translate: TranslateService;

  constructor(
    public events: Events,
    public api: API,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen,
    public translateService: TranslateService,
    public accountService: AccountService,
    public addressService: AddressService,
    public alertService: AlertService,
    public categoryService: CategoryService,
    public imageService: ImageService,
    public operatorService: OperatorService,
    public poubelleService: PoubelleService,
    public sensorService: SensorService,
    public postService: PostService
  ) {
    translateService.setDefaultLang('en');
    this.translate = translateService;

    this.rootPage = PoubelleMapPage;
    this.platformReady();

    // decide which menu items should be hidden by current login status stored in local storage
    this.accountService.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);      
    });
  
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);;
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.accountService.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('account:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('account:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('account:logout', () => {
      this.nav.setRoot(LoginPage);
      this.enableMenu(false);
    });
  }
  
  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.addChartJS();
    });
  }
  
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
  
  addChartJS() {
    let body = document.getElementsByTagName('body')[0];
    let bundlejs = document.createElement('script');
    bundlejs.setAttribute('src', 'assets/node_modules/chart.js/dist/Chart.bundle.js');
    body.appendChild(bundlejs);
    let chartjs = document.createElement('script');
    chartjs.setAttribute('src', 'assets/node_modules/chart.js/dist/Chart.js');
    body.appendChild(chartjs);
  }
  
}
