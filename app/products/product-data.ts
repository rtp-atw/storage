import { Product , DeviceStatus } from './product';
export const PRODUCT_ITEMS: Product[] = [{
    id: 1,
    name: 'Multimeter',
    description: 'digital',
    location: 44,
    status: DeviceStatus.good
  }, {
    id: 2,
    name: 'Osiloscope',
    description: 'working',
    location: 44,
    status: DeviceStatus.good
  }, {
    id: 3,
    name: 'R-Decade',
    description: 'not working',
    location: 44,
    status: DeviceStatus.bad
  }]