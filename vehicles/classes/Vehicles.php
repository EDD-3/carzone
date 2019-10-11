<?php

require_once('../config/database.php');

/*
    Clase que hereda la conexion a base de datos
*/
class Vehicles extends Connection
{

    /*
    Funcion que recibe un array de datos para su inserción
    */
    function insert($data)
    {
        $return_value = [
            'data'=>false,
            'error'=>false,
            'response'=>''
        ];
        $cnx = $this->connect();

        try
        {
            $statement = $cnx->prepare("INSERT INTO vehicles (model, engine, year, car_brand_id)
            VALUES (:model, :engine, :year, :car_brand_id)");
            $statement->execute($data);
        }
    
        catch(PDOException $e)
        {
            $return_value['error'] = true;
            $return_value['response']=$e->getMessage();
        }
        return $return_value;
    }

    function read()
    {
        $return_value = [
            'data'=>false,
            'error'=>false,
            'response'=>''
        ];

        $cnx = $this->connect();

        try
        {
            $statement = $cnx->prepare("SELECT * FROM vehicles");
            $statement->execute();
            $return_value['response'] = [];
            while($row = $statement->fetch(PDO::FETCH_ASSOC))
            {     
                array_push($return_value['response'],$row);
            }
        }
        catch(PDOException $e)
        {
            $return_value['error'] = true;
            $return_value['response']=$e->getMessage();
        }
        return $return_value;
    }

    function show($data)
    {
        $return_value = [
            'data'=>false,
            'error'=>false,
            'response'=>''
        ];

        $cnx = $this->connect();

        try
        {
            $statement = $cnx->prepare("SELECT * FROM vehicles WHERE id = :id");
            $statement->execute($data);
            $return_value['response'] = [];
            while($row = $statement->fetch(PDO::FETCH_ASSOC))
            {
                array_push($return_value['response'],$row);
            }
           
        }
        catch(PDOException $e)
        {
            $return_value['error'] = true;
            $return_value['response']=$e->getMessage();
        }
        return $return_value;
    }

    function update($data)
    {
        $return_value = [
            'data'=>false,
            'error'=>false,
            'response'=>''
        ];
        $cnx = $this->connect();

        try
        {
            $statement = $cnx->prepare("UPDATE vehicles SET model=:model, engine=:engine, year=:year, car_brand_id=:car_brand_id  WHERE id=:id");
            $statement->execute($data);
        }
        catch(PDOException $e)
        {
            $return_value['error'] = true;
            $return_value['response']=$e->getMessage();
        }
        return $return_value;
    }

    function delete($data)
    {
        $return_value = [
            'data'=>false,
            'error'=>false,
            'response'=>''
        ];

        $cnx = $this->connect();

        try
        {
            $statement = $cnx->prepare("DELETE FROM vehicles WHERE id=:id");
            $statement->execute($data);
        }
        catch(PDOException $e)
        {
            $return_value['error'] = true;
            $return_value['response']=$e->getMessage();
        }
        return $return_value;
    }
}