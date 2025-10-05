import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';
  currentUser: any = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  loadProducts() {
  this.isLoading = true;
  this.errorMessage = '';

  this.productService.getAllProducts().subscribe({
    next: (response) => {
      this.isLoading = false;

      // ✅ Extract the products array safely
      const products = response.items || response.data || response || [];

      // ✅ Add base URL to imagePath if needed
      this.products = products.map((p: any) => ({
        ...p,
        imagePath: p.imagePath
          ? `https://localhost:7211${p.imagePath.startsWith('/') ? '' : '/'}${p.imagePath}`
          : null
      }));
    },
    error: (error) => {
      this.isLoading = false;
      this.errorMessage = 'Failed to load products. Please try again.';
      console.error('Error loading products:', error);
    }
  });
}


  viewProduct(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }

  editProduct(productId: number) {
    this.router.navigate(['/product-details', productId, 'edit']);
  }

  deleteProduct(Id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(Id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete product. Please try again.';
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
