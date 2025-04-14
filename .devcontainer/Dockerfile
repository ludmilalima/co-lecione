# Use Dev Container Node base image
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Set working directory
WORKDIR /workspace

# Install Angular CLI globally
RUN npm install -g @angular/cli && npm cache clean --force

# Switch to vscode user for safer dev experience
USER vscode

# Expose ports
EXPOSE 4200 5200
