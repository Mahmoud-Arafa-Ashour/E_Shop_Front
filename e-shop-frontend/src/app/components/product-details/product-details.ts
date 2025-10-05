import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading = false;
  errorMessage = '';
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(+productId);
    }
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.isLoading = false;

        // Format the image path with full API URL
        if (product.imagePath) {
          const formattedPath = product.imagePath.startsWith('http')
            ? product.imagePath
            : `https://localhost:7211${product.imagePath.startsWith('/') ? '' : '/'}${product.imagePath}`;
          product.imagePath = formattedPath;
        }

        this.product = product;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load product details. Please try again.';
        console.error('Error loading product:', error);
      }
    });
  }

  deleteProduct() {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete product. Please try again.';
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  editProduct() {
    // Navigate to the update product component
    this.router.navigate(['/update-product', this.product?.id]);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
