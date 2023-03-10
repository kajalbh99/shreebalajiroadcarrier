<?php



namespace App\Http\Controllers\API;





use Illuminate\Http\Request;

use App\Http\Controllers\Controller as Controller;

use App\Admin;

use App\Employee;

use App\Consignor;

use App\Consignee;

use App\Salary;

use App\Bill;

use App\Package;

use App\Challan;

use App\Receipt;

use DB;





class RegisterController extends Controller

{





	public function login( Request $request ){



		$user = $request->input('user');

		$password	= $request->input('password');



		$admin = Admin::where('name',$user)->where('password',$password)->first();

		if($admin){

			return response()->json( array('data'=>$admin->id,'status'=>true, 'message'=>'Login successfull.') );

		}else{

			return response()->json( array('status'=>false, 'message'=>'Invalid user or password.') );

		}

	}



	public function viewAllBill( Request $request){

		$page = $request->input('page');

		$bills = Bill::with('packages')->orderBy('id', 'desc')->paginate(10);

		if(count($bills)>0){

			return response()->json( array('status'=>true, 'bills'=>$bills) );

		}else{

			return response()->json( array('status'=>false, 'bills'=>$bills) );

		}

	}



	public function viewAllChallan( Request $request){

		$challans = Challan::orderBy('id', 'desc')->paginate(10);

		if(count($challans)>0){

			return response()->json( array('status'=>true, 'challans'=>$challans) );

		}else{

			return response()->json( array('status'=>false, 'challans'=>$challans) );

		}

	}



	public function viewAllReceipts( Request $request){

		$receipts = Receipt::orderBy('id', 'desc')->paginate(10);

		if(count($receipts)>0){

			return response()->json( array('status'=>true, 'receipts'=>$receipts) );

		}else{

			return response()->json( array('status'=>false, 'receipts'=>$receipts) );

		}

	}



	public function getBillData( Request $request){

		$id = $request->input('id');

		$bill = Bill::where('id',$id)->with('packages')->first();

		if($bill){

			return response()->json( array('status'=>true, 'bills'=>$bill) );

		}else{

			return response()->json( array('status'=>false, 'bills'=>$bill) );

		}

	}



	public function getReceiptData( Request $request){

		$id = $request->input('id');

		$receipt = Receipt::where('id',$id)->first();

		if($receipt){

			return response()->json( array('status'=>true, 'receipt'=>$receipt) );

		}else{

			return response()->json( array('status'=>false, 'receipt'=>$receipt) );

		}

	}



	public function getChallanData(Request $request){

		$id = $request->input('id');

		$challan = Challan::where('id',$id)->with('bills')->first();
		$final_pkg = 0;
		$final_weight = 0;
		$final_freight = 0;
		$total_paid_freight = 0;
		$total_katt = 0;
		if($challan){
			
			foreach ($challan->bills as $bill) {
				$final_paid_freight = 0;
				//$pkg = Bill::select('id')->where('id',$bill->id)->with('packages')->first();
                
				$pkg = DB::table('packages')->where('bill_id',$bill->id)->sum('pkg_qty');

				$w = DB::table('packages')->where('bill_id',$bill->id)->sum('weight');

				$frght = DB::table('packages')->where('bill_id',$bill->id)->sum('total_freight');

				$paid_freight = DB::table('packages')->where('bill_id',$bill->id)->sum('paid_freight');

				$content = Package::select('description')->where('bill_id',$bill->id)->get();

				$hsn_code = Package::select('HSN_code')->where('bill_id',$bill->id)->get();

				$katt = DB::table('bill')->where('id',$bill->id)->sum('katt');

				$final_pkg = $final_pkg + $pkg;
				$final_weight = $final_weight + $w;
				$final_freight = $final_freight + $frght; 
				$total_katt = $total_katt + $katt;
				$final_paid_freight = $final_paid_freight + $paid_freight;

                $total_paid_freight = $total_paid_freight + $paid_freight;
				
				$bill->pkg_qty = $pkg;

				$bill->weight = $w;

				$bill->total_freight = $frght;

				$bill->final_paid_freight = $final_paid_freight;

				

				//$bill->content = $content;

				foreach ($content as $key) {

					$bill->content .= $key->description;

					if(count($content)>1){

						$bill->content .= ',';

					}

				}

				foreach ($hsn_code as $key) {

					$bill->hsn_code .= $key->HSN_code;

					if(count($hsn_code)>1){

						$bill->hsn_code .= ',';

					}

				}

			}
			
			$challan->final_pkg = $final_pkg;
			$challan->final_freight = $final_freight;
			$challan->final_weight = $final_weight;
			$challan->total_katt = $total_katt;
			$challan->total_paid_freight = $total_paid_freight;

			return response()->json( array('status'=>true, 'challan'=>$challan) );

		}else{

			return response()->json( array('status'=>false, 'challan'=>$challan) );

		}



		// $challan = DB::table('challan')

		// ->join('bill', 'bill.challan_no', '=', 'challan.challan_no')

		// ->join('packages', 'packages.bill_id', '=', 'bill.id')

		// ->where('challan.id', '=', $id)

		// ->get();



		// if($challan){

		// 	return response()->json( array('status'=>true, 'challan'=>$challan) );

		// }else{

		// 	return response()->json( array('status'=>false, 'challan'=>$challan) );

		// }

	

	}



