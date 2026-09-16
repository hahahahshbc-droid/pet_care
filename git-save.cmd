@echo off
setlocal
cd /d "%~dp0"

set "EXIT_CODE=1"

git -c safe.directory="%CD%" rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [Git] This folder is not a Git repository.
  goto :finish
)

git -c safe.directory="%CD%" add -A
if errorlevel 1 (
  echo [Git] Failed to stage changes.
  goto :finish
)

git -c safe.directory="%CD%" diff --cached --quiet
if not errorlevel 1 (
  echo [Git] No changes to save.
  set "EXIT_CODE=0"
  goto :finish
)

git -c safe.directory="%CD%" -c user.name="Codex" -c user.email="codex@local" commit -m "Quick save"
if errorlevel 1 (
  echo [Git] Failed to create the commit.
  goto :finish
)

git -c safe.directory="%CD%" push
if errorlevel 1 (
  echo [Git] The commit was saved locally, but the push failed.
  goto :finish
)

echo [Git] Saved locally and pushed to GitHub successfully.
set "EXIT_CODE=0"

:finish
if /I not "%~1"=="--no-pause" pause
exit /b %EXIT_CODE%
