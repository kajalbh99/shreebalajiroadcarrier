import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  id;
  receipt=[];
  error;

  constructor(private activatedRoute: ActivatedRoute,private emp: EmployeeService,private router: Router, private sanitizer: DomSanitizer) { 
  	this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['receipt_id'];
    });
  }

  ngOnInit() {
    this.getPrintableReceipt();
  }

  public getPrintableReceipt(){
    this.emp.getReceipt(this.id).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          console.log(result.receipt);
          this.receipt = result.receipt;
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
     
     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
     var imgWidth = pdf.internal.pageSize.getWidth();
     var imgHeight = (pdf.internal.pageSize.getHeight()/2)-5;
      
      let pdfName = 'receipt.pdf';
      
      const contentDataURL = canvas.toDataURL('image/png')  
      var position = 1;  
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)  
      pdf.save(pdfName); // Generated PDF   
    });  
  } 

}
