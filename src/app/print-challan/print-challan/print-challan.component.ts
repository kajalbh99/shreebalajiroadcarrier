import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-challan',
  templateUrl: './print-challan.component.html',
  styleUrls: ['./print-challan.component.css']
})
export class PrintChallanComponent implements OnInit {
  id;
  challan;
  error;
  bills=[];
  tb;
  dummy = {
            bill_no: "",
            challan_no: "",
            consignee: "",
            consignor: "",
            consignee_gstin: "",
            content : "",
            created_at: "",
            dd_charges : "",
            date: "",
            e_bill_no: "",
            final_paid_freight: "",
            from_place: "",
            goods_value: "",
            hsn_code: "",
            id: "",
            igst_paid: "",
            katt: "",
            local_charges: "",
            pkg_qty: "",
            pm: "",
            prev_freight: "",
            sent: "",
            st_charges: "",
            stationary_charges: "",
            to_place: "",
            total_freight: "",
            truck_no: "",
            type: "",
            updated_at: "",
            weight: ""
          };
  total_items = 35;
  loop=0;

  constructor(private activatedRoute: ActivatedRoute,private emp: EmployeeService,private router: Router) { 
  	this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['challan_id'];
    });
  }

  ngOnInit() {
    this.getPrintableChallan();
  }

  getPrintableChallan(){
    this.emp.getChallan(this.id).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status == true ){
          console.log(result.challan);
          this.tb = result.challan.bills.length;
          this.challan = result.challan;
          this.bills = result.challan.bills;
          this.loop = this.total_items-this.bills.length;
          for (let index = 0; index < this.loop; index++) {
            this.bills.push(this.dummy);
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
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
     var imgWidth = pdf.internal.pageSize.getWidth();
      var pageHeight = 350;    
      //var imgHeight = canvas.height * imgWidth / canvas.width;  // comment for full page
      //var heightLeft = imgHeight;  
      
      let pdfName = 'challan.pdf';
      if(this.challan.challan_no){
        pdfName = 'challan'+this.challan.challan_no+'.pdf';
      }
      
      const contentDataURL = canvas.toDataURL('image/png')  
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      //var imgWidth = pdf.internal.pageSize.getWidth();
      var imgHeight = pdf.internal.pageSize.getHeight();  //uncomment for full page
      var position = 2;  
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)  
      pdf.save(pdfName); // Generated PDF   
    });  
  }

}
