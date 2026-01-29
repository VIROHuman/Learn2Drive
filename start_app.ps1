# Start Backend Server
Write-Host "Starting Backend Server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start Frontend Client
Write-Host "Starting Frontend Client..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

Write-Host "Application starting..."
