import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProductsComponent } from './components/products/products';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { AddProductComponent } from './components/add-product/add-product';
import { UpdateProductComponent } from './components/update-product/update-product';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: '**', redirectTo: '/login' }
];