	public function getBiltiNo(Request $request){

		$bill_no = Bill::Select('bill_no')->orderBy('id', 'desc')->first();

		if($bill_no){

			return response()->json( array('status'=>true, 'bill_no'=>$bill_no->bill_no) );

		}else{

			return response()->json( array('status'=>true, 'bill_no'=>155600) );

		}

		

	}



	public function getChallanNo(Request $request){

		$challan = DB::table('challan')->orderBy('id', 'desc')->first();

		if($challan){

			return response()->json( array('status'=>true, 'challan_no'=>$challan->challan_no) );

		}else{

			return response()->json( array('status'=>true, 'challan_no'=>6600) );

		}

	}



	public function getReceiptNo(Request $request){

		$receipt = DB::table('receipt')->orderBy('id', 'desc')->first();

		if($receipt){

			return response()->json( array('status'=>true, 'receipt_no'=>$receipt->receipt_no) );

		}else{

			return response()->json( array('status'=>true, 'receipt_no'=>2400) );

		}

	}



	public function checkValidBillti(Request $request){

		$billti_no = $request->input('billti_no');
		$destination = $request->input('destination');

		$check = Bill::where('bill_no',$billti_no)->first();

		if($check){
			$check2 = Bill::where('to_place',$destination)->first();
			if($check2){
				return response()->json( array('status'=>true, 'message'=>'Valid') );
			}else{
				return response()->json( array('status'=>false, 'message'=>'Billti Not matched with Destination Place') );
			}

		}else{

			return response()->json( array('status'=>false, 'message'=>'Please check your Billti No.') );

		}



	}


	public function removeBillti(Request $request){
		$bill_no = $request->input('bill_no');
		$challan_no = $request->input('challan_no');

		$rm = Bill::where('bill_no',$bill_no)->where('challan_no',$challan_no)->first();
		if($rm){
			$rm->challan_no = NULL;
			$rm->save();
		}
		return response()->json( array('status'=>true, 'message'=>'Billti Removed.') );

	}


	public function editChallan(Request $request){

		$challan_no = $request->input('challan_no');

		$truck_no = $request->input('truck_no');

		$from = $request->input('from');

		$to = $request->input('to');

		$date = $request->input('date');

		$id = $request->input('id');

		$dly_comm = $request->input('dly_comm');
		$drv_comm = $request->input('drv_comm');
		$dlv_add = $request->input('dlv_add');
		$driver_name = $request->input('driver_name');

		$billties = json_decode($request->input('billties'));

		$challan = Challan::where('id',$id)->first();

		if(!$challan){

			return response()->json( array('status'=>false, 'message'=>'Challan Not Found') );

		}	



		$challan->challan_no = $challan_no;

		$challan->truck_no = $truck_no;

		$challan->from_place = $from;

		$challan->to_place = $to;

		$challan->date = $date;

		$challan->dly_comm = $dly_comm;
		$challan->drv_comm = $drv_comm;
		$challan->dlv_add = $dlv_add;

		$challan->driver_name = $driver_name;

		$challan->save();



		if($challan->id){

			foreach ($billties as $b) {

				$bill = Bill::where('bill_no',$b)->first();

				$bill->challan_no = $challan_no;

				$bill->save();

			}

		}

		return response()->json( array('status'=>true, 'message'=>'Challan Edited','id'=>$challan->id) );

	}


