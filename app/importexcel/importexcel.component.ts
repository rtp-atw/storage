/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

import * as fileSaver from 'file-saver';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { deviceDetail2 } from "../products/product";

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
			<div class="container">
				<table class="table table-bordered table-striped table-hover">
					<tr *ngFor="let row of data">
						<td *ngFor="let val of row">
							{{val}}
						</td>
					</tr>
				</table>
			</div>
		<button class='btn btn-primary' (click)="uploadToFirebase(data)">Upload</button>
		<button class='btn btn-primary' (click)="backToMain()">Back</button>
		</div>
	</div>
	`
})

export class ImportExcel {
	data: AOA = [ [1, 2], [3, 4] ];
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
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
			
            console.log('dataex',this.data[0]);
            
		};
		reader.readAsBinaryString(target.files[0]);
	}

	uploadToFirebase(data:any){
		for(let i = 0;i !== data.length ;++i){
			console.log('index',i);			
			this.devicelist.push(data[i]);
			
		}
	}
	

    backToMain(){
        this.router.navigateByUrl('/');
    }

}