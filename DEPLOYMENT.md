# ZJNNP Academic Journal Platform Deployment Guide

## Prerequisites

### Backend
- Node.js 18.x or higher
- MongoDB 5.x or higher
- npm or yarn
- Git
- SSL/TLS certificates (for production)

### Frontend
- Node.js 18.x or higher
- npm or yarn
- Git

## Backend Deployment

### 1. Environment Setup
Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/zjnnp

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d
REFRESH_TOKEN_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration (if needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Database Setup
- Ensure MongoDB is running
- Import initial data if needed
- Set up database indexes

### 4. Start the Server
```bash
npm start
```

## Frontend Deployment

### 1. Environment Setup
Create a `.env` file in the frontend directory with the following variables:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENV=production
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Build the Application
```bash
npm run build
```

### 4. Serve the Application
Use a static file server to serve the built files. For example, using serve:
```bash
npx serve -s build
```

## Docker Deployment

### Backend
```dockerfile
# Dockerfile (in backend directory)
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

### Frontend
```dockerfile
# Dockerfile (in frontend directory)
FROM node:18-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Production Considerations

### Security
1. Use HTTPS
2. Set up proper CORS configuration
3. Implement rate limiting
4. Use environment variables for sensitive data
5. Enable security headers

### Performance
1. Use a reverse proxy (e.g., Nginx)
2. Enable caching
3. Compress responses
4. Use CDN for static assets

### Monitoring
1. Set up error tracking
2. Monitor server metrics
3. Set up logging
4. Monitor database performance

### Backup
1. Regular database backups
2. Backup configuration files
3. Backup static assets

## Troubleshooting

### Common Issues
1. **Database Connection**
   - Check MongoDB connection string
   - Verify database credentials
   - Check network connectivity

2. **Authentication**
   - Verify JWT secret
   - Check token expiration
   - Verify user roles and permissions

3. **Performance**
   - Monitor server resources
   - Check for memory leaks
   - Review database queries

4. **Security**
   - Verify SSL/TLS configuration
   - Check security headers
   - Review access logs

## Maintenance

### Regular Tasks
1. Update dependencies
2. Backup database
3. Check logs
4. Monitor performance
5. Security audits

### Updates
1. Test updates in staging
2. Backup before updates
3. Follow deployment checklist
4. Monitor after deployment