	public function addNewChallan(Request $request){

		$challan_no = $request->input('challan_no');

		$truck_no = $request->input('truck_no');

		$from = $request->input('from');

		$to = $request->input('to');

		$date = $request->input('date');
		$dly_comm = $request->input('dly_comm');
		$drv_comm = $request->input('drv_comm');
		$dlv_add = $request->input('dlv_add');
		$dlv_add = $request->input('dlv_add');
		$driver_name = $request->input('driver_name');



		// $getBillties = Bill::where('truck_no',$truck_no)

		// 					->where('sent',0)

		// 					->where('to_place',$to)

		// 					->get();



		// if(count($getBillties)==0){

		// 	return response()->json( array('status'=>false, 'message'=>'No New Billties Found') );

		// }



		// if(count($getBillties)<=35){

		// 	$challan = new Challan();

		// 	$challan->challan_no = $challan_no;

		// 	$challan->truck_no = $truck_no;

		// 	$challan->from_place = $from;

		// 	$challan->to_place = $to;

		// 	$challan->date = $date;

		// 	$challan->save();

		// 	if($challan->id){

		// 		foreach ($getBillties as $b) {

		// 			$bill = Bill::where('bill_no',$b->bill_no)->first();

		// 			$bill->challan_no = $challan_no;

		// 			$bill->sent = 1;

		// 			$bill->save();

		// 		}

		// 	}

		// }else{

		// 	$j=0;

		// 	$end = 35;

		// 	while(count($getBillties) != 0) {

		// 		$challan = new Challan();

		// 		$challan->challan_no = $challan_no+$j;

		// 		$challan->truck_no = $truck_no;

		// 		$challan->from_place = $from;

		// 		$challan->to_place = $to;

		// 		$challan->date = $date;

		// 		$challan->save();

		// 		if($challan->id){

		// 			for ($i=0; $i < $end ; $i++)

		// 			{

		// 				$bill = Bill::where('bill_no',$getBillties[$i]->bill_no)->first();

		// 				$bill->challan_no = $challan->challan_no;

		// 				$bill->sent = 1;

		// 				$bill->save();

		// 			}

		// 		}

		// 		$getBillties = Bill::where('truck_no',$truck_no)

		// 					->where('sent',0)

		// 					->where('to_place',$to)

		// 					->get();

		// 		$challan_no = $challan->challan_no;

		// 		$j=1;

		// 		$end = (count($getBillties)) > 35 ? 35 : count($getBillties);

				

		// 	}



		// }

		



		$billties = json_decode($request->input('billties'));



		$challan = Challan::where('challan_no',$challan_no)->first();

		if(!$challan){

			$challan = new Challan();

		}	



		$challan->challan_no = $challan_no;

		$challan->truck_no = $truck_no;

		$challan->from_place = $from;

		$challan->to_place = $to;

		$challan->date = $date;
		
		$challan->dly_comm = $dly_comm;
		$challan->drv_comm = $drv_comm;
		$challan->dlv_add = $dlv_add;

		$challan->driver_name = $driver_name;
		$challan->save();



		if($challan->id){

			foreach ($billties as $b) {

				$bill = Bill::where('bill_no',$b)->first();

				$bill->challan_no = $challan_no;

				$bill->save();

			}

		}



		return response()->json( array('status'=>true, 'message'=>'Challan Added','id'=>$challan->id) );



	}





