import { Component, OnInit } from '@angular/core';
import { IMyDpOptions,IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidationErrors  } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-new-receipt',
  templateUrl: './new-receipt.component.html',
  styleUrls: ['./new-receipt.component.css']
})
export class NewReceiptComponent implements OnInit {

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn:false
  };
  bills:any=[];
  error;
  valid;
  placeholder='dd-mm-yyyy';
  myform: FormGroup;
  receipt_no;
  total = 0;

 
  constructor(private fb: FormBuilder,private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.getReceipt();
   }

   ngOnInit() {
    this.myform =  this.fb.group({
      received_from  : [''],
      receipt_no     : ['', Validators.compose([Validators.required])],
      date           : ['', Validators.compose([Validators.required])],
      gr_no          : [''],
      pkgs           : [''],
      packing        : [''],
      station_from   : [''],
      private_mark   : [''],
      frieght        : [''],
      hamali         : [''],
      d_charges      : [''],
      demmurage      : [''],
      cf_charges     : [''],
      gst            : [''],
      total          : [''],
      rupees         : [''],
    });
  }

  getReceipt(){
    this.emp.getReceiptNo().subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
           this.receipt_no = result.receipt_no;
           console.log(this.receipt_no);
           this.myform.controls['receipt_no'].setValue(parseInt(this.receipt_no)+1);
           this.spinnerService.hide();
          }else{
            this.spinnerService.hide();
            this.error = result.message;
            console.log(this.error);
             this.getReceipt();
          }
        }
    )
  }

  onSubmit(): void { 
    console.log(this.myform.value);
    this.total = 0;
    this.total = this.total+ (this.myform.controls['frieght'].value ? parseInt(this.myform.controls['frieght'].value) : 0 );
    this.total = this.total+ (this.myform.controls['hamali'].value ? parseInt(this.myform.controls['hamali'].value) : 0 );
    this.total = this.total+ (this.myform.controls['d_charges'].value ? parseInt(this.myform.controls['d_charges'].value) : 0 );
    this.total = this.total+ (this.myform.controls['demmurage'].value ? parseInt(this.myform.controls['demmurage'].value) : 0 );
    this.total = this.total+ (this.myform.controls['cf_charges'].value ? parseInt(this.myform.controls['cf_charges'].value) : 0 );

    this.myform.controls['total'].setValue(this.total);
    this.myform.controls['rupees'].setValue(this.total);
    this.spinnerService.show();
    
    this.emp.addNewReceipt(this.myform.value).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.router.navigateByUrl('/print-receipt/'+result.id);
          this.spinnerService.hide();
          }else{
            this.error = result.message;
            console.log(this.error);
            this.spinnerService.hide();
          }
        }
    )
  
 }

}
