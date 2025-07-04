# ZJNNP Website

A full-stack MERN application built with React, Express, MongoDB, and Node.js.

## Deployment Guide (Render)

### Prerequisites
1. Create a GitHub account if you don't have one
2. Create a Render account at https://render.com/
3. Have your GoDaddy domain ready

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `zjnnp-website`
3. Push your local code to GitHub:
```bash
# Initialize git
$ git init
$ git add .
$ git commit -m "Initial commit"

# Add remote repository
$ git remote add origin https://github.com/YOUR_USERNAME/zjnnp-website.git

# Push code
$ git push -u origin main
```

### Step 2: Backend Deployment
1. Go to https://dashboard.render.com/
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Select the `backend` directory
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`
7. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
8. Click "Create Web Service"

### Step 3: Frontend Deployment
1. Go to https://dashboard.render.com/
2. Click "New +" > "Static Site"
3. Connect your GitHub repository
4. Select the `frontend` directory
5. Set Build Command: `npm run build`
6. Set Publish Directory: `build`
7. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL from Render
8. Click "Create Static Site"

### Step 4: Connect GoDaddy Domain
1. Go to your Render dashboard
2. Click on your Static Site
3. Click "Add Domain"
4. Enter your GoDaddy domain
5. Render will provide DNS records
6. Go to GoDaddy DNS settings
7. Add the DNS records provided by Render
8. Wait for DNS propagation (usually takes a few hours)

### Step 5: Test Your Application
1. Wait for both deployments to complete
2. Test the frontend at your custom domain
3. Test API endpoints using the backend URL
4. Verify SSL certificates are working

## Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `NODE_ENV`: production

### Frontend
- `REACT_APP_API_URL`: Backend URL from Render

## Troubleshooting
- Check Render logs if deployment fails
- Verify DNS records are correct
- Ensure all environment variables are set
- Check SSL certificate status

## Support
For any issues, please check the Render documentation or contact support.
