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
  imports: [CommonModule , RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading = false;
  errorMessage = '';
  isEditMode = false;
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

    // Check if we're in edit mode
    this.route.url.subscribe(url => {
      this.isEditMode = url.some(segment => segment.path === 'edit');
    });

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
    this.router.navigate(['/product-details', this.product?.id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
