import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(private _router: Router,
              private restApi: CommonService,
              private _toastrService: ToastrService

  ) { }

  ngOnInit() {
    let nLink:any = ['login']
    let token:any = localStorage.getItem('token');
    if(!token){
     this._router.navigate(nLink);
    } else {
      this.getProducts();
    }
  }
  getProducts(){
    this.restApi.products().subscribe((data: {}) => {
      let productData:any = data;
      console.log('productdata',productData);
     this.products = productData;
    });
  }
  addtoCart(id){
    let userId:any = localStorage.getItem('userid');
    let addToCartDetail:any = {
     userId:userId,
     productId:id
    }
    this.restApi.addtocart(addToCartDetail).subscribe((data: {}) => {
      this._toastrService.success('successfully added to cart');

    });
  }

}
