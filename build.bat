@echo off
echo ========================================
echo Steam Link Redirector - Build Script
echo ========================================
echo.

REM Create build directory if it doesn't exist
if not exist "build" mkdir build

echo [1/3] Building Chrome/Opera version...
echo Copying files...

REM Clean previous Chrome build
if exist "build\chrome" rmdir /s /q "build\chrome"
mkdir "build\chrome"

REM Copy files for Chrome (uses manifest.json)
copy manifest.json "build\chrome\" >nul
copy background.js "build\chrome\" >nul
copy converter.js "build\chrome\" >nul
copy popup.html "build\chrome\" >nul
copy popup.js "build\chrome\" >nul
copy options.html "build\chrome\" >nul
copy options.js "build\chrome\" >nul
xcopy /E /I icons "build\chrome\icons" >nul

echo ✓ Chrome/Opera build ready in build\chrome\
echo.

echo [2/3] Building Firefox version...
echo Copying files...

REM Clean previous Firefox build
if exist "build\firefox" rmdir /s /q "build\firefox"
mkdir "build\firefox"

REM Copy files for Firefox (uses manifest-firefox.json as manifest.json)
copy manifest-firefox.json "build\firefox\manifest.json" >nul
copy background.js "build\firefox\" >nul
copy converter.js "build\firefox\" >nul
copy popup.html "build\firefox\" >nul
copy popup.js "build\firefox\" >nul
copy options.html "build\firefox\" >nul
copy options.js "build\firefox\" >nul
xcopy /E /I icons "build\firefox\icons" >nul

echo ✓ Firefox build ready in build\firefox\
echo.

echo [3/3] Creating ZIP packages...

REM Create Chrome ZIP
cd "build\chrome"
if exist "..\steam-link-redirector-chrome.zip" del "..\steam-link-redirector-chrome.zip"
powershell -command "Compress-Archive -Path * -DestinationPath ..\steam-link-redirector-chrome.zip"
cd ..\..
echo ✓ Chrome package: build\steam-link-redirector-chrome.zip

REM Create Firefox ZIP
cd "build\firefox"
if exist "..\steam-link-redirector-firefox.zip" del "..\steam-link-redirector-firefox.zip"
powershell -command "Compress-Archive -Path * -DestinationPath ..\steam-link-redirector-firefox.zip"
cd ..\..
echo ✓ Firefox package: build\steam-link-redirector-firefox.zip

echo.
echo ========================================
echo Build complete!
echo ========================================
echo.
echo Chrome/Opera:  build\steam-link-redirector-chrome.zip
echo Firefox:       build\steam-link-redirector-firefox.zip
echo.
echo To test:
echo - Chrome: Load unpacked from build\chrome\
echo - Firefox: Load temporary add-on from build\firefox\
echo.
pause
