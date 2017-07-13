export class FichiersClass {
  name: string;
 // id: number;
  employeeGroups: number[];

    constructor(name: string,
               //  id: number,
                 employeeGroups: any[]) {

  this.name = name;
  // this.id = id;
  this.employeeGroups = employeeGroups;
  }
}
