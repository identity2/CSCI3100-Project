<?php
require 'dbconfig/config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>admin login page</title>
    <link href="css/admin_login.css"  rel="stylesheet" >
</head>

<body style="background-color: #A9A9A9">

<!-- Page Wrapper -->
<div id="main-wrapper">
    <center>
        <h2 id="text-align"> Admin Loin</h2>
        <img src="img/bus.jpg" class="login-img"><br>

    </center>
    <form id="form-format" action="admin_login.php" method="post">
        <label for="fname" class="label-align">User ID:</label><br>
        <div class="input-box-container">
            <input type="text" name="username" id="input-box" placeholder="Type your user id"><br><br>
        </div>
        <label for="lname" class="label-align">Password:</label><br>
        <div class="input-box-container">
            <input type="password" name="password" id="input-box" placeholder="Type your password"><br><br>
            <input type="submit" value="Sign in" name="sign-in" id="button-sign-in"><br>
            <p id="button-sign-up">Not registered yet? <a href='admin_register.php'>Register Here</a></p>
        </div>
    </form>
    <?php
    if(isset($_POST['sign-in']))
    {
        $username =$_POST['username'];
        $password = $_POST['password'];
        $query="select * from user WHERE username='$username'and password = '$password'";
        $query_run=mysqli_query($con,$query) or die("Error!");
        if(mysqli_num_rows($query_run)>0){

            $_SESSION['username']=$username;
            header('location:index.php');
        }else{

            echo '<script type="text/javascript"> alert("User id or password are not correct! Please try again")</script> ';
        }
    }
    ?>
</div>

</body>

</html>
