<!DOCTYPE html>
<html class="html-page" lang="en">
    <head>
        <meta charset='UTF-8'>
        <title>Grocery-Store</title>

        <link rel='stylesheet' href='index-style.css'>
        <link rel='stylesheet' href='style-components/main.css'>

        <script src="/scripts/jquery_lib.js" type="text/javascript"></script>
        <script src="/scripts/index.js" type="text/javascript"></script>
        <script src="/scripts/basket.js" type="text/javascript"></script>
        <script src="/scripts/postcard.js" type="text/javascript"></script>
        <script src="/scripts/form_sign_up.js" type="text/javascript"></script>
    </head>
    <body>

        <?php include './components/header/header.php' ?>

        <?php include './components/header/authorization-win.php' ?>
        <?php include './components/header/location-nearby-store-win.php' ?>

        <div class="page-body">
            <?php include './components/header/window-catalog.php' ?>
            <?php include './components/main/main.php'?>
        </div>
        <?php include './components/footer/footer.php'?>

    </body>
</html>

