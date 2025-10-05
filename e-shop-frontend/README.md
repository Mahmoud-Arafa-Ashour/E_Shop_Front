# E-Shop Frontend

A modern Angular application for managing products with full CRUD operations, authentication, and image upload functionality.

## Features

- **Authentication & Authorization**

  - User registration with email validation
  - Secure login with JWT tokens
  - Protected routes and session management

- **Product Management**

  - View all products in a responsive grid layout
  - Add new products with image upload
  - View detailed product information
  - Update existing products
  - Delete products with confirmation

- **Image Upload**

  - Support for JPEG, PNG, and GIF formats
  - File size validation (max 5MB)
  - Image preview functionality
  - Image validation and error handling

- **Responsive Design**
  - Mobile-first approach
  - Bootstrap 5 for styling
  - Bootstrap Icons for UI elements
  - Modern, clean interface

## API Integration

This application integrates with the E-Shop API located at `G:\Projects\E_Shop`. The API endpoints include:

### Authentication

- `POST /api/Login/Login` - User login
- `POST /api/Login/Register` - User registration
- `POST /api/Login/RefreshToken` - Token refresh

### Products

- `GET /api/Product/GetAll` - Get all products
- `GET /api/Product/Get` - Get single product
- `POST /api/Product/Add` - Add new product
- `PUT /api/Product/Update` - Update product
- `DELETE /api/Product/Delete` - Delete product

### Account Management

- `GET /api/Account/Info` - Get user info
- `PUT /api/Account/UpdateInfo` - Update profile
- `PUT /api/Account/ChangePassword` - Change password

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI
- The E-Shop API running on `https://localhost:7211`

### Installation

1. Navigate to the project directory:

   ```bash
   cd e-shop-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

### Configuration

The application is configured to connect to the API at `https://localhost:7211`. If your API runs on a different port or host, update the `API_URL` in the service files:

- `src/app/services/auth.service.ts`
- `src/app/services/product.service.ts`
- `src/app/services/user.service.ts`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Login component
│   │   ├── register/        # Registration component
│   │   ├── products/        # Products listing
│   │   ├── product-details/ # Product details view
│   │   └── add-product/     # Add new product
│   ├── models/              # TypeScript interfaces
│   ├── services/            # API services
│   ├── app.routes.ts        # Routing configuration
│   └── app.config.ts        # App configuration
├── styles.scss              # Global styles
└── main.ts                  # Application entry point
```

## Usage

### Authentication Flow

1. **Registration**: New users can register with email, password, name, phone, and address
2. **Login**: Existing users can log in with email and password
3. **Session Management**: JWT tokens are stored in localStorage for persistence

### Product Management

1. **View Products**: After login, users see all products in a grid layout
2. **Add Product**: Click "Add Product" to create new products with image upload
3. **View Details**: Click on any product to see detailed information
4. **Edit/Delete**: Use the action buttons to modify or remove products

### Image Upload

- Supported formats: JPEG, PNG, GIF
- Maximum file size: 5MB
- Real-time preview before upload
- Validation and error handling

## Technologies Used

- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **RxJS** - Reactive programming
- **Angular Forms** - Form handling and validation

## Development

### Running Tests

```bash
ng test
```

### Building for Production

```bash
ng build --configuration production
```

### Code Generation

```bash
# Generate a new component
ng generate component components/component-name

# Generate a new service
ng generate service services/service-name
```

## API Requirements

Ensure your E-Shop API is running and accessible at `https://localhost:7211` with the following features:

- CORS enabled for the frontend domain
- JWT token authentication
- File upload support for product images
- Proper error handling and response formatting

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the API has CORS configured for your frontend domain
2. **Authentication Issues**: Check that JWT tokens are being sent in request headers
3. **Image Upload Failures**: Verify file size and format restrictions
4. **API Connection**: Confirm the API URL is correct and the server is running

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
