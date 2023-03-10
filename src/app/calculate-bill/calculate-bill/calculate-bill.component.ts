import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EmployeeService } from '../../services/employee/employee.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-calculate-bill',
  templateUrl: './calculate-bill.component.html',
  styleUrls: ['./calculate-bill.component.css']
})
export class CalculateBillComponent implements OnInit {

  selectedYearAsText: string;
  selectedMonthIndex: number;
  selectedMonthAsText: string;
  public showCalender:boolean=false;
  destination = '';
  monthyear='';
  startYear = '';
  endYear = '';
  year='';
  active = 1;
  error;
  total_freight = 0;
  paid_frieght;

  constructor(private emp: EmployeeService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  onChange(event: { monthIndex: number, year: number }) {
    console.log('onChange');
    this.toggle();
    this.selectedYearAsText = event.year.toString();
    this.selectedMonthIndex = event.monthIndex+1;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');
    this.monthyear = this.selectedMonthAsText + ', ' + this.selectedYearAsText;
    console.warn(this.selectedYearAsText, this.selectedMonthAsText, `(month index: ${this.selectedMonthIndex})`);
  }

  toggle(){
     this.showCalender = !this.showCalender;    
   }

   switch(value){
    this.total_freight = 0;
    this.showCalender = false;
     this.active = value;
   }

   onSubmit(value){
     if(value == 1){
      if(this.destination == '' || this.monthyear == ''){
        alert("Enter all Fields");
        return false;
      }
      this.submitFirstForm(value);
     }else if(value == 2){
      if(this.destination == '' || this.year == ''){
        alert("Enter all Fields");
        return false;
      }
      this.submitSecondForm(value);
     }else{
      if(this.destination == '' || this.startYear == '' || this.endYear == ''){
        alert("Enter all Fields");
        return false;
      }
      this.submitthirdForm(value);
     }
   }

   submitFirstForm(value){
    this.spinnerService.show();
    this.emp.getRecordsMonthly(this.destination,this.selectedMonthIndex,this.selectedYearAsText).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.total_freight = parseInt(result.total);
          this.spinnerService.hide();
          }else{
            alert(result.message);
            this.error = result.message;
            this.spinnerService.hide();
          }
        }
    )
   }

   submitSecondForm(value){
    this.spinnerService.show();
    this.emp.getRecordsYearly(this.destination,this.year).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.total_freight = parseInt(result.total);
          this.spinnerService.hide();
          }else{
            alert(result.message);
            this.error = result.message;
            this.spinnerService.hide();
          }
        }
    )
   }

   submitthirdForm(value){
    this.spinnerService.show();
    this.emp.getRecordsYearToYear(this.destination,this.startYear,this.endYear).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          this.total_freight = parseInt(result.total);
          this.spinnerService.hide();
          }else{
            alert(result.message);
            this.error = result.message;
            this.spinnerService.hide();
          }
        }
    )
   }

}
