import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrintChallanComponent } from './print-challan/print-challan.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'PrintChallan',
    urls: [{title: 'PrintChallan', url: '/print-challan'}, {title: 'PrintChallan'}]
  },
  component: PrintChallanComponent
}];

@NgModule({
  declarations: [PrintChallanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PrintChallanModule { }
