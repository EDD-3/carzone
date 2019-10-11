<?php

class Connection 
{
    protected $server='localhost';
    protected $user='root';
    protected $password='';
    protected $database='carzone';

    public function connect()
    {
        try {

            $cnx = new PDO("mysql:host=$this->server;dbname=$this->database",
                            $this->user,$this->password);
            return $cnx;
        } catch (PDOException $e) {
            echo $e;
            die();
            return null;
        }
    }
}