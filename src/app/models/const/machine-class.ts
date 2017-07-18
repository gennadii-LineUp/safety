export class MachineClass {
  category: number;
  mark: string;
  model: string;
  registration: string;
  techControl: string;
  employeeGroups: number[];
  remoteControl: boolean;
  parkNumber: string;
  vgp: string;
  equipment: number;

  constructor(category: number,
              mark: string,
              model: string,
              registration: string,
              techControl: string,
              employeeGroups: number[],
              remoteControl: boolean,
              parkNumber: string,
              vgp: string,
              equipment: number) {

    this.category = category;
    this.mark = mark;
    this.model = model;
    this.registration = registration;
    this.techControl = techControl;
    this.employeeGroups = employeeGroups;
    this.remoteControl = remoteControl;
    this.parkNumber = parkNumber;
    this.vgp = vgp;
    this.equipment = equipment;
  }
}
