import { Product , DeviceStatus } from './product';
export const PRODUCT_ITEMS: Product[] = [{
    id: 1,
    name: 'Scissors',
    description: 'use this to cut stuff',
    location: 44,
    status: DeviceStatus.good
  }, {
    id: 2,
    name: 'Steak Knives',
    description: 'use this to eat food with',
    location: 44,
    status: DeviceStatus.good
  }, {
    id: 3,
    name: 'Shot Glass',
    description: 'use this to take shots',
    location: 44,
    status: DeviceStatus.bad
  }]