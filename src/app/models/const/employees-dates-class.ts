export class EmployeesClassDates {
  name: string;
  surname: string;
  email: string;
  post: string;
  birthDate: string;
  numSecu: string;
  validityPeriod: boolean;
  startDate: string;
  endDate: string;
  employeeGroup: number;

  constructor(name: string,
              surname: string,
              email: string,
              post: string,
              birthDate: string,
              numSecu: string,
              validityPeriod: boolean,
              startDate: string,
              endDate: string,
              employeeGroup: number) {

    this.name = name;
    this.surname = surname;
    this.email = email;
    this.post = post;
    this.birthDate = birthDate;
    this.numSecu = numSecu;
    this.validityPeriod = validityPeriod;
    this.startDate = startDate;
    this.endDate = endDate;
    this.employeeGroup = employeeGroup;
  }
}
