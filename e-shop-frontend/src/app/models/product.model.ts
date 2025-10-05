export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath?: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  image?: File;
}

export interface ProductResponse {
  name: string;
  description: string;
  price: number;
  imagePath?: string;
}

export interface RequestedFilters {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
