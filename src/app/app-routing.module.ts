import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
	{
        path: '',
        loadChildren: './login/login.module#LoginModule',
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
    },
    {
        path: 'generate-bill/:bill_id',
        loadChildren: './card/card.module#CardModule',
        canActivate:[AuthGuard]
    },
    {
        path: 'new-bill',
        loadChildren: './new-bill/new-bill.module#NewBillModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'bills',
        loadChildren: './bills/bills.module#BillsModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'new-challan',
        loadChildren: './new-challan/new-challan.module#NewChallanModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'challans',
        loadChildren: './challan/challan.module#ChallanModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'print-challan/:challan_id',
        loadChildren: './print-challan/print-challan.module#PrintChallanModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'edit-bill/:bill_id',
        loadChildren: './edit-bill/edit-bill.module#EditBillModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'print-receipt/:receipt_id',
        loadChildren: './print-receipt/print-receipt.module#PrintReceiptModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'new-receipt',
        loadChildren: './new-receipt/new-receipt.module#NewReceiptModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'receipts',
        loadChildren: './receipts/receipts.module#ReceiptsModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'calculate-bill',
        loadChildren: './calculate-bill/calculate-bill.module#CalculateBillModule',
        canActivate:[AuthGuard]

    },
    {
        path: 'edit-challan/:challan_id',
        loadChildren: './edit-challan/edit-challan.module#EditChallanModule',
        canActivate:[AuthGuard]

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
