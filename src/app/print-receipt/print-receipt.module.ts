import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'PrintReceipt',
    urls: [{title: 'PrintReceipt', url: '/print-receipt'}, {title: 'PrintReceipt'}]
  },
  component: PrintReceiptComponent
}];

@NgModule({
  declarations: [PrintReceiptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PrintReceiptModule { }
