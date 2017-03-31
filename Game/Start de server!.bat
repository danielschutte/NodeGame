@echo off
echo ===================================
echo === DANIEL, LARS, LENARD, ARJEN ===
echo ===================================
echo.
echo Verbinden met de server doe je op #host-ip:3000
echo.
echo Voer 1 in en druk op enter om de server te starten 
echo Voer 2 in en druk op enter om af te sluiten

set /p k=
if %k% == 1 goto start
if %k% == 2 goto exit

:start
echo.
echo Om de server te stoppen druk je op CTRL+C, typ je Y en druk je op enter
cd clientGame
npm start


:exit
exit