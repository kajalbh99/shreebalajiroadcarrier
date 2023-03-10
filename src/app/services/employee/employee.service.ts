import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import * as myGlobals from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: Http) { }

  allBills(pageNo){
    let data = new URLSearchParams();
    data.append('page',pageNo);
    return this.http.post(myGlobals.api_base_url+'all-bills?page='+pageNo, data);
  }

  allChallans(pageNo){
    let data = new URLSearchParams();
    data.append('page',pageNo);
    return this.http.post(myGlobals.api_base_url+'all-challans?page='+pageNo, data);
  }

  allReceipts(pageNo){
    let data = new URLSearchParams();
    data.append('page',pageNo);
    return this.http.post(myGlobals.api_base_url+'all-receipts?page='+pageNo, data);
  }
  
  addNewBill(value){
    let date = value.date.date.year+'-'+value.date.date.month+'-'+value.date.date.day;
    let data = new FormData();
  	data.append('consignor',value.consignor);
    data.append('consignee',value.consignee);
    data.append('date',date);
    data.append('e_bill_no',value.e_bill_no);
    data.append('bill_no',value.bill_no);
    data.append('invoice_no',value.invoice_no);
    data.append('goods_value',value.goods_value);
    data.append('from',value.from);
    data.append('to',value.to);
    data.append('pm',value.pm);
    data.append('igst_paid',value.igst_paid);
    data.append('stationary',value.stationary);
    data.append('st_charges',value.st_charges);
    data.append('dd_charges',value.dd_charges);
    data.append('local_charges',value.local_charges);
    data.append('prev_freight',value.prev_freight);
    data.append('type',value.type);
    data.append('copy',value.copy);
    data.append('consignor_id',value.consignor_id);
    data.append('consignee_id',value.consignee_id);
    data.append('consignor_gstin',value.consignor_gstin);
    data.append('consignee_gstin',value.consignee_gstin);
    data.append('packages',JSON.stringify(value.packages)); 
    
    return this.http.post(myGlobals.api_base_url+'add-new-bill', data);
  }

  editNewBill(value,bill_id){
    let date = value.date.date.year+'-'+value.date.date.month+'-'+value.date.date.day;
    let data = new FormData();
    data.append('bill_id',bill_id);
  	data.append('consignor',value.consignor);
    data.append('consignee',value.consignee);
    data.append('date',date);
    data.append('e_bill_no',value.e_bill_no);
    data.append('bill_no',value.bill_no);
    data.append('invoice_no',value.invoice_no);
    data.append('truck_no',value.truck_no);
    data.append('goods_value',value.goods_value);
    data.append('from',value.from);
    data.append('to',value.to);
    data.append('pm',value.pm);
    data.append('igst_paid',value.igst_paid);
    data.append('stationary',value.stationary);
    data.append('st_charges',value.st_charges);
    data.append('dd_charges',value.dd_charges);
    data.append('local_charges',value.local_charges);
    data.append('prev_freight',value.prev_freight);
    data.append('type',value.type);
    data.append('copy',value.copy);
    data.append('consignor_id',value.consignor_id);
    data.append('consignee_id',value.consignee_id);
    data.append('consignor_gstin',value.consignor_gstin);
    data.append('consignee_gstin',value.consignee_gstin);
    data.append('packages',JSON.stringify(value.packages));
    return this.http.post(myGlobals.api_base_url+'edit-bill', data);
  }


  downloadBill(id){
    let data = new FormData();
    data.append('id',id);
    data.append('download','yes')
    return this.http.post(myGlobals.api_base_url+'generate-pdf',data);
  }

  getBill(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'get-bill-data',data);
  }

  getChallan(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'get-challan-data',data);
  }

  getReceipt(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'get-receipt-data',data);
  }

  getBilltiNo(){
    return this.http.get(myGlobals.api_base_url+'get-bill-no');
  }

  getChallanNo(){
    return this.http.get(myGlobals.api_base_url+'get-challan-no');
  }

  getReceiptNo(){
    return this.http.get(myGlobals.api_base_url+'get-receipt-no');
  }

  checkValidBillti(billti_no,destination){
    let data = new FormData();
    data.append('billti_no',billti_no);
    data.append('destination',destination);
    return this.http.post(myGlobals.api_base_url+'check-valid-billti',data);
  }

    addNewChallan(value,items){
    //addNewChallan(value){
    let date = value.date.date.year+'-'+value.date.date.month+'-'+value.date.date.day;
    let data = new FormData();
    data.append('date',date);
    data.append('challan_no',value.challan_no);
    data.append('truck_no',value.truck_no);
    data.append('content',value.content);
    data.append('from',value.from);
    data.append('to',value.to);
    data.append('dly_comm',value.dly_comm);
    data.append('drv_comm',value.drv_comm);
    data.append('dlv_add',value.dlv_add);
    data.append('driver_name',value.driver_name);
    data.append('billties',JSON.stringify(items)); 
    return this.http.post(myGlobals.api_base_url+'add-new-challan', data);
  }

  editChallan(value,items){
    let date = value.date.date.year+'-'+value.date.date.month+'-'+value.date.date.day;
    let data = new FormData();
    data.append('date',date);
    data.append('id',value.id);
    data.append('challan_no',value.challan_no);
    data.append('truck_no',value.truck_no);
    data.append('content',value.content);
    data.append('from',value.from);
    data.append('to',value.to);
    data.append('dly_comm',value.dly_comm);
    data.append('drv_comm',value.drv_comm);
    data.append('dlv_add',value.dlv_add);
    data.append('driver_name',value.driver_name);
    data.append('billties',JSON.stringify(items)); 
    return this.http.post(myGlobals.api_base_url+'edit-challan', data);
  }

  addNewReceipt(value){
    let date = value.date.date.year+'-'+value.date.date.month+'-'+value.date.date.day;
    let data = new FormData();
    data.append('receipt_no',value.receipt_no);
    data.append('receipt_date',date);
    data.append('received_from',value.received_from);
    data.append('gr_no',value.gr_no);
    data.append('pkgs',value.pkgs);
    data.append('packing',value.packing);
    data.append('station_from',value.station_from); 
    data.append('private_mark',value.private_mark); 
    data.append('frieght',value.frieght); 
    data.append('hamali',value.hamali); 
    data.append('d_charges',value.d_charges); 
    data.append('demmurage',value.demmurage); 
    data.append('cf_charges',value.cf_charges); 
    data.append('gst',value.gst); 
    data.append('total',value.total); 
    data.append('rupees',value.rupees); 
    return this.http.post(myGlobals.api_base_url+'add-receipt', data);
  }

  searchConsignor(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-consignor',data);
  }

  searchConsignee(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-consignee',data);
  }

  searchEmployee(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-employee',data);
  }

  searchBill(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-bill',data);
  }

  searchChallan(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-challan',data);
  }

  searchReceipt(term){
    let data = new FormData();
    data.append('term',term);
    return this.http.post(myGlobals.api_base_url+'search-receipt',data);
  }

  getRecordsMonthly(destination,month,year){
    let data = new FormData();
    data.append('destination',destination);
    data.append('month',month);
    data.append('year',year);
    return this.http.post(myGlobals.api_base_url+'get-monthly-records',data);
  }

  getRecordsYearly(destination,year){
    let data = new FormData();
    data.append('destination',destination);
    data.append('year',year);
    return this.http.post(myGlobals.api_base_url+'get-yearly-records',data);
  }

  getRecordsYearToYear(destination,startYear,endYear){
    let data = new FormData();
    data.append('destination',destination);
    data.append('startYear',startYear);
    data.append('endYear',endYear);
    return this.http.post(myGlobals.api_base_url+'get-year-to-year-records',data);
  }

  deleteBill(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'delete-bill', data);
  }

  deleteChallan(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'delete-challan', data);
  }

  deletePackage(id){
    let data = new FormData();
    data.append('id',id);
    return this.http.post(myGlobals.api_base_url+'delete-package', data);
  }

  removeBillti(bill_no,challan_no){
    let data = new FormData();
    data.append('bill_no',bill_no);
    data.append('challan_no',challan_no);
    return this.http.post(myGlobals.api_base_url+'remove-billti', data);
  }

  saveBilltiKatt(katt,billti){
    let data  = new FormData();
    data.append('katt',katt);
    data.append('billti',billti);
    return this.http.post(myGlobals.api_base_url+'add-katt-value', data);
  }

  
}
