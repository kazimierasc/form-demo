<?php

namespace formDemo;

class Accommodation
{
    private $database;
    private $table = 'accommodation';

    public function __construct()
    {
        $this->database = new Database();
    }

    public function getById($id = null)
    {
        $query = "SELECT * FROM {$this->table} WHERE id=?";
        $parameters = [$id];
        return $this->database->select($query, $parameters);
    }
}
