# co-lecione project

# Running the Project with DevContainers

This project is configured to use **DevContainers**, a feature of Visual Studio Code that provides a consistent development environment using Docker containers. Follow the steps below to set up and run the project using DevContainers.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. [Docker](https://www.docker.com/) (latest version)
2. [Visual Studio Code](https://code.visualstudio.com/) (latest version)
3. The **Dev Containers** extension for VS Code:
   - Install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
  
## Development .env file template:
```bash
# Environment configuration file template (.env)

# Node.js environment (e.g., dev, prod)
NODE_ENV=dev

# MongoDB Atlas connection string
# Replace with your actual cluster url string
ATLAS_URI=mongodb+srv://<your-cluster-url>/?retryWrites=true&w=majority&authMechanism=MONGODB-X509&authSource=%24external

# Path to the X.509 certificate for development
# Replace with the actual path to your certificate
DEV_ATLAS_URI_PATH=/workspaces/co-lecione/server/src/X509-cert.pem

# Application port
PORT=5200

# Development URL
DEV_URL=http://localhost

# SendGrid API key
# Replace with your actual SendGrid API key
SENDGRID_API_KEY=<your-sendgrid-api-key>
```

## 1. Creating a Cluster on MongoDB Atlas

### Access MongoDB Atlas
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in or create an account.

### Create a New Project
1. Click on **"New Project"** in the dashboard.
2. Give the project a name and click **"Create Project"**.

### Configure the Cluster
1. In the newly created project, click on **"Build a Cluster"**.
2. Choose either **"Shared Cluster"** (free) or **"Dedicated Cluster"** (paid).
3. Configure the cluster options:
   - **Cloud Provider & Region**: Choose the cloud provider and the region closest to you.
   - **Cluster Tier**: Select the free plan (M0) or another plan depending on your needs.
4. Click **"Create Cluster"**.

### Configure the Database
1. After the cluster is created, click on **"Database Access"** in the side menu.
2. Click **"Add New Database User"**:
   - Choose **"X.509 Authentication"** as the authentication method.
   - Enter a username (e.g., `CN=client,OU=OrgUnit,O=Organization,L=City,ST=State,C=Country`).
   - Click **"Add User"**.
   - Download X.509 certificate to be used later.

### Allow Network Access
1. Go to **"Network Access"** in the side menu.
2. Click **"Add IP Address"** and choose:
   - **"Allow Access from Anywhere"** (`0.0.0.0/0`) for development.
   - Or add specific IPs for enhanced security.

### Obtain the Connection String
1. Go to **"Clusters"** and click **"Connect"** on the created cluster.
2. Choose **"Connect your application"** and copy the connection string.
3. Replace `<your-cluster-url>` in the `.env` file with the copied connection string.

---

# Step-by-Step Guide: Creating a SendGrid API Key

This guide explains how to create a SendGrid API key to use in your project for sending emails.

## 1. Create a SendGrid Account
1. Go to the [SendGrid website](https://sendgrid.com/).
2. Click on **"Sign Up for Free"**.
3. Fill in the required details (name, email, password) and create your account.
4. Verify your email address by clicking the link sent to your inbox.

## 2. Log In to Your SendGrid Account
1. Go to the [SendGrid login page](https://app.sendgrid.com/login).
2. Enter your credentials and log in to your account.

## 3. Navigate to the API Key Section
1. Once logged in, click on **"Settings"** in the left-hand menu.
2. Select **"API Keys"** from the dropdown menu.

## 4. Create a New API Key
1. Click on the **"Create API Key"** button.
2. Enter a name for your API key (e.g., `MyProjectAPIKey`).
3. Select the **"Full Access"** option or customize the permissions based on your needs.
4. Click **"Create & View"**.

## 5. Copy the API Key
1. After creating the API key, you will see it displayed on the screen.
2. **Copy the API key immediately**, as you won’t be able to view it again later.
3. Store it securely in a password manager or your `.env` file.

## 6. Add the API Key to Your Project
1. Open your `.env` file in the project directory.
2. Add the following line, replacing `<your-sendgrid-api-key>` with the key you copied on .env file:
   ```properties
   SENDGRID_API_KEY=<your-sendgrid-api-key>
   ```

## Steps to Run the Project

1. **Clone the Repository**

   Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/ludmilalima/co-lecione.git
   cd co-lecione
   ```

2. **Add .env and X.509 certificate files**

   Add .env and X.509 files inside server/src folder using the following names:
      - server/src/.env
      - server/src/X509-cert.pem
  
3. **Open the Project in VS Code**

   Open the project folder in Visual Studio Code:
     ```bash
     code .
     ```
4. **Reopen in DevContainer**

   - Once the project is open in VS Code, you should see a prompt asking if you want to reopen the project in a DevContainer. Click "Reopen in Container".
   - If you don’t see the prompt, open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS) and select "Dev Containers: Reopen in Container".
      
5. **Wait for the Container to Build**

The first time you open the project in a DevContainer, VS Code will build the container based on the configuration in the .devcontainer folder. This may take a few minutes.

6. **Access the Application**

   - The application will be available at the URL specified in your .env file (e.g., http://localhost:4200).
   - If you're using Swagger for API documentation, you can access it at /api-docs (e.g., http://localhost:5200/api-docs).
    
**Additional Notes**

   - File Persistence: Any changes made to the files in the DevContainer will persist on your local machine.
   - Environment Variables: Ensure your .env file is correctly configured before running the project. The .env file is not included in the repository for security reasons, so you may need to create it manually.
