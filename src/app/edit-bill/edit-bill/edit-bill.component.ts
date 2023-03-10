import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidationErrors  } from '@angular/forms';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn:false
  };
  placeholder='dd-mm-yyyy';
  myform: FormGroup;
  error;
  billti_no;
  id;
  list;
  model;
  sel_consignor:any=[];
  sel_consignee=[];
  consignorr_id;
  consigneee_id;


  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['bill_id'];
    });
   }

  ngOnInit() {
    this.myform =  this.fb.group({
      consignor      : ['', Validators.compose([Validators.required])],
      consignee      : ['', Validators.compose([Validators.required])],
      consignee_gstin: [],
      consignor_gstin: [],
      bill_no        : ['', Validators.compose([Validators.required])],
      invoice_no     : ['', Validators.compose([Validators.required])],
      e_bill_no      : [''],
      date           : ['', Validators.compose([Validators.required])],
      goods_value    : ['', Validators.compose([Validators.required])],
      from           : ['PANIPAT', Validators.compose([Validators.required])],
      to             : ['', Validators.compose([Validators.required])],
      pm             : ['',Validators.compose([Validators.required])],
      stationary     : ['20.00'],
      st_charges     : ['00.00',Validators.compose([Validators.required])],
      prev_freight   : ['00.00',Validators.compose([Validators.required])],
      dd_charges     : ['00.00',Validators.compose([Validators.required])],
      local_charges  : ['00.00',Validators.compose([Validators.required])],
      igst_paid      : [''],
      copy           : [''],
      type           : ['2'],
      consignor_id   : [],
      consignee_id   : [],
      packages       : this.fb.array([
				//this.initPackagesFields('','','','','','','','')
		 ])
    });

    this.getBillData();
  }

  getBillData(){

    this.spinnerService.show();
	  this.emp.getBill(this.id).subscribe(
	    data =>{
	      let result = data.json(); 
	      if(result.status){
          this.list =  result.bills;
          this.consignorr_id = result.consignor;
          this.consigneee_id = result.consignee;
          this.spinnerService.hide();
          console.log(this.list);
          this.initializeForm();
	        }else{
            this.list = [];
            this.spinnerService.hide();
	        }
	      }
    )
    

  }

  initializeForm(){
    this.myform =  this.fb.group({
      consignor      : [this.list.consignor, Validators.compose([Validators.required])],
      consignee      : [this.list.consignee, Validators.compose([Validators.required])],
      consignor_gstin: [this.list.consignor_gstin],
      consignee_gstin: [this.list.consignee_gstin],
      bill_no        : [this.list.bill_no, Validators.compose([Validators.required])],
      invoice_no     : [this.list.invoice_no, Validators.compose([Validators.required])],
      e_bill_no      : [this.list.e_bill_no?this.list.e_bill_no:''],
      date           : ['', Validators.compose([Validators.required])],
      goods_value    : [this.list.goods_value, Validators.compose([Validators.required])],
      from           : [this.list.from_place, Validators.compose([Validators.required])],
      to             : [this.list.to_place, Validators.compose([Validators.required])],
      pm             : [this.list.pm?this.list.pm:'',Validators.compose([Validators.required])],
      stationary     : [this.list.stationary_charges?this.list.stationary_charges:0],
      st_charges     : [this.list.st_charges,Validators.compose([Validators.required])],
      prev_freight   : [this.list.prev_freight,Validators.compose([Validators.required])],
      dd_charges     : [this.list.dd_charges,Validators.compose([Validators.required])],
      local_charges  : [this.list.local_charges,Validators.compose([Validators.required])],
      igst_paid      : [this.list.igst_paid],
      type           : [this.list.type],
      copy           : [this.list.copy],
      consignor_id   : [this.consignorr_id],
      consignee_id   : [this.consigneee_id],
       packages       : this.fb.array([
	  	// 		this.PackagesFields()
		  ])
    });
    this.PackagesFields();
    let Sdate = this.list.date.substring(8, 10);
    let Smonth = this.list.date.substring(5, 7);
    this.model = { date: { year: this.list.date.substring(0, 4), month: parseInt(Smonth), day: parseInt(Sdate) } };
    console.log(this.model);
  }

  PackagesFields(){
    this.list.packages.forEach(element => {
        this.initPackagesFields(element.id,element.pkg_qty,element.name,element.description,element.actual_weight,element.weight,element.rate,element.total_freight,element.paid_freight,element.to_pay_freight,element.HSN_code);
    })
   
  }

  

  initPackagesFields(id,pkg_qty,name,description,actual_weight,weight,rate,total_freight,paid_freight,to_pay_freight,HSN_code){

    const control = <FormArray>this.myform.controls.packages;
    control.push(this.addoldvalues(id,pkg_qty,name,description,actual_weight,weight,rate,total_freight,paid_freight,to_pay_freight,HSN_code));
  }

  addoldvalues(id,pkg_qty,name,description,actual_weight,weight,rate,total_freight,paid_freight,to_pay_freight,HSN_code):FormGroup{
     return this.fb.group({
        id              : [id],
        pkg_qty 		   : [pkg_qty, Validators.compose([Validators.required])],
        name 		       : [name],
        description    : [description, Validators.compose([Validators.required])],
        actual_weight  : [actual_weight, Validators.compose([Validators.required])],
        weight         : [weight, Validators.compose([Validators.required])],
        rate           : [rate, Validators.compose([Validators.required])],
        total_freight  : [total_freight, Validators.compose([Validators.required])],
        paid_freight   : [paid_freight],
        hsn            : [HSN_code],
       // to_pay_freight : [to_pay_freight, Validators.compose([Validators.required])]
     });
   }

  addNewInputField() : void
  {
     const control = <FormArray>this.myform.controls.packages;
     control.push(this.initNewPackagesField());
  }

  initNewPackagesField(){
    return this.fb.group({
      id             : [],
      pkg_qty 		   : ['', Validators.compose([Validators.required])],
      name 		       : [''],
      description    : ['', Validators.compose([Validators.required])],
      actual_weight  : ['', Validators.compose([Validators.required])],
      weight         : ['', Validators.compose([Validators.required])],
      rate           : ['', Validators.compose([Validators.required])],
      total_freight  : ['', Validators.compose([Validators.required])],
      paid_freight   : [''],
      hsn            : [''],
   });
  }
  
  removeInputField(i : number) : void
  {
     let pkg_id = this.myform.get('packages')['controls'][i].controls['id'].value;;
     if(pkg_id){
       this.deletePackage(pkg_id);
     }
     const control = <FormArray>this.myform.controls.packages;
     control.removeAt(i);
  }

  deletePackage(id){
    var r = confirm("Do You Want To Delete This Package!");
    if (r == true) {
      this.spinnerService.show();
      this.emp.deletePackage(id).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status){
            alert('Pacakage Deleted')
            this.spinnerService.hide();
            }else{
              alert('Try Again');
              this.spinnerService.hide();
            }
          }
      ) 
    } else {
      console.log('No');
    }
   }

  isReadOnly(){
    return this.list.truck_no ? true : false;
  }

  onSubmit(): void {
    console.log(this.myform.value);
    this.spinnerService.show();
    this.emp.editNewBill(this.myform.value,this.id).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.getBillData();
          alert(result.message);
          this.spinnerService.hide();
          }else{
            this.error = result.message;
            alert(result.message);
            this.spinnerService.hide();
          }
        }
    )
  
 }

 calF(i){
  let rate = this.myform.get('packages')['controls'][i].controls['rate'].value;
  let stationary = this.myform.controls['stationary'].value;
  let st_charges = this.myform.controls['st_charges'].value;
  let prev_freight = this.myform.controls['prev_freight'].value;
  let local_charges = this.myform.controls['local_charges'].value;
  let dd_charges = this.myform.controls['dd_charges'].value;
  //let total = parseInt(rate) + parseInt(stationary)+parseInt(st_charges)+parseInt(prev_freight)+parseInt(local_charges)+parseInt(dd_charges);
  let total = parseInt(rate);
  this.myform.get('packages')['controls'][i].controls['total_freight'].setValue(total);
 }

 FetchItemDetailsSearch(){
  let inp = this.myform.controls['consignor'].value;
  if(inp.length > 1){
    console.log(inp);
    this.emp.searchConsignor(inp).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          console.log(result);
          this.sel_consignor = result.consignor;
          }else{
            this.sel_consignor = [];
            console.log(this.error);
            
          }
        }
    )
  }
 }

 FetchItemDetailsSearch2(){
  let inp = this.myform.controls['consignee'].value;
  if(inp.length > 1){
    console.log(inp);
    this.emp.searchConsignee(inp).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          console.log(result);
          this.sel_consignee = result.consignee;
          }else{
            this.sel_consignee = [];
            //this.error = result.message;
            console.log(this.error);
            
          }
        }
    )
  }
 }

 onConsignorChange(deviceValue) {
  const result = this.sel_consignor.find( ({ id }) => id == deviceValue );
  this.myform.controls['consignor_gstin'].setValue(result.gstin);
  this.myform.controls['consignor'].setValue(result.name);
  this.sel_consignor = [];
}

onConsigneeChange(deviceValue) {
  const result = this.sel_consignee.find( ({ id }) => id == deviceValue );
  this.myform.controls['consignee_gstin'].setValue(result.gstin);
  this.myform.controls['consignee'].setValue(result.name);
  this.myform.controls['to'].setValue(result.place);
  this.sel_consignee = [];
  
}
}
