<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="/api/project/add" method="post">
        <input type="text" name="title">
        <input type="text" name="description">
        <input type="date" name="start_date">
        <input type="date" name="end_date">
        <input type="text" name="status">
        <input type="text" name="user_id">
        <input type="submit" placeholder="send">
    </form>
</body>

</html>