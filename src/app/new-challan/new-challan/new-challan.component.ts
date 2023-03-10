import { Component, OnInit } from '@angular/core';
import { IMyDpOptions,IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidationErrors  } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';

@Component({
  selector: 'app-new-challan',
  templateUrl: './new-challan.component.html',
  styleUrls: ['./new-challan.component.css']
})
export class NewChallanComponent implements OnInit {



  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn:false
  };
  bills:any=[];
  error;
  valid;
  placeholder='dd-mm-yyyy';
  myform: FormGroup;
  challan_no;
  items = [];
  billti_array = [];
  max_item = 35;
  temp;
  katt;

  constructor(private fb: FormBuilder,private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.getChallan();
   }

  ngOnInit() {
    this.myform =  this.fb.group({
      truck_no       : ['', Validators.compose([Validators.required])],
      driver_name    : [''],
      challan_no     : ['', Validators.compose([Validators.required])],
      date           : ['', Validators.compose([Validators.required])],
      from           : ['', Validators.compose([Validators.required])],
      to             : ['', Validators.compose([Validators.required])],
      dly_comm       : ['00.00'],
      drv_comm       : ['00.00'],
      dlv_add        : [''],
    });
  }

  getChallan(){
    this.emp.getChallanNo().subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
           this.challan_no = result.challan_no;
           console.log(this.challan_no);
           this.myform.controls['challan_no'].setValue(parseInt(this.challan_no)+1);
           this.spinnerService.hide();
          }else{
            this.spinnerService.hide();
            this.error = result.message;
            console.log(this.error);
             this.getChallan();
          }
        }
    )
  }

  save(){
    console.log(this.katt);
    document.getElementById("closeModalButton").click();
    this.emp.saveBilltiKatt(this.katt,this.temp).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          }else{
            this.spinnerService.hide();
            
          }
        }
    )

  }

  openModal() {
    document.getElementById("openModalButton").click();
  }

  onItemAdded(event){
    let destination = this.myform.get('to').value;
    console.log(destination);
    if(destination){
      this.emp.checkValidBillti(event.value,destination).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status == true ){
              this.billti_array.push(event.value);
              this.max_item = 35 - this.billti_array.length;
              this.spinnerService.hide();
              this.temp = event.value;
              this.openModal();
            }else{
              this.spinnerService.hide();
              //this.error = result.message;
              alert(result.message);
              const index = this.items.indexOf(event);
              if (index > -1) {
                this.items.splice(index, 1);
              }
            }
          }
      )
    }else{
      const index = this.items.indexOf(event);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      alert('Enter Destination');
    }
  }

  onItemRemoved(event){
    const index = this.billti_array.indexOf(event.value);
    if (index > -1) {
      this.billti_array.splice(index, 1);
      this.max_item = 35 - this.billti_array.length;
    }
   
  }

  onSubmit(): void { 
    if(this.billti_array.length>0){
      console.log(this.myform.value);
      this.spinnerService.show();
      this.emp.addNewChallan(this.myform.value,this.billti_array).subscribe(
      // this.emp.addNewChallan(this.myform.value).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status == true ){
            this.router.navigateByUrl('/print-challan/'+result.id);
            this.spinnerService.hide();
            }else{
              this.error = result.message;
              console.log(this.error);
              this.spinnerService.hide();
            }
          }
      )
    }else{
      alert('Enter Billti No');
    }
    
  
 }

  

}
