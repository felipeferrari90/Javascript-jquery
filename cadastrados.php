<?php
    $id = isset($_POST["id"]) ? $_POST["id"] : "nao declarado";
    $nome = isset($_POST["nome"]) ? $_POST["nome"] : "nao declarado";
    $idade = isset($_POST["idade"]) ? $_POST["idade"] : "nao declarado";
    $cidade = isset($_POST["cidade"]) ? $_POST["cidade"] : "nao declarado";

    //organizando requisicoes em um array 
    $cadastrados = array("usuario"=> $id, "nome" => $nome , "idade" => $idade , "cidade" => $cidade);
    
    //encodar - transformar em json , decodar seria pegar o json e transformar em array
    //o json em si é um grande arquivo em formato string tambem
    echo (json_encode($cadastrados));  

?>    

