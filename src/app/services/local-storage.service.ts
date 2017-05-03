import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorageService{

    key:string = "#propertyCross_A2"; // the name of our localStorage
    data: any;

    // return {
    //     write: function(value) {
    //         localStorage.setItem(key, angular.toJson(value)); //JSON.stringify
    //     }
    //
    // }



    // private data: Phone[] = [
    //     { name:"Apple iPhone 7", price: 56000}
    // ];

    getData():void {
        // return this.data;
    }

    addData(name: string, price: number){
        // this.data.push(new Phone(name, price));
    }
}