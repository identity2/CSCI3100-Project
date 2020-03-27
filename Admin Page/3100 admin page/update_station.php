<?php
require 'dbconfig/config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SB Admin 2 - Dashboard</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body id="page-top">

<!-- Page Wrapper -->
<div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.php">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a class="nav-link" href="index.php">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Home Page</span></a>
        </li>

        <!-- Divider -->

        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Interface
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Edit route</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Edit:</h6>
                    <a class="collapse-item" href="add_route.php">add route</a>
                    <a class="collapse-item" href="delete_route.php">delete</a>
                </div>
            </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>station edit</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom edit:</h6>
                    <a class="collapse-item" href="add_station.php">add station</a>
                    <a class="collapse-item" href="delete_station.php">delete station</a>
                    <a class="collapse-item" href="update_station.php">Update station</a>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-folder"></i>
                <span>Pages</span>
            </a>
            <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Login Screens:</h6>
                    <a class="collapse-item" href="admin_login.php">Login</a>
                    <a class="collapse-item" href="admin_register.php">Register</a>
                    <div class="collapse-divider"></div>
                </div>
            </div>
        </li>

        <!-- Nav Item - Charts -->
        <li class="nav-item">
            <a class="nav-link" href="charts.html">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Charts</span></a>
        </li>

        <!-- Nav Item - Tables -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapstable" aria-expanded="true" aria-controls="collapstable">
                <i class="fas fa-fw fa-wrench"></i>
                <span>table</span>
            </a>
            <div id="collapstable" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">table show:</h6>
                    <a class="collapse-item" href="bus_tables.php">bus table</a>
                    <a class="collapse-item" href="station_table.php">station table</a>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div>
        <h2>update station</h2><br><br>
        <form method="post" action="update_station.php">
            <input type="submit" name="change_station" value="change station id">
            <input type="submit" name="swap_route_order" value="swap route order">
            <input type="submit" name="change_route_order" value="change route order">
        </form>
        <?php
        if(isset($_POST['change_station'])){
            echo '
        <form method="post" action="update_station.php">
            <label for="fname" class="label-align">route no :</label>
            <input type="text" name="route_id" placeholder="Type the route no."><br><br>
            <label for="fname" class="label-align">old station id:</label>
            <input type="text" name="old_station" placeholder="Type old station id"><br><br>
            <label for="fname" class="label-align">new station id:</label>
            <input type="text" name="new_station" placeholder="Type new station id"><br><br>
            <input type="submit" name="submit_station_id" value="submit">
        </form>';
        }else if(isset($_POST['change_route_order'])){
            echo '
        <form method="post" action="update_station.php">
            <label for="fname" class="label-align">route no :</label>
            <input type="text" name="route_id" placeholder="Type the route no."><br><br>
            <label for="fname" class="label-align">old station id:</label>
            <input type="number" name="old_order" placeholder="Type old route order"><br><br>
            <label for="fname" class="label-align">new station id:</label>
            <input type="number" name="new_order" placeholder="change to"><br><br>
            <input type="submit" name="submit_change_order" value="submit">
        </form>';
        }else if(isset($_POST['swap_route_order'])){
            echo '
        <form method="post" action="update_station.php">
            <label for="fname" class="label-align">route no :</label>
            <input type="text" name="route_id" placeholder="Type the route no."><br><br>
            <label for="fname" class="label-align">old station id:</label>
            <input type="number" name="old_order" placeholder="swap route order"><br><br>
            <label for="fname" class="label-align">new station id:</label>
            <input type="number" name="new_order" placeholder="the other route order"><br><br>
            <input type="submit" name="submit_swap_order" value="submit">
        </form>';
        }

        ?>
    </div>
    <?php
    if(isset($_POST['submit_station_id'])){
        $old_station=$_POST['old_station'];
        $new_station=$_POST['new_station'];
        $route_id=$_POST['route_id'];
        if(empty($route_id)){
            echo '<script type="text/javascript"> alert("the route id cannot be empty")</script> ';
        }else {
            $query="select * from stations_routes WHERE route_id='$route_id'";
            $query_run=mysqli_query($con,$query);
            if(mysqli_num_rows($query_run)>0){
                if(empty($old_station)){
                    echo '<script type="text/javascript"> alert("the old station id cannot be empty")</script> ';
                }else if(empty($new_station)){
                    echo '<script type="text/javascript"> alert("the new station id cannot be empty")</script> ';
                }else{
                    $query="select * from stations_routes WHERE route_id='$route_id' and station_id='$old_station'";
                    $query_run=mysqli_query($con,$query);
                    if(mysqli_num_rows($query_run)>0){
                        $query="select * from stations_routes WHERE route_id='$route_id' and station_id='$new_station'";
                        $query_run=mysqli_query($con,$query);
                        if(mysqli_num_rows($query_run)>0){
                            echo '<script type="text/javascript"> alert("the new station id is already exist!")</script> ';
                        }else{
                            $query="UPDATE stations_routes SET station_id='$new_station' where station_id='$old_station' and route_id='$route_id'";
                            $query_run=mysqli_query($con,$query);
                            if($query_run){
                                echo '<script type="text/javascript"> alert("station id updated")</script> ';
                            }else{
                                echo '<script type="text/javascript"> alert("Error")</script> ';
                            }
                        }
                    }else{
                        echo '<script type="text/javascript"> alert("old station does not exist in the route !please enter the right station id or go to add station page")</script> ';
                    }
                }
            }else{
                echo '<script type="text/javascript"> alert("the route id does not exist!please enter the right route id or go to add route page")</script> ';
            }
        }
    }else if(isset($_POST['submit_change_order'])){
        $old_order=$_POST['old_order'];
        $new_order=$_POST['new_order'];
        $route_id=$_POST['route_id'];
        if(empty($route_id)){
            echo '<script type="text/javascript"> alert("the route id cannot be empty")</script> ';
        }else {
            $query="select * from stations_routes WHERE route_id='$route_id'";
            $query_run=mysqli_query($con,$query);
            if(mysqli_num_rows($query_run)>0){
                if(empty($old_order)){
                    echo '<script type="text/javascript"> alert("the old order cannot be empty")</script> ';
                }else if(empty($new_order)){
                    echo '<script type="text/javascript"> alert("the new order id cannot be empty")</script> ';
                }else{
                    $query="select * from stations_routes WHERE route_id='$route_id' and route_order='$old_order'";
                    $query_run=mysqli_query($con,$query);
                    if(mysqli_num_rows($query_run)>0){
                        $query="select * from stations_routes WHERE route_id='$route_id' and route_order ='$new_order'";
                        $query_run=mysqli_query($con,$query);
                        if(mysqli_num_rows($query_run)>0){
                            echo '<script type="text/javascript"> alert("the new order id has been already exist!please enter a empty order or press swap button")</script> ';
                        }else{
                            $query="UPDATE stations_routes SET route_order='$new_order' where route_order='$old_order' and route_id='$route_id'";
                            $query_run=mysqli_query($con,$query);
                            if($query_run){
                                echo '<script type="text/javascript"> alert("route order updated")</script> ';
                            }else{
                                echo '<script type="text/javascript"> alert("Error")</script> ';
                            }
                        }
                    }else{
                        echo '<script type="text/javascript"> alert("the order does not exist in the route !please enter the right station id or go to add station page")</script> ';
                    }
                }
            }else{
                echo '<script type="text/javascript"> alert("the route id does not exist!please enter the right route id or go to add route page")</script> ';
            }
        }
    }else if(isset($_POST['submit_swap_order'])){
        $old_order=$_POST['old_order'];
        $new_order=$_POST['new_order'];
        $route_id=$_POST['route_id'];
        if(empty($route_id)){
            echo '<script type="text/javascript"> alert("the route id cannot be empty")</script> ';
        }else {
            $query="select * from stations_routes WHERE route_id='$route_id'";
            $query_run=mysqli_query($con,$query);
            if(mysqli_num_rows($query_run)>0){
                if(empty($old_order)){
                    echo '<script type="text/javascript"> alert("the old order cannot be empty")</script> ';
                }else if(empty($new_order)){
                    echo '<script type="text/javascript"> alert("the new order id cannot be empty")</script> ';
                }else{
                    $query="select * from stations_routes WHERE route_id='$route_id' and route_order='$old_order'";
                    $query_run=mysqli_query($con,$query);
                    if(mysqli_num_rows($query_run)>0){
                        $query="select * from stations_routes WHERE route_id='$route_id' and route_order ='$new_order'";
                        $query_run=mysqli_query($con,$query);
                        if(mysqli_num_rows($query_run)>0){
                            $query="UPDATE stations_routes SET route_order='-10' where route_order='$new_order' and route_id='$route_id'";
                            $query_run=mysqli_query($con,$query);
                            $query="UPDATE stations_routes SET route_order='$new_order' where route_order='$old_order' and route_id='$route_id'";
                            $query_run=mysqli_query($con,$query);
                            $query="UPDATE stations_routes SET route_order='$old_order' where route_order=-10 and route_id='$route_id'";
                            $query_run=mysqli_query($con,$query);
                            if($query_run){
                                echo '<script type="text/javascript"> alert("route order updated")</script> ';
                            }else{
                                echo '<script type="text/javascript"> alert("Error")</script> ';
                            }
                        }else{
                            echo '<script type="text/javascript"> alert("the second swap order id does not exist!please enter a empty order or press swap button")</script> ';

                        }
                    }else{
                        echo '<script type="text/javascript"> alert("the first swap order does not exist in the route !please enter the right station id or go to add station page")</script> ';
                    }
                }
            }else{
                echo '<script type="text/javascript"> alert("the route id does not exist!please enter the right route id or go to add route page")</script> ';
            }
        }
    }
    ?>




    <!-- End of Main Content -->

    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2020</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-primary" href="admin_login.php">Logout</a>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin-2.min.js"></script>

<!-- Page level plugins -->
<script src="vendor/chart.js/Chart.min.js"></script>

<!-- Page level custom scripts -->
<script src="js/demo/chart-area-demo.js"></script>
<script src="js/demo/chart-pie-demo.js"></script>

</body>

</html>