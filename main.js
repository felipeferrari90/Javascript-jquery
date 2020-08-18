// JQUERY

/************************** 1 - CONCEITOS BASICOS *************************** */

//document.queryselectorAll(".container") ou document.getElementsByClass =
    $(".container") 

//ADICIONANDO CLASSES A ELEMENTOS
    $("div").addClass("container");
    $("div > ul").addClass("lista");
    $(".container .lista li").addClass("item");

//ADICIONANDO CSS A ELEMENTOS
    $(".container").css({                        //se o seletor tiver mais de um resultado
        'background-color': 'rgb(220,220,220)',   //ele modificara todos 
        'text-align': 'center',
        'margin' : "20px auto"
    });

    $(".lista").css({'background-color': 'rgb(190,190,190)'});

    $(".item").css({
        'background-color': 'rgb(150,150,150)',
        'margin-bottom': "+=10"                      //padding atual + 10
    });

//SELETORES ESPECIAIS JQUERY

    // :header é um dos seletores css especiais do jquery que referencia todos os h1 até todos os h6
    $(":header").css({"text-align" : "center"});



//CRIAR ATRIBUTO A ELEMENTO

    //(adicionaremos um id a lista do primeiro container)
    //armazenando consultas jquery em variaveis, a variavel armazeniza um ponteiro
    $container1 = $(".container");  

    //o caso anterior vai pegar varios ponteiros, mas só queremos atribuir o id a um
    $container1v2 = $(".container").first();
    console.log($container1);

    //criando atributo e valor do elemento via jquery ao primeiro elemento apenas
    $container1v2.attr("id", "container-1");  
    console.log($container1v2);

    //se vc setar um atributo vc pode usar a mesma funçao attr tbm

    //.first() e .slice() são metodos jquery para retornar indices especificos e nao todos 
     
//

//ACESSANDO CONTEUDO DOS ELEMENTOS
     
    //.text()
        
        //retornando conteudo dos 4 itens
        console.log($("#container-1 .item").text());   //item 1item 2item3 item4
        
        //editando o conteudo do terceiro elemento da lista
        $("#container-1 .lista .item:nth-child(3)").text("item 3 Editado");
    
    //.html()

        //pegando o html do item com conteudo
        console.log($(".container .lista .item").html());   //item 1
        $itemNovo = $(".container .lista .item:last-child").html();    
        
        //EM SELECOES DE JQUERY QUANDO SE É PRA RETORNAR VALORES OU ARMAZENAR EM VARIAVEL, SOMENTE É 
        //ARMAZENADO O PRIMEIRO RESULTADO, FORA ISSO SE FOR PRA FAZER MUDANCAS. AI SE APLICA A TODOS

        //as tags filhos html sao retornadas, e se os filhos tiverem filhos tambem... e assim por diante...
        console.log($(".container .lista").html());   //lista 1 <li class="item">item 1 ... item 4</li>      
        $("#container-1 .lista").append("<li>"+$itemNovo+"</li>");


        //aninhando + de 1 funcao jquery em apenas uma consulta
        $("#container-1 .lista li:last-child")
        .addClass("item")
        .css({'background-color': 'rgb(150,150,150)'})
        .text("item 5 Criado");

        //PREPEND = aciona elemento como o primeiro filho
        //APPEND = aciona elemento como o ultimo filho
        
    //    

/************************************** 2 - EVENTOS *************************************/    

//copiando toda a lista 1 em uma variavel e adicionando ao container 2
    $lista2 = $("#container-1 .lista").clone();   // metodo que clona todo em html 
    $("#container-2").append($lista2);   

//esvaziando todos os filhos 
    $("#container-2 .lista").empty();
    $("#container-2 .lista").text("lista 2");

//adcionando botoes no container
    $("#container-2").append("<a class='botao' id='append'>APPEND</a>");
    $("#container-2").append("<a class='botao' id='prepend'>PREPEND</a>");    
    $("#container-2").append("<a class='botao' id='before'>BEFORE</a>");    
    $("#container-2").append("<a class='botao' id='after'>AFTER</a>");        

