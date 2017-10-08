export interface Product {
  id: number;
  name: string;
  description: string;
  location: number;
  status: DeviceStatus;
}

export enum DeviceStatus { //DeviceStatus.good/bad
  good = 1,
  bad = 0
}