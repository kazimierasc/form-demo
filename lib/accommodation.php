<?php

namespace formDemo;

class Accommodation
{
    private $database;
    private $table = 'accommodation';
    private $propertyType = ['room','appartment','house'];
    private $target = ['all','local','foreign'];

    private $schema = [
        'propertyType'=>'Enum',
        'city'=>'Text',
        'capacity'=>'Text',
        'address'=>'Text',
        'description'=>'Text',
        'lat'=>'Text',
        'lon'=>'Text',
        'target'=>'Enum'
    ];

    private function validateText($input)
    {
        if (strlen($input)<1 || strlen($input)>30000) {
            return false;
        }
        return $input;
    }

    private function validateEnum($input, $nameOfColumn)
    {
        if (in_array($input, $this->$nameOfColumn)) {
            return $input;
        } else {
            return false;
        }
    }

    public function __construct()
    {
        $this->database = new Database();
    }

    public function getById($id = null)
    {
        $query = "SELECT * FROM {$this->table} WHERE id=?";
        $parameters = [$id];
        return $this->database->execute($query, $parameters);
    }

    public function validate($contents)
    {
        if (count($contents) != 8) {
            return false;
        }
        foreach ($contents as $column => $value) {
            $method = 'validate'.$this->schema[$column];
            if (!$this->$method($value,$column)) {
                return false;
            }
        }
        return true;
    }

    public function insert($contents)
    {
        $commaSeparatedColumns = '';
        $commaSeparatedQuestionmarks = '';
        $parameters = [];
        $z = 0;
        foreach ($contents as $column => $value) {
            if ($this->schema[$column]) {
                if ($z > 0) {
                    $commaSeparatedColumns .= ',';
                    $commaSeparatedQuestionmarks .= ',';
                }
                $commaSeparatedColumns .= '`'.$column.'`';
                $commaSeparatedQuestionmarks .= '?';
                array_push($parameters, $value);
                $z++;
            }
        }
        $sql = "INSERT INTO {$this->table} ({$commaSeparatedColumns}) VALUES ({$commaSeparatedQuestionmarks});";
        $result = $this->database->execute($sql, $parameters, 'fetch_id');
        return $result;
    }
}
