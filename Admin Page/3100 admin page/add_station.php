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
        <h2>add station</h2><br><br>
        <form method="post" action="add_station.php">
            <label for="fname" class="label-align">route no :</label>
            <input type="text" name="route_id" placeholder="Type the route no."><br><br>
            <label for="fname" class="label-align">station id:</label>
            <input type="text" name="station_id" placeholder="Type the station id"><br><br>
            <label for="fname" class="label-align">route order:</label>
            <input type="number" name="route_order" placeholder="Type the route order"><br><br>
            <input type="submit" name="submit" value="submit">
        </form>
    </div>

    <?php
    if(isset($_POST['submit'])){

        $route_id=$_POST['route_id'];
        if(empty($route_id)){
            echo '<script type="text/javascript"> alert("the route id cannot be empty")</script> ';
        }else{
            $query="select * from bus WHERE route_no='$route_id'";
            $query_run=mysqli_query($con,$query);
            if(mysqli_num_rows($query_run)>0){
                $station_id=$_POST['station_id'];
                $route_order=$_POST['route_order'];
                if(empty($station_id)){
                    echo '<script type="text/javascript"> alert("the station id cannot be empty")</script> ';
                }
                else if(empty($route_order)){
                    echo '<script type="text/javascript"> alert("the route order cannot be empty")</script> ';
                }else{
                    $query="select * from stations_routes WHERE station_id='$station_id'";
                    $query_run=mysqli_query($con,$query);
                    if(mysqli_num_rows($query_run)>0){
                        echo '<script type="text/javascript"> alert("the station id has been already exist ,station_id should be unique ,please go to update station page ")</script> ';
                    }else{
                        $query="select * from stations_routes WHERE route_id='$route_id' and route_order='$route_order'";
                        $query_run=mysqli_query($con,$query);
                        if(mysqli_num_rows($query_run)){
                            echo '<script type="text/javascript"> alert("the order of this route no. has already exist,please got to update station page ")</script> ';
                        }else{
                            $query = "insert into stations_routes values('$route_id','$station_id','$route_order')";
                            $query_run = mysqli_query($con,$query);
                            if($query_run){
                                echo '<script type="text/javascript"> alert("station added!")</script> ';

                            }else{
                                echo '<script type="text/javascript"> alert("Error!")</script> ';
                            }
                        }

                    }
                }
            }else{
                echo '<script type="text/javascript"> alert("the route no. does not exist ,bus no. should be unique ,please go to edit page ")</script> ';
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
