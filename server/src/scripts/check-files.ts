import fs from "fs";
import path from "path";

// Define the paths to the required files
const envFilePath = path.resolve(__dirname, "../.env");
const x509CertPath = path.resolve(__dirname, "../X509-cert.pem");

// Function to check if a file exists
function checkFileExists(filePath: string, fileName: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: The ${fileName} file is missing from the repository.`);
  }
}

// Check for the .env file
checkFileExists(envFilePath, ".env");

// Check for the X.509 certificate file
checkFileExists(x509CertPath, "X.509 certificate (cert.pem)");