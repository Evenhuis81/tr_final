<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- TODO: icons worden al via app.js ge-include, zouden hier weg moeten maar dan werken ze niet meer -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css">

    @vite(['resources/js/app.ts'])
    <title>{{env('APP_NAME')}}</title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
