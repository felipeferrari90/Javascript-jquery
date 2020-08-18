<?php
    $color = isset($_GET['color']) ? $_GET['color'] : "white";
    echo($_GET['color']);
?>
    <div id="square-5" style="width: 100px ; height: 100px;
     margin: 20px auto ; background-color:<?= $color ?>;" ></div>  




<!--          

SE VOCÊ PUDESSE CARREGAR ESSA PAGINA, 
TODO O RESULTADO QUE ELA FOSSE EXIBIR 
(SENDO EM ECHO OU HTML NELA) ESTARIA CONTIDO
NO RESPONSE DESSA FUNCAO QUE O AJAX CHAMOU

(no caso o response é apenas o html do quadrado em relacao a cor que foi getada)

-->