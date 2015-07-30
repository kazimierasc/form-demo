<?php
namespace formDemo;

class Database
{
    private $host = DB_HOST;
    private $user = DB_USER;
    private $password = DB_PASSWORD;
    private $name = DB_NAME;
    private $connection;

    public function __construct()
    {
        $options = array(\PDO::ATTR_PERSISTENT => true);
        $connectionString = 'mysql:host='.$this->host.';dbname='.$this->name.';charset=utf8';
        $this->connection = new \PDO($connectionString, $this->user, $this->password, $options);
    }

    private function getConnection()
    {
        return $this->connection;
    }

    public function execute($sql, $inputParameters = null, $post = 'fetch_assoc')
    {
        if (isset($sql)) {
            $sql = $this->connection->prepare($sql);
            if ($inputParameters==null) {
                $sql->execute();
            } else {
                $sql->execute($inputParameters);
            }
            if ($post == 'fetch_assoc') {
                $result = $sql->fetchAll(\PDO::FETCH_ASSOC);
                return $result;
            } elseif ($post == 'fetch_id') {
                return ['id'=>$this->connection->lastInsertId()];
            } else {
                return true;
            }
            
        } else {
            return false;
        }
    }
}
