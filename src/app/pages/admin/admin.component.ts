import {Component, OnInit} from '@angular/core';
//import {ActivatedRoute} from '@angular/router';
//import {Subscription} from 'rxjs/Subscription';
//declare let jQuery:any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    // private menuItem: number;
    // private routeSubscription: Subscription;

    // constructor(private route: ActivatedRoute) {
    //
    //     this.routeSubscription = route.params.subscribe(params => this.menuItem = params['menuItem']);
    // }
    //
    // ngOnDestroy() {
    //     this.routeSubscription.unsubscribe();
    // }

    ngOnInit(): void {
      //  this.mobileMenuClickable();
    }


}
