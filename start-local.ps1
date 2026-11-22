param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot

function Test-LocalPort([int]$PortNumber) {
    $client = [Net.Sockets.TcpClient]::new()
    try {
        $task = $client.ConnectAsync('127.0.0.1', $PortNumber)
        return $task.Wait(350) -and $client.Connected
    } catch {
        return $false
    } finally {
        $client.Dispose()
    }
}

function Wait-LocalPort([int]$PortNumber, [int]$Seconds) {
    $deadline = (Get-Date).AddSeconds($Seconds)
    while ((Get-Date) -lt $deadline) {
        if (Test-LocalPort $PortNumber) { return $true }
        Start-Sleep -Milliseconds 500
    }
    return $false
}

if (-not (Test-LocalPort 3306)) {
    $mysql = Get-ChildItem 'C:\laragon\bin\mysql' -Filter mysqld.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    $dataDirectory = 'C:\laragon\data\mysql'
    if ($mysql -and (Test-Path -LiteralPath $dataDirectory)) {
        Write-Host 'Menyalakan MySQL Laragon...'
        Start-Process -FilePath $mysql.FullName -ArgumentList "--datadir=$dataDirectory",'--port=3306','--log_syslog=0' -WorkingDirectory $mysql.DirectoryName -WindowStyle Hidden | Out-Null
        if (-not (Wait-LocalPort 3306 35)) { Write-Warning 'MySQL belum siap. Halaman publik tetap bisa dibuka, tetapi dashboard membutuhkan database.' }
    } else {
        Write-Warning 'MySQL Laragon tidak ditemukan. Nyalakan database secara manual sebelum memakai dashboard.'
    }
}

if (-not (Test-LocalPort $Port)) {
    $php = (Get-Command php -ErrorAction SilentlyContinue).Source
    if (-not $php) { throw 'PHP tidak ditemukan di PATH. Jalankan melalui terminal Laragon atau tambahkan PHP ke PATH.' }
    Write-Host "Menyalakan website di port $Port..."
    Start-Process -FilePath $php -ArgumentList '-S',"127.0.0.1:$Port",'-t',$projectRoot,(Join-Path $projectRoot 'router.php') -WorkingDirectory $projectRoot -WindowStyle Hidden | Out-Null
    if (-not (Wait-LocalPort $Port 12)) { throw "Server PHP gagal aktif di port $Port." }
}

$baseUrl = "http://localhost:$Port"
Write-Host ''
Write-Host 'The Glyn Physio siap dijalankan:' -ForegroundColor Green
Write-Host "Website : $baseUrl/"
Write-Host "Dashboard: $baseUrl/admin/login.html"
