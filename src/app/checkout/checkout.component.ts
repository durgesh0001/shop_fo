import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carts:any;
  promocode:any;
  constructor(private _router: Router,private restApi: CommonService) {
    let nLink:any = ['login']
    let token:any = localStorage.getItem('token');
    if(!token){
      this._router.navigate(nLink);
    } else {
      this.getCarts();
    }
    this.promocode ='';
  }

  ngOnInit() {
  }
  getCarts(){
    let userId:any = localStorage.getItem('userid');
    let cartDetail:any = {
      userId:userId,
      promocode:''
    }
    this.restApi.getCarts(cartDetail).subscribe((data: {}) => {
      let cartData:any = data["data"];
      console.log('productdata',cartData);
      this.carts = cartData;
    });
  }

  redeem(promocode){
    let userId:any = localStorage.getItem('userid');
    let cartDetail:any = {
      userId:userId,
      promocode:promocode
    }
    this.restApi.getCarts(cartDetail).subscribe((data: {}) => {
      let cartData:any = data["data"];
      console.log('productdata',cartData);
      this.carts="";
      this.carts = cartData;
    });
  }

  clearCart(){
    let userId:any = localStorage.getItem('userid');
    let clearCartDetail:any = {
      userId:userId,
    }
    this.restApi.clearCarts(clearCartDetail).subscribe((data: {}) => {
      this.redeem('');
    });
  }


}
