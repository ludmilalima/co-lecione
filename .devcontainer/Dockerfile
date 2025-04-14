# Use Dev Container Node base image
FROM mcr.microsoft.com/devcontainers/javascript-node

# Set working directory
WORKDIR /workspace

# Install Angular CLI globally
RUN npm install -g @angular/cli && npm cache clean --force


# Expose ports
EXPOSE 4200 5200
