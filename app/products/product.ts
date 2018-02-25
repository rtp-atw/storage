export enum DeviceStatus { //DeviceStatus.good/bad
  good = 1,
  bad = 0
}

export interface deviceDetail {
  number?: number;
  serialNumber?: number;
  date?: string;
  name?: string;
  detail?: string;
  location?: number;
  pricePerUnit?: string;
  transferStatus?: string;
  oldSerialNumber? : number;
  remark?:string;
  imgurl? : any;
  key?:string;
  file?: any;
  tagUID?:string;
  status?:any;
  lastUpdate?:string;
}
