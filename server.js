import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = 3000; // You can use any available port on your local machine

// Enable CORS for all routes
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });

// Define the target API server
const apiTarget = 'https://24f7djjqadrk6qbr4esubxo5km0emahq.lambda-url.us-east-1.on.aws';

// Create a proxy middleware instance
const apiProxy = createProxyMiddleware({
  target: apiTarget,
  changeOrigin: true, // Needed for virtual hosted sites
  pathRewrite: {
    '^/api': '', // Remove the '/api' prefix when forwarding the request
  },
});

// Use the proxy middleware for your API endpoint
app.use('/api', apiProxy);

// Start the local server
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}/`);
});
