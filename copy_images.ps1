$OutputEncoding = [System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$sourceBase = "c:\Users\amna\Documents\my PC\design\7.صور المنتجات\المنتجات المطبوعة"
$destBase = "public\products\printed"

if (!(Test-Path $destBase)) {
    New-Item -ItemType Directory -Force -Path $destBase
}

$files = @(
    @{ Src = "دفتر كيوت لاطفال بنات\generated_image_c5fdabd8-26a9-4284-882b-65b84910fdd0.png"; Dst = "girls-notebook-1.png" },
    @{ Src = "دفتر كيوت لاطفال بنات\generated_image_c8ce8f66-2e55-432f-9144-3180860ad818.png"; Dst = "girls-notebook-2.png" },
    @{ Src = "دفتر للاطفال بتصميم الطيار\generated_image_15f7b261-6ba4-4494-8b62-2f450e5f6aa1.png"; Dst = "pilot-notebook-1.png" },
    @{ Src = "دفتر للاطفال بتصميم الطيار\generated_image_3ed342bf-e1d2-4b6c-84e9-90c84c70f692.png"; Dst = "pilot-notebook-2.png" },
    @{ Src = "صور دفتر الكتابة\دفتر الكتاب من الواجهة الغلاف.png"; Dst = "writing-notebook-cover.png" },
    @{ Src = "صور دفتر الكتابة\صورة من الداخل.png"; Dst = "writing-notebook-inner.png" }
)

foreach ($file in $files) {
    $fullSrc = Join-Path $sourceBase $file.Src
    $fullDst = Join-Path $destBase $file.Dst
    
    Write-Host "Copying: $fullSrc -> $fullDst"
    
    if (Test-Path -LiteralPath $fullSrc) {
        Copy-Item -LiteralPath $fullSrc -Destination $fullDst -Force
    }
    else {
        Write-Error "Source file not found: $fullSrc"
    }
}
