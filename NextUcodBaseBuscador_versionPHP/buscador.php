<?php

if (isset($_POST["ciudad"]))
  $ciudadBuscar = $_POST["ciudad"];
if (isset($_POST['tipo']))
  $tipoBuscar = $_POST['tipo'];
if (isset($_POST['precio']))
  $precioBuscar = $_POST['precio'];


$data = file_get_contents("data-1.json");
$jsonData = json_decode($data);
$jsonResponse = [];


foreach ($jsonData as $key => $obj) {
  $Id = $obj->Id;
  $Direccion = $obj->Direccion;
  $Ciudad = $obj->Ciudad;
  $Telefono = $obj->Telefono;
  $Codigo_Postal = $obj->Codigo_Postal;
  $Tipo = $obj->Tipo;
  $Precio = $obj->Precio;
  
  if (isset($ciudadBuscar) && $ciudadBuscar != ''  && $ciudadBuscar != 'select' && $ciudadBuscar != $Ciudad) {
     continue;
  }

  
  if (isset($tipoBuscar) && $tipoBuscar != ''   && $tipoBuscar != 'select'  && $tipoBuscar != $Tipo) {
    
    continue;

    
  }

  
  if (isset($precioBuscar)) {
    $inicio = intval(explode(";", $precioBuscar)[0]);
    $fin = intval(explode(";", $precioBuscar)[1]);
    $Precio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $Precio)));
    if ($Precio < $inicio || $Precio > $fin) {
      continue;
    }
  }
  
  array_push($jsonResponse, $obj);
}

echo json_encode($jsonResponse);
