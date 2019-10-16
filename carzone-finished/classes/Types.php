<?php

require_once('../config/database.php');

/*
    Clase que hereda la conexion a base de datos
*/
class Types extends Connection
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
            $statement = $cnx->prepare("INSERT INTO product_types (type)
            VALUES (:type)");
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
            $statement = $cnx->prepare("SELECT * FROM product_types");
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
            $statement = $cnx->prepare("SELECT * FROM product_types WHERE id = :id");
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
            $statement = $cnx->prepare("UPDATE product_types SET type=:type  WHERE id=:id");
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
            $statement = $cnx->prepare("DELETE FROM product_types WHERE id=:id");
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