import { PoubelleReportPage } from "../poubelle-report/poubelle-report";
import { PostListPage } from "../post-list/post-list";
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { PoubelleMapPage } from '../poubelle-map/poubelle-map';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root: any = PoubelleMapPage;
  tab1Root: any = PoubelleMapPage;
  tab2Root: any = PoubelleReportPage;
  tab3Root: any = PostListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams, translate: TranslateService) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