//adicionando eventos nos botoes 

    //toda vez que um botao for clicado ele cria um item 
    var indiceItem = 1;
    $lista2 =  $("#container-2 .lista");
    
    
    $("#container-2 .lista .item").css({'background-color': 'rgb(150,150,150)'});

    $("#append").on("click", ()=>{
        $($lista2).append("<li class='item'>item-"+indiceItem+"-append</li>");
        indiceItem++;   
    });

    $("#prepend").on('click', ()=>{
        $($lista2).prepend("<li class='item'>item-"+indiceItem+"-prepend</li>");
        indiceItem++;   
    });

    $("#before").on('click', ()=>{
        $lista2.before("<li class='item'>item-"+indiceItem+"-after</li>");
        indiceItem++;
    });

    $("#after").on('click', ()=>{
        $lista2.after("<li class='item'>item-"+indiceItem+"-before</li>");
        indiceItem++;
    });
    

/***************************** 3 - ANIMACOES *************************************/ 

//jquery oferece um metodo de foreach
    $("#container-3 .lista li").each( function() {   //.each n funciona com lambida ()=>
        $(this).addClass("animado");
    });

//filho:gt(n) - funcona pra todos maiores que n
//filho:lt(n) - funcona pra todos menores que n
    $("#container-3 .lista .animado:lt(5)").css({"cursor":"pointer"});

//filho.eq(n) - funcona pro filho igual a n
    $("#container-3 .lista .animado").eq(0).on("mouseenter",(e)=>{
        $(e.target).fadeOut(1500);        //assim que se usa o obj event
    });
   
    $("#container-3 .lista .animado").eq(1).on("mouseenter",(e)=>{
        $("#container-3 .lista .animado").eq(0).fadeIn(1500);      
    });

//toogleClass - remove e add a classe 
    $("#container-3 .lista .animado").eq(2).on("click",(e)=>{
        $(e.target).toggleClass("green");     
    });

//animate({estilo que quero mudar}[,speed][,easing][,complete]) 
    
    //easing é velocidade da animacao(uniforme), complete é o callback apos a animacao acabar

    $("#container-3 .lista .animado").eq(3).on("mouseenter",(e)=>{
        $(e.target).animate(
            { "padding-left":"+=40"}
            ,1000,
            "linear"
        );  
    });

/***************************** 4 - AJAX ******************************************/ 

//recarregando apenas a lista ul do container 3 sem carregar a pagina toda (AJAX)

    /* CORS POLICE google - os navegadores bloqueiam açoes de ajax atraves do protocolo
    FILE (C:///file/desktop ...), nesse caso só funciona através de um servidor
    mesmo sendo um servidor local
    */

    //copiando a lista 3 na renderizacao dela antes de sofrer alteracoes dos eventos
    $itenslista3 = $("#container-3 .lista .animado").clone();

    $("#container-3 .lista .animado").eq(4).on("click",(e)=>{
        $("#container-3 .lista").html($itenslista3);
    });

    //isso nao é um AJAX, afinal o elemento que foi pego foi da rópria pagina

//AJAX É O ATO de pegar um elemento html de uma pagina e altera-lo sem mudar a pagina

