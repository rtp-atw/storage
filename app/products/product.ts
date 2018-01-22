export enum DeviceStatus { //DeviceStatus.good/bad
  good = 1,
  bad = 0
}

export interface deviceDetail2 {
  id?: number;
  serialnumber?: number;
  name?: string;
  detail?: string;
  importdate?: string;
  location_storage?: number;
  status?: string;
  type?: string;
  imgurl? : any;
  key?:string;
  file?: any;
}
/* deleteProduct(product: Product) {
  this.pItems.splice(this.pItems.indexOf(product), 1);
  console.log(this.pItems);
} */