export class MachineClass {
  category: number;
  mark: string;
  model: string;
  parkNumber: string;
  vgp: string;
  equipment: number;

  constructor(category: number,
              mark: string,
              model: string,
              parkNumber: string,
              vgp: string,
              equipment: number) {

    this.category = category;
    this.mark = mark;
    this.model = model;
    this.parkNumber = parkNumber;
    this.vgp = vgp;
    this.equipment = equipment;
  }
}
