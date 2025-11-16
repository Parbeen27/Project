@echo off
echo ========================================
echo  DownloadHub React - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Node.js is installed!
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    powershell -ExecutionPolicy Bypass -Command "npm install"
    echo.
    echo Dependencies installed successfully!
    echo.
)

echo Starting DownloadHub React Application...
echo.
echo The application will open in your browser at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

set NODE_OPTIONS=--localstorage-file=.localstorage
powershell -ExecutionPolicy Bypass -Command "npm start"
