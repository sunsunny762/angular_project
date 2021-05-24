import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = {};
  list: any = {};
  userId: any;

  addEditProductForm: any;

  single_product_data: any;
  edit_product_id: any;


  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private localStorageSerice: LocalStorageService
  ) {
    this.userId = this.localStorageSerice.retrieve('result').data.id;
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      console.log(this.products);
    }, error => {
      console.log("error", error);
    });
  }

  addList(id: number) {
    this.productService.addList(this.userId, id).subscribe(data => {
      if (data.success) {
        this.getAllProduct();
        console.log("Product added");
      }

    }, error => {
      console.log("error", error);
    });
  }

  addProduct() {
    const addDialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        id: "",
        name: "",
        description: "",
        price: ""
      }
    });

    addDialogRef.afterClosed().subscribe(
      data => {
        this.productService.addProduct(data).subscribe(result => {
          this.getAllProduct();
        });
      }
    );
  }


  deleteProduct(id: number) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.productService.deleteProduct(id).subscribe(data => {
        console.log("deleted successfully", data);
        this.getAllProduct();
      }, error => {
        alert("Some Error Occured");
      })
    } else {
      alert("You pressed Cancel!");
    }
  }

  deleteList(id: number) {
    this.productService.deleteList(this.userId, id).subscribe(data => {
      this.getAllProduct();
    }, error => {
      console.log("error", error);
    });
  }

  openDialog(id: number) {
    this.productService.getProduct(id).subscribe(data => {
      this.single_product_data = data.data;
      this.edit_product_id = data.data.id;

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          id: this.edit_product_id,
          name: this.single_product_data.name,
          description: this.single_product_data.description,
          price: this.single_product_data.price
        }
      });
      dialogRef.afterClosed().subscribe(
        data => {
          this.productService.updateProduct(data).subscribe(result => {
            this.getAllProduct();
          });
        }
      );
    });
  }
}
