export class EmployeesSettingAccessClass {
  id: number;
  name: string;
  surname: string;
  numSecu: string;
  responsible: number;

  constructor(id: number,
              name: string,
              surname: string,
              numSecu: string,
              responsible: number) {

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.numSecu = numSecu;
    this.responsible = responsible;
  }
}