	public function addReceipt(Request $request){
		
		$receipt = new Receipt();

		$receipt->receipt_date = $request->input('receipt_date');

		$receipt->receipt_no = $request->input('receipt_no');

		$receipt->received_from = $request->input('received_from')?$request->input('received_from'):NULL;

		$receipt->gr_no = $request->input('gr_no')?$request->input('gr_no'):NULL;

		$receipt->pkgs = $request->input('pkgs')?$request->input('pkgs'):NULL;

		$receipt->packing = $request->input('packing')?$request->input('packing'):NULL;

		$receipt->station_from = $request->input('station_from')?$request->input('station_from'):NULL;

		$receipt->private_mark = $request->input('private_mark')?$request->input('private_mark'):NULL;

		$receipt->frieght = $request->input('frieght')?$request->input('frieght'):NULL;

		$receipt->private_mark = $request->input('private_mark')?$request->input('private_mark'):NULL;

		$receipt->hamali = $request->input('hamali')?$request->input('hamali'):NULL;

		$receipt->d_charges = $request->input('d_charges')?$request->input('d_charges'):NULL;

		$receipt->demmurage = $request->input('demmurage')?$request->input('demmurage'):NULL;

		$receipt->cf_charges = $request->input('cf_charges')?$request->input('cf_charges'):NULL;

		$receipt->gst = $request->input('gst')?$request->input('gst'):NULL;

		$receipt->total = $request->input('total')?$request->input('total'):NULL;

		$receipt->rupees = $request->input('rupees')?$request->input('rupees'):NULL;

		$receipt->save();

		return response()->json( array('status'=>true, 'message'=>'Receipt Added.','id'=>$receipt->id) );

	}





	public function addNewBill(Request $request)

	{ 

		$consignor = $request->input('consignor');

		$consignee = $request->input('consignee');

		$date = $request->input('date');

		$copy = $request->input('copy');

		$bill_no = $request->input('bill_no');

		$invoice_no = $request->input('invoice_no');

		$truck_no = $request->input('truck_no')?$request->input('truck_no'):NULL;

		$goods_value = $request->input('goods_value');

		$from = $request->input('from');

		$consignor_gstin = $request->input('consignor_gstin');

		$consignee_gstin = $request->input('consignee_gstin');

		$to = $request->input('to');

		$pm = $request->input('pm');

		$igst_paid = $request->input('igst_paid')?$request->input('igst_paid'):0;

		$stationary = $request->input('stationary');

		$st_charges = $request->input('st_charges');

		$dd_charges = $request->input('dd_charges');

		$local_charges = $request->input('local_charges');

		$prev_freight = $request->input('prev_freight');

		$type = $request->input('type');

		$packages = json_decode($request->input('packages'));

		$e_bill_no = $request->input('e_bill_no')?$request->input('e_bill_no'):'';
		

		$bill = new Bill();


		$ins_consignor = Consignor::where('id',$request->input('consignor_id'))
		->orWhere('gstin',$request->input('$consignor_gstin'))->get();
		$ins_consignee = Consignee::where('id',$request->input('consignee_id'))->orWhere('gstin',$request->input('$consignee_gstin'))->get();


		//return response()->json( array('status'=>count($ins_consignor), 'message'=>'Added.','id'=>$bill->id) );

		if(count($ins_consignor) > 0){
			$ins_consignor = Consignor::where('id',$request->input('consignor_id'))->first();
		}else{
		    $ins_consignor = new Consignor();
		}

		$ins_consignor->name = $consignor;
		$ins_consignor->gstin = $consignor_gstin;		
		$ins_consignor->save();

		if(count($ins_consignee) > 0){
		    $ins_consignee = Consignee::where('id',$request->input('consignee_id'))->first();
			
		}else{
		    $ins_consignee = new Consignee();
		}

		$ins_consignee->name = $consignee;
		$ins_consignee->gstin = $consignee_gstin;
		$ins_consignee->place = $to;
		$ins_consignee->save();
		



		$bill->consignor = $consignor;

		$bill->consignee = $consignee;

		$bill->date = $date;

		$bill->copy = $copy;

		$bill->bill_no = $bill_no;

		$bill->invoice_no = $invoice_no;

		$bill->truck_no = $truck_no;

		$bill->e_bill_no = $e_bill_no;

		$bill->from_place = $from;

		$bill->consignee_gstin = $consignee_gstin;

		$bill->to_place = $to;

		$bill->pm = $pm;

		$bill->igst_paid = $igst_paid;

		$bill->stationary_charges = $stationary;

		$bill->goods_value = $goods_value;

		$bill->st_charges = $st_charges ;
		
		$bill->dd_charges = $dd_charges;
		
		$bill->local_charges = $local_charges ;
		
		$bill->prev_freight = $prev_freight ;

		$bill->type = $type ;

		$bill->save();



		if($bill->id){

			foreach($packages as $pkg){

				$p = new Package();

				$p->pkg_qty = $pkg->pkg_qty;

				$p->name = $pkg->name?$pkg->name:'';

				$p->description = $pkg->description;

				$p->weight = $pkg->weight;

				$p->actual_weight = $pkg->actual_weight;

				$p->rate = $pkg->rate;

				$p->bill_id = $bill->id;

				$p->HSN_code = $pkg->hsn;

				$p->total_freight = $pkg->total_freight;

				$p->paid_freight =  $pkg->paid_freight?$pkg->paid_freight:NULL;	

				//$p->to_pay_freight =  $pkg->to_pay_freight?$pkg->to_pay_freight:NULL;

				$p->save();

				if($p->id){
					//return response()->json( array('status'=>true, 'message'=>'Added.','id'=>$bill->id) );
				}else{
					$bil = Bill::findOrFail($bill->id);
					$bil->delete();
					return response()->json( array('status'=>false, 'message'=>'Not Added.') );
				}

			}
			return response()->json( array('status'=>true, 'message'=>'Added.','id'=>$bill->id) );

		}



		



	}





