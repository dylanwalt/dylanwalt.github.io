# One-time Google Apps Script authorization for Elevated Walt Media analytics
$scriptId = '1G3vrGZaKMsrHGuHy2JCzM20MjHv_AP13sXWSjoR1GdsPDMG4eBc8Ri0A'
$editorUrl = "https://script.google.com/home/projects/$scriptId/edit"
$sheetUrl = 'https://docs.google.com/spreadsheets/d/1cMeKNr1wU3dPOWE28f2DmJsg9as41fc1dddORumbEfI/edit'

Write-Host "Elevated Walt Media - Analytics authorization" -ForegroundColor Cyan
Write-Host ""
Write-Host "The web app is deployed with Anyone access, but Google still needs a one-time owner authorization." -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open the script editor:" -ForegroundColor White
Write-Host "   $editorUrl" -ForegroundColor Gray
Write-Host "2. In Code.gs, select function 'ping' in the toolbar, then click Run." -ForegroundColor White
Write-Host "3. Approve all requested permissions (Spreadsheets)." -ForegroundColor White
Write-Host "4. Deploy > Manage deployments > edit latest web app > set Who has access to Anyone > Deploy." -ForegroundColor White
Write-Host "5. Test the dashboard on the live site with Ctrl+Up Arrow." -ForegroundColor White
Write-Host ""
Write-Host "Analytics sheet:" -ForegroundColor White
Write-Host "   $sheetUrl" -ForegroundColor Gray
Write-Host ""
Start-Process $editorUrl
