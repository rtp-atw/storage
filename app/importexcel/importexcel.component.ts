/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { deviceDetail } from "../products/product";

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
	const buf: ArrayBuffer = new ArrayBuffer(s.length);
	const view: Uint8Array = new Uint8Array(buf);
	for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

@Component({
	selector: 'sheetjs',//sjs-table
	template: `
	<div class="container">
    	<div class="col-md-12">
		<input type="file" (change)="onFileChange($event)" multiple="false" />
		<br>
			<div class="container">
				<table class="table table-bordered table-striped table-hover">
					<thead>
						<tr>
							<th class="text-center">Order</th>
							<th class="text-center">Serial Number</th>
							<th class="text-center">Date</th>
							<th class="text-center">Name</th>
							<th class="text-center">Detail</th>
							<th class="text-center">Location</th>
							<th class="text-center">Price/Unit</th>
							<th class="text-center">Transfer Status</th>
							<th class="text-center">Old Serial Number</th>
							<th class="text-center">Remark</th>
						</tr>
			  		</thead>
			  		<tbody>
						<tr *ngFor="let row of data">
							<td *ngFor="let val of row">
								{{val}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		<button class='btn btn-primary' (click)="uploadToFirebase(data)">Upload</button>
		<button class='btn btn-primary' (click)="backToMain()">Back</button>
		</div>
	</div>
	`
})

export class ImportExcel {
	data: AOA = [ [] ];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
	fileName: string = 'SheetJS.xlsx';
    devicelist: AngularFireList<any>;

    constructor(public angFire: AngularFireDatabase,
        private router: Router) {
    
        this.devicelist = angFire.list('/');
       
    }

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1})).slice(5).map((row:any[]) =>{
				return row.filter(col => col);
			});
			

            console.log('dataex',this.data[7]);//for เลือกเอา i กำหนด
			
		};
		reader.readAsBinaryString(target.files[0]);
	}

	uploadToFirebase(data:any[][]){
		for(let i = 0;i !== data.length ;++i){
			console.log('index',i);
			console.log(data[i]);
			const deviceDetail: deviceDetail = {
				order: data[i][0],
				serialNumber: data[i][1],
				date: data[i][2],
				name: data[i][3],
				detail: data[i][4],
				location: data[i][5],
				pricePerUnit: data[i][6],
				transferStatus: data[i][7],
				oldSerialNumber : data[i][8],
				remark:'',
				imgurl : '',
				key:'',
				file: '',
				tagUID:'',
				status:'',
			};		
			var excelData = this.devicelist.push(deviceDetail);
			this.devicelist.update(excelData.ref.key,{
				key:excelData.ref.key
			});
		}
		this.router.navigateByUrl('/');
	}
	
    backToMain(){
        this.router.navigateByUrl('/');
    }

}