	public function editBill(Request $request){



		$id = $request->input('bill_id');

		$consignor = $request->input('consignor');

		$consignee = $request->input('consignee');

		$date = $request->input('date');

		$copy = $request->input('copy');

		$truck_no = $request->input('truck_no')?$request->input('truck_no'):NULL;

		$bill_no = $request->input('bill_no');

		$invoice_no = $request->input('invoice_no');

		$goods_value = $request->input('goods_value');

		$from = $request->input('from');

		$to = $request->input('to');

		$consignee_gstin = $request->input('consignee_gstin');

		$pm = $request->input('pm')?$request->input('pm'):NULL;

		$igst_paid = $request->input('igst_paid')?$request->input('igst_paid'):0;

		$stationary = $request->input('stationary');

		$st_charges = $request->input('st_charges');

		$dd_charges = $request->input('dd_charges');

		$local_charges = $request->input('local_charges');

		$prev_freight = $request->input('prev_freight');

		$type = $request->input('type');

		$packages = json_decode($request->input('packages'));

		$e_bill_no = $request->input('e_bill_no')?$request->input('e_bill_no'):NULL;
		

		$bill = Bill::where('id',$id)->first();



		if($bill){

		$bill->consignor = $consignor;

		$bill->consignee = $consignee;

		$bill->date = $date;

		$bill->copy = $copy;

		$bill->consignee_gstin = $consignee_gstin;

		$bill->bill_no = $bill_no;

		$bill->invoice_no = $invoice_no;

		$bill->e_bill_no = $e_bill_no;

		$bill->from_place = $from;

		$bill->to_place = $to;

		$bill->pm = $pm;

		$bill->igst_paid = $igst_paid;

		$bill->stationary_charges = $stationary;

		$bill->goods_value = $goods_value;

		$bill->st_charges = $st_charges ;
		
		$bill->dd_charges = $dd_charges;
		
		$bill->local_charges = $local_charges ;
		
		$bill->prev_freight = $prev_freight ;
		
		$bill->type = $type ;

		$bill->save();

		foreach($packages as $pkg){
			
			$pkg_id = $pkg->id;

			if($pkg_id){
				$p = Package::where('id',$pkg_id)->first();
			}else{
				$p = new Package();
			}		

			$p->pkg_qty = $pkg->pkg_qty;

			$p->name = $pkg->name?$pkg->name:'';

			$p->description = $pkg->description;

			$p->weight = $pkg->weight;

			$p->actual_weight = $pkg->actual_weight;

			$p->rate = $pkg->rate;

			$p->bill_id = $bill->id;

			$p->HSN_code = $pkg->hsn;
			
			$p->total_freight = $pkg->total_freight;

			$p->paid_freight =  $pkg->paid_freight?$pkg->paid_freight:NULL;	

			$p->save();

		}		
			return response()->json( array('status'=>true, 'message'=>'Bill is edited successfully!') );
		}else{

			return response()->json( array('status'=>false, 'message'=>'Something went wrong.') );

		}

	}



	

