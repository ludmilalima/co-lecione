# Use a Node base image (can specify version as needed)
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Set working directory
WORKDIR /workspace

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Optional: expose ports for frontend (4200), backend (3000)
EXPOSE 4200 5200
