# Development Guide

## Quick Start

1. **Start the API Server** (from `G:\Projects\E_Shop`):

   ```bash
   cd "G:\Projects\E_Shop\E_Shop"
   dotnet run
   ```

2. **Start the Frontend** (from `G:\Projects\E_Shop Front\e-shop-frontend`):

   ```bash
   cd "G:\Projects\E_Shop Front\e-shop-frontend"
   npm start
   ```

3. **Access the Application**:
   - Frontend: http://localhost:4200
   - API: https://localhost:7211

## API Configuration

The frontend is configured to connect to the API at `https://localhost:7211`. If your API runs on a different port, update these files:

- `src/app/services/auth.service.ts` (line 12)
- `src/app/services/product.service.ts` (line 12)
- `src/app/services/user.service.ts` (line 12)

## Testing the Application

### 1. Registration Flow

1. Navigate to http://localhost:4200
2. Click "Sign up here" to go to registration
3. Fill in the registration form
4. Submit and check for success message

### 2. Login Flow

1. Use the credentials from registration
2. Login and verify redirect to products page
3. Check that user name appears in navigation

### 3. Product Management

1. **Add Product**: Click "Add Product" button
2. **Upload Image**: Select an image file (JPEG/PNG/GIF, max 5MB)
3. **Fill Form**: Enter product name, description, and price
4. **Submit**: Verify product is added and redirected to products list

### 4. Product Operations

1. **View Details**: Click "View Details" on any product
2. **Edit Product**: Click edit button (pencil icon)
3. **Delete Product**: Click delete button (trash icon) and confirm

## Common Issues & Solutions

### CORS Issues

If you get CORS errors, ensure your API has CORS configured:

```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### Authentication Issues

- Check that JWT tokens are being stored in localStorage
- Verify API returns proper authentication responses
- Ensure token is included in request headers

### Image Upload Issues

- Verify file size is under 5MB
- Check file format (JPEG, PNG, GIF only)
- Ensure API accepts multipart/form-data

## Development Tips

### Hot Reload

The Angular development server supports hot reload. Changes to TypeScript, HTML, or CSS files will automatically refresh the browser.

### Debugging

1. Use browser developer tools (F12)
2. Check Network tab for API requests
3. Monitor Console for errors
4. Use Angular DevTools extension

### Code Structure

- **Components**: UI logic and templates
- **Services**: API communication and business logic
- **Models**: TypeScript interfaces for data structures
- **Routes**: Navigation configuration

## Building for Production

```bash
# Build the application
ng build --configuration production

# The built files will be in dist/e-shop-frontend/
```

## Environment Configuration

For different environments, create environment files:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

Example:

```typescript
export const environment = {
  production: false,
  apiUrl: "https://localhost:7211/api",
};
```

## API Endpoints Reference

### Authentication

- `POST /api/Login/Login` - Login
- `POST /api/Login/Register` - Register
- `POST /api/Login/RefreshToken` - Refresh token

### Products

- `GET /api/Product/GetAll` - Get all products
- `GET /api/Product/Get?id={id}` - Get product by ID
- `POST /api/Product/Add` - Add new product (FormData)
- `PUT /api/Product/Update?id={id}` - Update product (FormData)
- `DELETE /api/Product/Delete?id={id}` - Delete product

### Account

- `GET /api/Account/Info` - Get user info
- `PUT /api/Account/UpdateInfo` - Update profile
- `PUT /api/Account/ChangePassword` - Change password

## Security Considerations

1. **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)
2. **CORS**: Properly configured for allowed origins
3. **File Upload**: Validated file types and sizes
4. **Input Validation**: Client and server-side validation
5. **HTTPS**: Use HTTPS in production

## Performance Optimization

1. **Lazy Loading**: Implement lazy loading for feature modules
2. **OnPush Strategy**: Use OnPush change detection strategy
3. **Image Optimization**: Compress images before upload
4. **Bundle Size**: Monitor and optimize bundle size
5. **Caching**: Implement proper caching strategies

## Testing

### Unit Tests

```bash
ng test
```

### E2E Tests

```bash
ng e2e
```

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Product listing displays correctly
- [ ] Add product with image upload
- [ ] View product details
- [ ] Edit product functionality
- [ ] Delete product with confirmation
- [ ] Logout functionality
- [ ] Responsive design on mobile
- [ ] Error handling for network issues
