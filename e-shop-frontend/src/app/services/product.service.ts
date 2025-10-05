import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductRequest, RequestedFilters } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'https://localhost:7211/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(filters?: RequestedFilters): Observable<any> {
    const params: any = {};
    if (filters) {
      if (filters.pageNumber) params.pageNumber = filters.pageNumber.toString();
      if (filters.pageSize) params.pageSize = filters.pageSize.toString();
      if (filters.searchTerm) params.searchTerm = filters.searchTerm;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortDirection) params.sortDirection = filters.sortDirection;
    }

    return this.http.get(`${this.API_URL}/Product/GetAll`, {
      headers: this.getHeaders(),
      params
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/Product/Get?id=${id}`, {
      headers: this.getHeaders()
    });
  }

  addProduct(productRequest: ProductRequest): Observable<any> {
  const formData = new FormData();
  formData.append('name', productRequest.name);
  formData.append('description', productRequest.description);
  formData.append('price', productRequest.price.toString());

  if (productRequest.image) {
    formData.append('image', productRequest.image);
  }

  // ✅ Send FormData directly — no need to manually set headers.
  return this.http.post(`${this.API_URL}/Product/Add`, formData, {
  headers: this.getHeaders()
});
}


  updateProduct(id: number, productRequest: ProductRequest): Observable<any> {
    const formData = new FormData();
    formData.append('name', productRequest.name);
    formData.append('description', productRequest.description);
    formData.append('price', productRequest.price.toString());
    if (productRequest.image) {
      formData.append('image', productRequest.image);
    }

    return this.http.put(`${this.API_URL}/Product/Update?id=${id}`, formData, {
      headers: this.getHeaders()
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/Product/Delete?id=${id}`, {
      headers: this.getHeaders()
    });
  }
}
