import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {ListComponent} from './components/list/list.component';
import {FormComponent} from '@app/home/components/form/form.component';
import {StartAttackComponent} from '@app/home/components/start-attack/start-attack.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    FormComponent,
    ListComponent,
    StartAttackComponent
  ]
})
export class HomePageModule {
}
