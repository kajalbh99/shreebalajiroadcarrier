import { Component, OnInit } from '@angular/core';
import { IMyDpOptions,IMyDateModel } from 'mydatepicker';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn:false
  };
  id;
  bill:any=[];
  error;
  valid;
  placeholder='dd-mm-yyyy';
  total_payment = 0;
  total_paid = 0;
  remaining = 0;
  freight = 0;

  constructor(private activatedRoute: ActivatedRoute,private emp: EmployeeService,private router: Router, private sanitizer: DomSanitizer) { 
  	this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['bill_id'];
    });
  }

  ngOnInit() {
    this.getData();
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    console.log(event);
    this.valid = event.formatted;
}

  getData(){
    this.emp.getBill(this.id).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          console.log(result.bills);
          this.bill = result.bills;
          if(this.bill.packages){
            this.bill.packages.forEach(element => {
              this.freight = this.freight+element.rate;
              this.total_payment = this.total_payment+element.total_freight;
              this.total_paid = this.total_paid+element.paid_freight;
              this.remaining = this.remaining+element.freight_to_pay;
            });
            this.total_payment = this.total_payment+this.bill.dd_charges+this.bill.local_charges+this.bill.prev_freight+this.bill.st_charges+this.bill.stationary_charges;
          }
          }else{
            this.error = result.message;
            console.log(this.error);
          }
        }
    )
  }

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
     // var imgWidth = 400;   
     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
     var imgWidth = pdf.internal.pageSize.getWidth();
     var imgHeight = (pdf.internal.pageSize.getHeight()/2)-5; // for single bilti also edit css
     //var imgHeight = (pdf.internal.pageSize.getHeight())-5;  // for double bilti
     console.log(imgHeight);
      var pageHeight = 350;    
     //var imgHeight = canvas.height * imgWidth / canvas.width;  // comment for full page
      var heightLeft = imgHeight;  
      
      let pdfName = 'bill.pdf';
      if(this.bill.bill_no){
        pdfName = 'bill'+this.bill.bill_no+'.pdf';
      }
      
      const contentDataURL = canvas.toDataURL('image/png')  
      
      //var imgWidth = pdf.internal.pageSize.getWidth();
      //var imgHeight = pdf.internal.pageSize.getHeight();  uncomment for full page
      var position = 1;  
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)  
      pdf.save(pdfName); // Generated PDF   
      if(this.bill.copy == "Driver"){
        this.bill.copy = "Consignee";      
      }else{
        this.bill.copy = "Driver";
      }
    
    });  

    this.emp.downloadBill(this.id).subscribe(
      data =>{
        let result = data.json(); 
        }
    )
   // window.open('http://localhost/payroll-api/generate-pdf/5','_blank');
  } 
}
