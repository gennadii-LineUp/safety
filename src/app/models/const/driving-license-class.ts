export class DrivingLicenseClass {
  categories: number[];
  equipment: number;

  constructor(categories: number[],
              equipment: number) {

    this.categories = categories;
    this.equipment = equipment;
  }
}
