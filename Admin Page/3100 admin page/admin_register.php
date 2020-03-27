<?php
require 'dbconfig/config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>admin registration page</title>
    <link href="css/admin_login.css"  rel="stylesheet" >
</head>

<body style="background-color: #A9A9A9">

<!-- Page Wrapper -->
<div id="main-wrapper">
    <center>
        <h2 id="text-align"> Admin Registration</h2>
        <img src="image/bus.jpg" class="login-img"><br>

    </center>
    <form id="form-format" action="admin_register.php" method="post">
        <label for="fname" class="label-align">User ID:</label><br>
        <div class="input-box-container">
            <input type="text" name="username" id="input-box" placeholder="Your user id"><br><br>
        </div>
        <label for="lname" class="label-align">Password:</label><br>
        <div class="input-box-container">
            <input type="password" name="password" id="input-box" placeholder="Your password"><br><br>
        </div>
        <label for="confirm-pw" class="label-align">Confirm Password:</label><br>
        <div class="input-box-container">
            <input type="password" name="confirm-pw" id="input-box" placeholder="Confirm password"><br><br>
            <input type="submit" value="Sign up" name="sign-up" id="button-sign-in"><br>
        </div>
        <p id="button-sign-up">Back to Login page <a href='admin_login.php'>login page here!</a></p>
    </form>
    <script></script>
    <?php
    if(isset($_POST['sign-up']))
    {
        $username =$_POST['username'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm-pw'];

        if($confirm_password==$password){
            $query="select * from user WHERE username='$username'";
            $result= mysqli_query($con,$query);
            if(mysqli_num_rows($result)>0){
                echo '<script type="text/javascript"> alert("User already exists")</script> ';

            }else{

                $query = "insert into user values('$username','$password')";
                $query_run = mysqli_query($con,$query);

                if($query_run){
                    echo '<script type="text/javascript"> alert("User registerd.. Go back to login page")</script> ';
                }else{
                    echo '<script type="text/javascript"> alert("Error!")</script> ';
                }
            }
        }else{
            echo ' <script type="text/javascript"> alert("confirm password not the same")</script>' ;
        }
    }
    ?>
</div>

</body>

</html>
