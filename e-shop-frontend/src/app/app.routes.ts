import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProductsComponent } from './components/products/products';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { AddProductComponent } from './components/add-product/add-product';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'product-details/:id/edit', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', redirectTo: '/login' }
];
