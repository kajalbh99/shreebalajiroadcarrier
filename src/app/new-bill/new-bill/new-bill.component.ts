import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidationErrors  } from '@angular/forms';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {
 
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn:false
  };
  placeholder='dd-mm-yyyy';
  myform: FormGroup;
  error;
  billti_no;
  count = 1;
  sel_consignor:any=[];
  sel_consignee=[];

  constructor(private fb: FormBuilder,private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.getBillNo();
   }

   getBillNo(){
    this.emp.getBilltiNo().subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
           this.billti_no = result.bill_no;
           console.log(this.billti_no);
           this.myform.controls['bill_no'].setValue(parseInt(this.billti_no)+1);
           this.spinnerService.hide();
          }else{
            this.spinnerService.hide();
            this.error = result.message;
            console.log(this.error);
            this.getBillNo();
          }
        }
    )
     
   }

  ngOnInit() {
    this.myform =  this.fb.group({
      consignor      : ['', Validators.compose([Validators.required])],
      consignee      : ['', Validators.compose([Validators.required])],
      consignee_gstin: ['', Validators.compose([Validators.required])],
      consignor_gstin: ['', Validators.compose([Validators.required])],
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
      type           : ['2'],
      copy           : ['Driver'],
      consignor_id   : [],
      consignee_id   : [],
      packages       : this.fb.array([
				this.initPackagesFields()
		 ])
    });
  }

  initPackagesFields(){
    return this.fb.group({
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

  addNewInputField() : void
  {
     const control = <FormArray>this.myform.controls.packages;
     control.push(this.initPackagesFields());
     this.count = this.count+1;
  }
  
  removeInputField(i : number) : void
  {
     const control = <FormArray>this.myform.controls.packages;
     control.removeAt(i);
     this.count = this.count-1;
  }


  getFormValidationErrors() {
    Object.keys(this.myform.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.myform.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  onSubmit(): void { 
    this.getFormValidationErrors();
    console.log(this.myform.value);
    this.spinnerService.show();
    this.emp.addNewBill(this.myform.value).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.router.navigateByUrl('/generate-bill/'+result.id);
          this.spinnerService.hide();
          }else{
            this.error = result.message;
            console.log(this.error);
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
  //this.myform.get('packages')['controls'][i].controls['paid_freight'].setValue(total);
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
            //this.error = result.message;
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
            //this.error = result.message;
            this.sel_consignee = [];
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
