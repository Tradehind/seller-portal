import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environment/environment';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productData: any = [];
  sellerId: any;
  categoryData: any;
  subcategoryData: any;
  formValue: any;
  formEditValue:any;
  productImage: any;
  productFilePath: any;
  productImgPath = environment.fileUploadUrl;

  productEditFilePath:any;
  productEditImage:any;
  productEditData:any;
  subcategoryEditData:any;
  showNoRecords:boolean = false;
  showProductImg:any;
  showEditProductImg:any;
  subsubcategoryData:any = [];


  constructor(public apiService: ApiService, public router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.sellerId = params['id'];
      console.log('sellerId ID:', this.sellerId);
    });
    this.getSellerProductList();

    this.getCategoryList();
  }


  getSellerProductList() {

     let url = 'seller-products/'+48924;
    //let url = 'products';
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data && data.length) {
          this.showNoRecords = false;
          this.productData = data;
        }else{
          this.showNoRecords = true;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }



  productList(sellerId: number) {
    this.router.navigate(['/seller-list/product-list', sellerId]);
  }

  openProductAdd() {

    $('#addProductModal').modal('show');
  }

  getCategoryList() {

    let url = 'active-categories';
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data) {
          this.categoryData = data;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }

  setSubCategoryList(id:number) {

    let url = '/subcategory-bycategory/' + id;
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data) {
          this.subcategoryEditData = data;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }

  setSubSubCategoryList(id:number) {

    let url = '/subsubcategory-bycategory/' + id;
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data) {
          this.subcategoryEditData = data;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }

  getsubcategoryList(input: any) {

    let url = '/subcategory-bycategory/' + input.value;
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data) {
          this.subcategoryData = data;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }

  getsubsubcategoryList(input: any) {

    let url = '/subsubcategory-bycategory/' + input.value;
    this.apiService.getMethod(url).subscribe({
      next: (data) => {
        console.log(data, 'data');
        if (data) {
          this.subsubcategoryData = data;
        }
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {

        }
      },
      complete: () => console.info('complete')
    });
  }

  async handleProductImg(file: any) {
    this.showProductImg = await this.apiService.showFileSelected(file);
    let fileN = file.files[0];
    this.productImage = fileN;
  }

  async uploadFiles(formValues: any) {

    this.formValue = formValues;

    if (this.productImage) {
      const v = await this.apiService.fileUploadMethod({ file: this.productImage }, 'upload-product-img').toPromise();
      this.productFilePath = v.filePath;
    }

    this.onSubmit();
  }

  onSubmit() {
    if (this.productFilePath) this.formValue.primary_image = this.productFilePath;

    this.formValue.seller_id = this.sellerId;
    this.apiService.postMethod(this.formValue, 'products').subscribe({
      next: (v) => {
        if(v.error){
          this.apiService.showHideModal('visible', v.error, 'error', 8000);
          return
        }
        $('#productform').trigger("reset");
        this.apiService.showHideModal('visible', 'Product added successfully', 'success', 5000);
        this.getSellerProductList()
      },
      error: (e) => {
        console.error(e);
        if (e?.error) {
          // this.showError = e.error.message;
        }
      },
      complete: () => console.info('complete')
    });
  }

  closeModel() {
    $('#addProductModal').modal('hide');
    $('#editProductModal').modal('hide');
  }

  inactiveProduct(id: number) {

    const userConfirmed = confirm('Are you sure you want to remove this product?');

    if (userConfirmed) {
      this.apiService.getMethod('inactive-products/' + id).subscribe({
        next: (v:any) => {
          console.log(v);
          this.getSellerProductList()
        },
        error: (e:any) => {
          console.error(e);
          if (e?.error) {
            // this.showError = e.error.message;
          }
        },
        complete: () => console.info('complete')
      });
    }
   

  }

  async handleProductEditImg(file: any) {
    let fileN = file.files[0];
    this.showEditProductImg = await this.apiService.showFileSelected(file);
    this.productEditImage = fileN;
    console.log(fileN, 'filen')
  }


  async uploadEditFiles(formValues: any) {

    this.formEditValue = formValues;

    if (this.productEditImage) {
      const v = await this.apiService.fileUploadMethod({ file: this.productEditImage }, 'upload-product-img').toPromise();
      this.productEditFilePath = v.filePath;
    }

    this.onEditSubmit();
  }

  onEditSubmit() {
    if (this.productEditFilePath) this.formEditValue.primary_image = this.productEditFilePath;

    this.apiService.putMethod(this.formEditValue, 'products/'+this.productEditData.id).subscribe({
      next: (v) => {
        console.log(v);

        if(v.error){
          this.apiService.showHideModal('visible', v.error, 'danger', 8000);
          return
        }
        if(v.status == 200){
          $('#productform').trigger("reset");
          $('#editProductModal').modal('hide');
          this.apiService.showHideModal('visible', 'Product updated successfully', 'success', 5000);
          this.getSellerProductList()
        }
       
      },
      error: (e:any) => {
        console.error(e);
       
      }
    });
  }

  showProduct(product:any){
    this.productEditData = product;
    this.setSubCategoryList(product.category_id);

    // if(this.productEditData?.sub_category_id){
    //   this.productEditData?.sub_category_id
    // }
    
    $('#editProductModal').modal('show');
  }

  back(){
    this.router.navigate(['/seller-list'])
  }


}