	public function searchBill(Request $request){

		$term = $request->input('term');

		$bill = Bill::where('consignor', 'LIKE', '%' . $term . '%')

					    ->orWhere('consignee', 'LIKE', '%' . $term . '%')

					    ->orWhere('bill_no', 'LIKE', '%' . $term . '%')

					    ->orWhere('challan_no', 'LIKE', '%' . $term . '%')

					    ->orWhere('to_place', 'LIKE', '%' . $term . '%')

						->orWhere('from_place', 'LIKE', '%' . $term . '%')
						
						->orWhere('pm', 'LIKE', '%' . $term . '%')

					    ->get();

		if(count($bill)>0){

			return response()->json( array('bills'=>$bill, 'status'=>true, 'message'=>'Search found!') );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No search result found.') );

		}



	}


	public function searchConsignor(Request $request){

		$term = $request->input('term');

		$consignor = Consignor::where('name', 'LIKE', '%' . $term . '%')

					    ->get();

		if(count($consignor)>0){

			return response()->json( array('consignor'=>$consignor, 'status'=>true, 'message'=>'Search found!') );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No search result found.') );

		}



	}


	public function searchConsignee(Request $request){

		$term = $request->input('term');

		$consignee = Consignee::where('name', 'LIKE', '%' . $term . '%')

					    ->get();

		if(count($consignee)>0){

			return response()->json( array('consignee'=>$consignee, 'status'=>true, 'message'=>'Search found!') );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No search result found.') );

		}



	}



	public function searchChallan(Request $request){

		$term = $request->input('term');

		$challans = Challan::where('challan_no', 'LIKE', '%' . $term . '%')

					    ->orWhere('truck_no', 'LIKE', '%' . $term . '%')

					    ->orWhere('from_place', 'LIKE', '%' . $term . '%')

					    ->orWhere('to_place', 'LIKE', '%' . $term . '%')

					    ->get();

		if(count($challans)>0){

			return response()->json( array('challans'=>$challans, 'status'=>true, 'message'=>'Search found!') );

		}else{

			$bill = Bill::select('challan_no')->where('bill_no',$term)->first();
			if($bill){
				$challan = Challan::where('challan_no',$bill->challan_no )->get();
				if(count($challan)>0){
					return response()->json( array('challans'=>$challan, 'status'=>true, 'message'=>'Search found!') );
				}
				else{
					return response()->json( array('status'=>false, 'message'=>'No search result found.') );
				}
			}else{
				return response()->json( array('status'=>false, 'message'=>'No search result found.') );
			}
			

		}



	}



	public function searchReceipt(Request $request){

		$term = $request->input('term');

		$receipts = Receipt::where('receipt_no', 'LIKE', '%' . $term . '%')

					    ->orWhere('received_from', 'LIKE', '%' . $term . '%')

					    ->orWhere('receipt_date', 'LIKE', '%' . $term . '%')

						->orWhere('gr_no', 'LIKE', '%' . $term . '%')

						->orWhere('packing', 'LIKE', '%' . $term . '%')

						->orWhere('station_from', 'LIKE', '%' . $term . '%')

						->orWhere('received_from', 'LIKE', '%' . $term . '%')

					    ->get();

		if(count($receipts)>0){

			return response()->json( array('receipts'=>$receipts, 'status'=>true, 'message'=>'Search found!') );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No search result found.') );

		}



	}



	public function uploadImage(Request $request)

	{

		

		Employee::update_profile($request);



	}



	public function getpath(Request $request){

		// Path to the project's root folder    

		echo base_path();

		echo "<br>";

		// Path to the 'app' folder    

		echo app_path();        

		echo "<br>";

		// Path to the 'public' folder    

		echo public_path();

		echo "<br>";

		// Path to the 'storage' folder    

		echo storage_path();

		echo "<br>";

		// Path to the 'storage/app' folder    

		echo storage_path('app');

		

	}



	public function getEmployeeCode(Request $request){

		$randomNumber = mt_rand(1000, 9999);

		$employeeCode = 'G4L_'.$randomNumber;

		$emp = Employee::where('employee_code', $employeeCode)->get();

		if(count($emp)>0){

			$randomNumber = mt_rand(1000, 9999);

			$employeeCode = 'G4L_'.$randomNumber;

		}

		return response()->json( array('status'=>true, 'token'=>$employeeCode) );



	}

	



