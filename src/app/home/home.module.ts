/*
  Home feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '.';
import { DashBoardComponent } from '../dash-board/dash-board.component';

import { RouterModule, Routes } from '@angular/router';

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [
    HomeComponent,
    DashBoardComponent
  ]
})
export class HomeModule { }