//mas antes - removendo margin do .container do elemento 4
    $("#container-4").css({"width":"85%"});
    $("#botoes-4").css({"width":"85%"});

    //.LOAD()  ========================>

        $("#botoes-4 .botao").eq(2).on("click", (e)=> {                            
            $("#botoes-4 span.atual").removeClass("atual");      //cancela o span que tem o atual
            $(e.target).addClass("atual");                       //coloca o atual nesse elemento
        
            $("#content-4").empty();                             //esvazia o conteudo do elemento atual
            $("#container-4 #content-4").load("ajax.html #content-4-blue");                        
        });                                               //o load carrega o elemento da pag informada
                                                          
    
    //criando para os outros spans

    //obs: o arquivo ajax.html nao tem a classe .red declarada nos seus styles
    //porem os elemento dele possue, a classe dos elementos fora da pagina sao sobrescrevidas
    //pelas declaracoes no arquivo .html que ela foi ajaxciada (o elemento pega o .red da 
    // classe main.html mesmo )

        $("#botoes-4 .botao").eq(1).on("click", (e)=> {                             
            $("#botoes-4 span.atual").removeClass("atual");      
            $(e.target).addClass("atual");                       
        
            $("#content-4").empty();                             
            $("#container-4 #content-4").load("ajax.html #content-4-red");                        
        });                                              
          
    // o content-4 tecnicamente foi esvaziado porem ao se dar .load()
    //nele novamente ele carregou seu conteudo como era por default
    // mesmo procedimento usado para a lista 3 acima

        $("#botoes-4 .botao").eq(0).on("click", (e)=> {                             
            $("#botoes-4 span.atual").removeClass("atual");      
            $(e.target).addClass("atual");                       
            $("#content-4").empty();                             
            $("#container-4 #content-4").load("#container-4 #content-4");                        
        });    

    //.GET()  ========================>
    
        $("#botoes-5 .botao").on("click" , (e) => {
            $color = $(e.target).text();  
            $.ajax({
                type: "GET",
                url: "ajax.php",
                data: {"color": $color },    //data => parametros da requisao GET
                success: function (response) {
                    $("#container-5 #container-square").empty();
                    $("#container-5 #container-square").append(response);
                }
            })
        });
   
    //.POST()  ========================>
        
        $idCadastro = 1;

        $("#formulario-6 > .botao").on("click", ()=>{
            $.ajax({
                type: "POST",
                url: "cadastrados.php",
                data: {
                    "id": $idCadastro,
                    "nome": $("#formulario-6 input[name='nome']").val(),
                    "idade": $("#formulario-6 input[name='idade']").val(),
                    "cidade": $("#formulario-6 input[name='cidade']").val()
                     },
                success: function (response) {   //se a requisicao for enviada com sucesso...

                    //DECODANDO O JSON que é o response do arquivo php e o atribuindo a um array
                    var array = jQuery.parseJSON(response);

                    //imprimindo array na pagina
                    $("#container-6 #status").html("cadastrado com sucesso<br>");
                    $("#container-6 #status").append("<p>Usuario - "+array.usuario+"</p>");
                    $("#container-6 #status").append("<p>Nome - "+array.nome+"</p>");
                    $("#container-6 #status").append("<p>Idade - "+array.idade+"</p>");
                    $("#container-6 #status").append("<p>Cidade - "+array.cidade+"</p>");
                    
                },
                fail: function ()  {             //se a der erro na requisicao...
                    $("#container-6 #status").text("ERRO AO CADASTRAR");
                },  
            });
        });

        // JSON ========================>

        //PEGAR ALGO DE UMA PAGINA TOTALMENTE JSON (que pode ser um php encodado em JSON)

        $("#container-6 > .botao").on("click", ()=>{

            //aqui Data é os dados do arquivo JSON pego da outra pagina (usuarios.json)
            
            $.getJSON( "cadastrados.json", function( data ) {
                
                var usuarios = [];  //o json virara uma lista de items onde cada item é um usuario


                //JOIN - Ele converte uma matriz em uma string, colocando o argumento entre cada elemento.
               
                console.log(data);
                



                //foreach em JSON
                $.each( data, function( key, val ) {
                  usuarios.push( "<li id='" + key + "'>"+ val.usuario + " - "+ val.nome + " , " + val.cidade +"</li>" );
                });
               
                console.log(usuarios);


                //SINTAXE que pega o 
                $( "<ul>", {
                  "class": "lista-usuarios",
                  html: usuarios.join( "" )
                }).appendTo("#container-6 #cadastrados");
                
                console.log(usuarios);

            });

            //imprimira como indice 0-1-2-3-4 e nao 1-2-3-4-5, por que nao é o indice do arquivo json que pegamos e sim imprimimos
            //do array mesmo, mas se quisermos imprimir esse numero ai temos que usar o val.usuario

            // vc pode usar o parseJSON tbm que converte os dados de um json em array

        });