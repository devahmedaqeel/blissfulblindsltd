@echo off
cd /d "C:\Users\user\Downloads\Blissful Blinds Co 369"
echo === Git Status ===
git status
echo.
echo === Staging all changes ===
git add -A
echo.
echo === Committing ===
git commit -m "SEO Optimization for Peterborough UK - Added Venetian & Made-to-Measure pages, updated Meta/Schemas/Sitemap, removed front-end Peterborough menu clutter while keeping page for SEO indexing"
echo.
echo === Pushing to blissfulblindsltd (ltd) ===
git push ltd main
echo.
echo === Also pushing to origin (blissfulblindsco369) ===
git push origin main
echo.
echo Done!
pause
