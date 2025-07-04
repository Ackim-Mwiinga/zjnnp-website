$essentialPages = @(
    "Home.jsx",
    "Login.jsx",
    "Register.jsx",
    "Dashboard.jsx",
    "ProfileSetup.jsx",
    "SubmitArticle.jsx",
    "ReviewQueue.jsx",
    "EditorDashboard.jsx",
    "AdminDashboard.jsx",
    "NotFound.jsx",
    "Unauthorized.jsx"
)

# Get all files in pages directory
$allFiles = Get-ChildItem -Path "frontend\src\pages" -File

# Remove files that are not in the essential list
foreach ($file in $allFiles) {
    if (-not ($essentialPages -contains $file.Name)) {
        Write-Host "Removing: $($file.FullName)"
        Remove-Item -Path $file.FullName -Force
    }
}