	public function getSalarySheet(Request $request){

		$month =  $request->input('month');

		$year = $request->input('year');

		$emp = Salary::where('month',$month)->where('year',$year)->with('employee')->get();

		

		

		return response()->json( array('status'=>true, 'salary'=>$emp) );

		

	}



	public function getMonthlyRecords(Request $request){

		$destination =  $request->input('destination');

		$month =  $request->input('month');

		$year =  $request->input('year');

		$total_freight = 0 ;

		$paid_freight = 0;

		$bills = Bill::where('to_place',$destination)

						->whereMonth('date',$month)

						->whereYear('date', $year)

						->get();

		if($bills){

			foreach ($bills as $bill) {

				$total_freight = $total_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('total_freight');

				$paid_freight = $paid_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('paid_freight');

			}

			if($total_freight == 0){

				return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

			}

			return response()->json( array('status'=>true, 'total'=>$total_freight, 'paid_freight'=>$paid_freight) );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

		}



	}



	public function getYearlyRecords(Request $request){

		$destination =  $request->input('destination');

		$year =  $request->input('year');

		$total_freight = 0 ;

		$paid_freight = 0;

		$bills = Bill::where('to_place',$destination)

						->whereYear('date', $year)

						->get();

		if($bills){

			foreach ($bills as $bill) {

				$total_freight = $total_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('total_freight');

				$paid_freight = $paid_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('paid_freight');

			}

			if($total_freight == 0){

				return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

			}

			return response()->json( array('status'=>true, 'total'=>$total_freight, 'paid_freight'=>$paid_freight) );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

		}

		

	}



	public function getYearToYearRecords(Request $request){

		$destination =  $request->input('destination');

		$startYear =  $request->input('startYear');

		$endYear =  $request->input('endYear');

		$paid_freight = 0;

		$total_freight = 0 ;



		$bills = Bill::where('to_place',$destination)

						->whereYear('date','>=', $startYear)

						->whereYear('date','<=', $endYear)

						->get();

		if($bills){

			foreach ($bills as $bill) {

				$total_freight = $total_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('total_freight');

				$paid_freight = $paid_freight + DB::table('packages')->where('bill_id',$bill->id)->sum('paid_freight');

			}

			if($total_freight == 0){

				return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

			}

			return response()->json( array('status'=>true, 'total'=>$total_freight, 'paid_freight'=>$paid_freight) );

		}else{

			return response()->json( array('status'=>false, 'message'=>'No Records Found.') );

		}



	}

	public function deleteBill(Request $request){
		$id =  $request->input('id');
		$bill = Bill::findOrFail($id);
		
		if($bill){
			$bill->delete();
			return response()->json( array('status'=>true, 'message'=>'Billti Deleted') );
		}else{
			return response()->json( array('status'=>false, 'message'=>'billti not found') );
		}
	}

	
	public function deleteChallan(Request $request){
		$id =  $request->input('id');
		$challan = Challan::findOrFail($id);
		
		if($challan){
			$challan->delete();
			return response()->json( array('status'=>true, 'message'=>'challan Deleted') );
		}else{
			return response()->json( array('status'=>false, 'message'=>'challan not found') );
		}
	}

	public function deletePackage(Request $request){
		$id =  $request->input('id');
		$pkg = Package::findOrFail($id);
		
		if($pkg){
			$pkg->delete();
			return response()->json( array('status'=>true, 'message'=>'Package Deleted') );
		}else{
			return response()->json( array('status'=>false, 'message'=>'Package not found') );
		}
	}

	public function addKattValue(Request $request){
		$billti_no =  $request->input('billti');
		$amount =  $request->input('katt');
		$bill = Bill::where('bill_no',$billti_no)->first();

		if($bill){

			$bill->katt = $amount;
			$bill->save();
			return response()->json( array('status'=>true, 'message'=>'Katt added') );

		}	else{
			return response()->json( array('status'=>false, 'message'=>'Billti not found') );
		}
	}




    

	

}

