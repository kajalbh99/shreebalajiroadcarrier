import { Component, OnInit } from '@angular/core';
import { IMyDpOptions,IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidationErrors  } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit-challan',
  templateUrl: './edit-challan.component.html',
  styleUrls: ['./edit-challan.component.css']
})
export class EditChallanComponent implements OnInit {

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
  id;
  model;

  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['challan_id'];
    });
   }

  ngOnInit() {
    this.myform =  this.fb.group({
      id             : ['', Validators.compose([Validators.required])],
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
    this.getChallanData();
  }

  getChallanData(){
    this.emp.getChallan(this.id).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){          
           this.challan_no = result.challan.challan_no;
           this.setOldValues(result.challan);
           this.spinnerService.hide();
          }else{
            this.spinnerService.hide();
            this.error = result.message;
            console.log(this.error);
             this.getChallanData();
          }
        }
    )
  }

  setOldValues(challan){
    this.myform.controls['id'].setValue(challan.id);
    this.myform.controls['challan_no'].setValue(challan.challan_no);
    this.myform.controls['truck_no'].setValue(challan.truck_no);
    this.myform.controls['from'].setValue(challan.from_place);
    this.myform.controls['to'].setValue(challan.to_place);
    this.myform.controls['dly_comm'].setValue(challan.dly_comm);
    this.myform.controls['drv_comm'].setValue(challan.drv_comm);
    this.myform.controls['dlv_add'].setValue(challan.dlv_add);
    this.myform.controls['driver_name'].setValue(challan.driver_name);
    let Sdate = challan.date.substring(8, 10);
    let Smonth = challan.date.substring(5, 7);
    this.model = { date: { year: challan.date.substring(0, 4), month: parseInt(Smonth), day: parseInt(Sdate) } };
    console.log(this.model);
    challan.bills.forEach(element => {
      this.items.push({"display": element.bill_no,"value": element.bill_no});
      this.billti_array.push(element.bill_no);
      this.max_item = 35 - this.billti_array.length;
    });
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
      var r = confirm("Do You Want To Remove This Billti!");
      if (r == true) {
        this.spinnerService.show();
        this.emp.removeBillti(event.value,this.challan_no).subscribe(
          data =>{
            let result = data.json(); 
            if(result.status){
              alert('Billti Removed from challan')
              this.spinnerService.hide();
              const index = this.billti_array.indexOf(event.value);
              if (index > -1) {
                this.billti_array.splice(index, 1);
                this.max_item = 35 - this.billti_array.length;
              }
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

  onSubmit(): void { 
    if(this.billti_array.length>0){
      this.spinnerService.show();
      this.emp.editChallan(this.myform.value,this.billti_array).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status == true ){
            alert('Challan Successfully Edited!');
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
