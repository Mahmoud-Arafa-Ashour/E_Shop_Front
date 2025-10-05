import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ProductRequest, Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.scss'
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  currentUser: any = null;
  productId: number = 0;
  product: Product | null = null;
  originalImagePath: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      image: [null]
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.loadProduct(this.productId);
    } else {
      this.errorMessage = 'Product ID not found';
      setTimeout(() => this.router.navigate(['/products']), 2000);
    }
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.isLoading = false;
        this.product = product;

        // Format the image path with full API URL
        if (product.imagePath) {
          const formattedPath = product.imagePath.startsWith('http')
            ? product.imagePath
            : `https://localhost:7211${product.imagePath.startsWith('/') ? '' : '/'}${product.imagePath}`;
          this.originalImagePath = formattedPath;
          this.previewUrl = formattedPath;
          this.product.imagePath = formattedPath;
        } else {
          this.originalImagePath = null;
          this.previewUrl = null;
        }

        // Pre-fill the form with existing product data
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load product. Please try again.';
        console.error('Error loading product:', error);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Please select a valid image file (JPEG, PNG, or GIF)';
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.errorMessage = 'File size must be less than 5MB';
        return;
      }

      this.selectedFile = file;
      this.productForm.patchValue({ image: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const productRequest: ProductRequest = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        image: this.selectedFile || undefined
      };

      this.productService.updateProduct(this.productId, productRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Product updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/product-details', this.productId]);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to update product. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = this.originalImagePath;
    this.productForm.patchValue({ image: null });
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  goBack() {
    this.router.navigate(['/product-details', this.productId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
}
