import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View0Component } from './components/view0.component';
import { View2Component } from './components/view2.component';
import { View1Component } from './components/view1.component';

const routes: Routes = [
  { path: "", component: View0Component },
  { path: "share", component: View2Component },
  { path: "news/:tag", component: View1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
