app.controller("IndexController", ["$scope", "$http", function($scope, $http){
    
    $scope.nome = "";
    $scope.value = 0;
    $scope.info = {}
    $scope.featureData = {}
    var mediaFeature = [
                        {
                            "value": "6"
                        }, 
                        {
                            "value": "10"
                        }
                    ]

    //figuras representando reacoes a cada probabilidade
    $scope.emotion = "emotion/1.png";
    var emotions = [
        {p: 0.2, src:"emotion/1.png"},
        {p: 0.4, src:"emotion/2.png"},
        {p: 0.6, src:"emotion/3.png"},
        {p: 0.8, src:"emotion/4.png"},
        {p: 1.0, src:"emotion/5.png"}];

    //atualizando as figuras
    var updateEmotion = function(p){
        $scope.emotion = emotions[0].src
    }

    //busca pelo nome no do candidato
    $scope.search = function(nome){
        //busca por nome nos dados
        $scope.dados.forEach(function(i){
        if(i.Nome === nome){
            $scope.info = i;
        }
        
        }) 

        //deixa campo de pesquisa em branco
        $scope.nome = "";

        //atualizando valor do termometro
        $scope.value = $scope.info.Probabilidade * 100;

        //atualizando os valores dos indicadores
        $scope.featureData=[{
            label: "NAV_EL",
            value: $scope.info.NAV_EL*1000
        },
        {
            label: "NAT_EL",
            value: $scope.info.NAT_EL*1000
        }]

        $scope.features.dataset[0].data = $scope.featureData;
    }

    //grafico das features/indicadores
    $scope.features = {
        "chart": {
                "caption": "Indicadores de corrupção",
                "subCaption":"Valor a cada 1000 eleitores",
                "paletteColors": "#0075c2,#1aaf5d",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showHoverEffect":"1",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "placevaluesInside": "1",
                "valueFontColor": "#ffffff",
                "showXAxisLine": "1",
                "xAxisLineColor": "#999999",
                "divlineColor": "#999999",               
                "divLineIsDashed": "1",
                "showAlternateVGridColor": "0",
                "subcaptionFontBold": "0",
                "subcaptionFontSize": "14",
                "yAxisMaxValue": "30"
            },            
            "categories": [
                {
                    "category": [
                        {
                            "label": "Aditivos de Valor"
                        }, 
                        {
                            "label": "Aditivos Totais"
                        }
                    ]
                }
            ],            
            "dataset": [
                {
                    "seriesname": "Resultado",
                    "data": $scope.featureData
                }, 
                {
                    "seriesname": "Média",
                    "data": mediaFeature
                }
            ]

    };

    //dados
    $scope.dados = [{"Nome":"JOSE ADEMAR DE FARIAS","Prefeitura":"ALCANTIL","NAV":20,"NAV_EL":0.0049,"NAT":40,"NAT_EL":0.0099,"N_EL":4059,"Probabilidade":0.26},{"Nome":"RENATO MENDES LEITE","Prefeitura":"ALHANDRA","NAV":108,"NAV_EL":0.0076,"NAT":178,"NAT_EL":0.0126,"N_EL":14123,"Probabilidade":0.22},{"Nome":"MARCELO RODRIGUES DA COSTA","Prefeitura":"ALHANDRA","NAV":75,"NAV_EL":0.0053,"NAT":130,"NAT_EL":0.0092,"N_EL":14123,"Probabilidade":0.484},{"Nome":"JOSE ARNALDO DA SILVA","Prefeitura":"AMPARO","NAV":16,"NAV_EL":0.0084,"NAT":22,"NAT_EL":0.0116,"N_EL":1904,"Probabilidade":0.614},{"Nome":"PAULO GOMES PEREIRA","Prefeitura":"AREIA","NAV":7,"NAV_EL":0.0004,"NAT":11,"NAT_EL":0.0006,"N_EL":18170,"Probabilidade":0.166},{"Nome":"CICERO PEDRO MEDA DE ALMEIDA","Prefeitura":"AREIAL","NAV":35,"NAV_EL":0.0068,"NAT":53,"NAT_EL":0.0103,"N_EL":5147,"Probabilidade":0.14},{"Nome":"MYLTON DOMINGUES DE AGUIAR MARQUES","Prefeitura":"AROEIRAS","NAV":45,"NAV_EL":0.003,"NAT":81,"NAT_EL":0.0054,"N_EL":14932,"Probabilidade":0.186},{"Nome":"DOUGLAS LUCENA MOURA DE MEDEIROS","Prefeitura":"BANANEIRAS","NAV":46,"NAV_EL":0.0028,"NAT":86,"NAT_EL":0.0052,"N_EL":16565,"Probabilidade":0.038},{"Nome":"MANOEL ALMEIDA DE ANDRADE","Prefeitura":"BARRA DE SANTANA","NAV":14,"NAV_EL":0.002,"NAT":20,"NAT_EL":0.0029,"N_EL":6832,"Probabilidade":0.208},{"Nome":"EXPEDITO PEREIRA DE SOUZA","Prefeitura":"BAYEUX","NAV":134,"NAV_EL":0.002,"NAT":208,"NAT_EL":0.0031,"N_EL":67441,"Probabilidade":0.232},{"Nome":"GERVAZIO GOMES DOS SANTOS","Prefeitura":"BERNARDINO BATISTA","NAV":48,"NAV_EL":0.0237,"NAT":84,"NAT_EL":0.0414,"N_EL":2028,"Probabilidade":0.162},{"Nome":"MARIA LEONICE LOPES VITAL","Prefeitura":"BOA VENTURA","NAV":22,"NAV_EL":0.0044,"NAT":44,"NAT_EL":0.0087,"N_EL":5055,"Probabilidade":0.244},{"Nome":"ROBERTO BANDEIRA DE MELO BARBOSA","Prefeitura":"BOM JESUS","NAV":4,"NAV_EL":0.0018,"NAT":8,"NAT_EL":0.0036,"N_EL":2195,"Probabilidade":0.174},{"Nome":"MARIA PAULA GOMES PEREIRA","Prefeitura":"BORBOREMA","NAV":30,"NAV_EL":0.0068,"NAT":52,"NAT_EL":0.0117,"N_EL":4433,"Probabilidade":0.282},{"Nome":"FRANCISCO DUTRA SOBRINHO","Prefeitura":"BREJO DO CRUZ","NAV":68,"NAV_EL":0.0081,"NAT":112,"NAT_EL":0.0134,"N_EL":8384,"Probabilidade":0.706},{"Nome":"LAURI FERREIRA DA COSTA","Prefeitura":"BREJO DOS SANTOS","NAV":42,"NAV_EL":0.0091,"NAT":55,"NAT_EL":0.0119,"N_EL":4609,"Probabilidade":0.218},{"Nome":"LUIZ VIEIRA DE ALMEIDA","Prefeitura":"BREJO DOS SANTOS","NAV":59,"NAV_EL":0.0128,"NAT":99,"NAT_EL":0.0215,"N_EL":4609,"Probabilidade":0.158},{"Nome":"ORISMAN FERREIRA DA NOBREGA","Prefeitura":"CACIMBA DE AREIA","NAV":11,"NAV_EL":0.0038,"NAT":22,"NAT_EL":0.0076,"N_EL":2882,"Probabilidade":0.438},{"Nome":"NILTON DE ALMEIDA","Prefeitura":"CACIMBAS","NAV":4,"NAV_EL":0.001,"NAT":6,"NAT_EL":0.0015,"N_EL":4051,"Probabilidade":0.616},{"Nome":"GERALDO TERTO DA SILVA","Prefeitura":"CACIMBAS","NAV":17,"NAV_EL":0.0042,"NAT":32,"NAT_EL":0.0079,"N_EL":4051,"Probabilidade":0.23},{"Nome":"FRANCISCA DENISE ALBUQUERQUE DE OLIVEIRA","Prefeitura":"CAJAZEIRAS","NAV":100,"NAV_EL":0.0024,"NAT":167,"NAT_EL":0.004,"N_EL":41643,"Probabilidade":0.584},{"Nome":"VENEZIANO VITAL DO REGO SEGUNDO NETO","Prefeitura":"CAMPINA GRANDE","NAV":115,"NAV_EL":0.0004,"NAT":170,"NAT_EL":0.0006,"N_EL":266731,"Probabilidade":0.242},{"Nome":"ROMERO RODRIGUES VEIGA","Prefeitura":"CAMPINA GRANDE","NAV":325,"NAV_EL":0.0012,"NAT":588,"NAT_EL":0.0022,"N_EL":266731,"Probabilidade":0.81},{"Nome":"EDVALDO CARLOS FREIRE JUNIOR","Prefeitura":"CAPIM","NAV":22,"NAV_EL":0.0059,"NAT":32,"NAT_EL":0.0086,"N_EL":3739,"Probabilidade":0.386},{"Nome":"JOSE ARDISON PEREIRA","Prefeitura":"CARRAPATEIRA","NAV":0,"NAV_EL":0,"NAT":0,"NAT_EL":0,"N_EL":1871,"Probabilidade":0.75},{"Nome":"CAIO RODRIGO BEZERRA PAIXAO","Prefeitura":"CONDADO","NAV":25,"NAV_EL":0.0051,"NAT":45,"NAT_EL":0.0092,"N_EL":4918,"Probabilidade":0.69},{"Nome":"EDILSON PEREIRA DE OLIVEIRA","Prefeitura":"COREMAS","NAV":111,"NAV_EL":0.0096,"NAT":170,"NAT_EL":0.0148,"N_EL":11506,"Probabilidade":0.214},{"Nome":"ANTONIO CARLOS CAVALCANTI LOPES","Prefeitura":"COREMAS","NAV":73,"NAV_EL":0.0063,"NAT":105,"NAT_EL":0.0091,"N_EL":11506,"Probabilidade":0.116},{"Nome":"GIVALDO LIMEIRA DE FARIAS","Prefeitura":"COXIXOLA","NAV":32,"NAV_EL":0.0219,"NAT":53,"NAT_EL":0.0363,"N_EL":1462,"Probabilidade":0.12},{"Nome":"GUILHERME CUNHA MADRUGA JUNIOR","Prefeitura":"CUITEGI","NAV":27,"NAV_EL":0.005,"NAT":41,"NAT_EL":0.0077,"N_EL":5356,"Probabilidade":0.668},{"Nome":"JOAQUIM ALVES BARBOSA FILHO","Prefeitura":"CURRAL VELHO","NAV":1,"NAV_EL":0.0005,"NAT":3,"NAT_EL":0.0014,"N_EL":2095,"Probabilidade":0.76},{"Nome":"DILSON DE ALMEIDA","Prefeitura":"DESTERRO","NAV":0,"NAV_EL":0,"NAT":0,"NAT_EL":0,"N_EL":6423,"Probabilidade":0.75},{"Nome":"EDSON GOMES DE LUNA","Prefeitura":"DUAS ESTRADAS","NAV":38,"NAV_EL":0.0131,"NAT":69,"NAT_EL":0.0238,"N_EL":2896,"Probabilidade":0.376},{"Nome":"AGUIFAILDO LIRA DANTAS","Prefeitura":"FREI MARTINHO","NAV":70,"NAV_EL":0.027,"NAT":140,"NAT_EL":0.0541,"N_EL":2588,"Probabilidade":0.24},{"Nome":"MARIA DE FATIMA DE AQUINO PAULINO","Prefeitura":"GUARABIRA","NAV":456,"NAV_EL":0.0125,"NAT":648,"NAT_EL":0.0178,"N_EL":36379,"Probabilidade":0.022},{"Nome":"ZENOBIO TOSCANO DE OLIVEIRA","Prefeitura":"GUARABIRA","NAV":116,"NAV_EL":0.0032,"NAT":181,"NAT_EL":0.005,"N_EL":36379,"Probabilidade":0.706},{"Nome":"ALDO LUSTOSA DA SILVA","Prefeitura":"IMACULADA","NAV":19,"NAV_EL":0.0024,"NAT":38,"NAT_EL":0.0047,"N_EL":8047,"Probabilidade":0.198},{"Nome":"ANTONIO CARLOS RODRIGUES DE MELO JUNIOR","Prefeitura":"ITABAIANA","NAV":1,"NAV_EL":0.0001,"NAT":3,"NAT_EL":0.0002,"N_EL":18614,"Probabilidade":0.75},{"Nome":"ARON RENE MARTINS DE ANDRADE","Prefeitura":"ITATUBA","NAV":42,"NAV_EL":0.0061,"NAT":73,"NAT_EL":0.0107,"N_EL":6833,"Probabilidade":0.17},{"Nome":"ANTONIO MAROJA GUEDES FILHO","Prefeitura":"JURIPIRANGA","NAV":8,"NAV_EL":0.001,"NAT":9,"NAT_EL":0.0011,"N_EL":8051,"Probabilidade":0.216},{"Nome":"PAULO DALIA TEIXEIRA","Prefeitura":"JURIPIRANGA","NAV":30,"NAV_EL":0.0037,"NAT":52,"NAT_EL":0.0065,"N_EL":8051,"Probabilidade":0.272},{"Nome":"FABIANO PEDRO DA SILVA","Prefeitura":"LAGOA DE DENTRO","NAV":60,"NAV_EL":0.0117,"NAT":107,"NAT_EL":0.0209,"N_EL":5112,"Probabilidade":0.448},{"Nome":"WILMESON EMMANUEL MENDES SARMENTO","Prefeitura":"LASTRO","NAV":8,"NAV_EL":0.0029,"NAT":15,"NAT_EL":0.0055,"N_EL":2741,"Probabilidade":0.078},{"Nome":"MANOEL BENEDITO DE LUCENA FILHO","Prefeitura":"MALTA","NAV":44,"NAV_EL":0.0109,"NAT":87,"NAT_EL":0.0216,"N_EL":4032,"Probabilidade":0.534},{"Nome":"ANTONIO GOMES DA SILVA","Prefeitura":"MARI","NAV":22,"NAV_EL":0.0014,"NAT":26,"NAT_EL":0.0017,"N_EL":15349,"Probabilidade":0.9},{"Nome":"MARCOS AURELIO MARTINS DE PAIVA","Prefeitura":"MARI","NAV":39,"NAV_EL":0.0025,"NAT":65,"NAT_EL":0.0042,"N_EL":15349,"Probabilidade":0.794},{"Nome":"PAULO FRACINETTE DE OLIVEIRA","Prefeitura":"MASSARANDUBA","NAV":0,"NAV_EL":0,"NAT":0,"NAT_EL":0,"N_EL":8458,"Probabilidade":0.75},{"Nome":"OLIMPIO DE ALENCAR ARAUJO BEZERRA","Prefeitura":"MATARACA","NAV":58,"NAV_EL":0.0105,"NAT":106,"NAT_EL":0.0191,"N_EL":5541,"Probabilidade":0.47},{"Nome":"MARIA DE FATIMA SILVA","Prefeitura":"MATINHAS","NAV":7,"NAV_EL":0.0021,"NAT":12,"NAT_EL":0.0036,"N_EL":3354,"Probabilidade":0.346},{"Nome":"JAIRO HERCULANO DE MELO","Prefeitura":"MONTADAS","NAV":15,"NAV_EL":0.0047,"NAT":29,"NAT_EL":0.009,"N_EL":3210,"Probabilidade":0.202},{"Nome":"CLAUDIA APARECIDA DIAS","Prefeitura":"MONTE HOREBE","NAV":26,"NAV_EL":0.0082,"NAT":30,"NAT_EL":0.0094,"N_EL":3183,"Probabilidade":0.476},{"Nome":"SALVAN MENDES PEDROZA","Prefeitura":"NAZAREZINHO","NAV":53,"NAV_EL":0.01,"NAT":84,"NAT_EL":0.0158,"N_EL":5311,"Probabilidade":0.146},{"Nome":"JOSE FELIX DE LIMA FILHO","Prefeitura":"NOVA PALMEIRA","NAV":3,"NAV_EL":0.001,"NAT":4,"NAT_EL":0.0013,"N_EL":3036,"Probabilidade":0.654},{"Nome":"GRIGORIO DE ALMEIDA SOUTO","Prefeitura":"OLIVEDOS","NAV":8,"NAV_EL":0.0029,"NAT":15,"NAT_EL":0.0054,"N_EL":2756,"Probabilidade":0.122},{"Nome":"NATALIA CARNEIRO NUNES DE LIRA","Prefeitura":"OURO VELHO","NAV":40,"NAV_EL":0.017,"NAT":56,"NAT_EL":0.0239,"N_EL":2347,"Probabilidade":0.192},{"Nome":"MAGNO SILVA MARTINS","Prefeitura":"PASSAGEM","NAV":17,"NAV_EL":0.0085,"NAT":34,"NAT_EL":0.0171,"N_EL":1991,"Probabilidade":0.31},{"Nome":"JOSE ANTONIO VASCONCELOS DA COSTA","Prefeitura":"PEDRA LAVRADA","NAV":0,"NAV_EL":0,"NAT":0,"NAT_EL":0,"N_EL":5294,"Probabilidade":0.75},{"Nome":"DERIVALDO ROMAO DOS SANTOS","Prefeitura":"PEDRAS DE FOGO","NAV":55,"NAV_EL":0.0026,"NAT":92,"NAT_EL":0.0043,"N_EL":21493,"Probabilidade":0.802},{"Nome":"CLAUDIO CHAVES COSTA","Prefeitura":"POCINHOS","NAV":15,"NAV_EL":0.0012,"NAT":30,"NAT_EL":0.0024,"N_EL":12328,"Probabilidade":0.918},{"Nome":"JOAQUIM HUGO VIEIRA CARNEIRO","Prefeitura":"RIACHO DOS CAVALOS","NAV":53,"NAV_EL":0.009,"NAT":96,"NAT_EL":0.0164,"N_EL":5857,"Probabilidade":0.164},{"Nome":"EMMANUEL FELIPE LUCENA MESSIAS","Prefeitura":"SANTA HELENA","NAV":9,"NAV_EL":0.0018,"NAT":15,"NAT_EL":0.003,"N_EL":5041,"Probabilidade":0.044},{"Nome":"JAIRO HALLEY DE MOURA CRUZ","Prefeitura":"SERRA GRANDE","NAV":65,"NAV_EL":0.0279,"NAT":106,"NAT_EL":0.0454,"N_EL":2333,"Probabilidade":0.194},{"Nome":"FLAVIO AURELIANO DA SILVA NETO","Prefeitura":"SOLEDADE","NAV":33,"NAV_EL":0.0033,"NAT":60,"NAT_EL":0.0061,"N_EL":9914,"Probabilidade":0.188},{"Nome":"ANDRE AVELINO DE PAIVA GADELHA NETO","Prefeitura":"SOUSA","NAV":65,"NAV_EL":0.0014,"NAT":109,"NAT_EL":0.0024,"N_EL":45161,"Probabilidade":0.46},{"Nome":"AILTON NIXON SUASSUNA PORTO","Prefeitura":"TAVARES","NAV":67,"NAV_EL":0.0065,"NAT":102,"NAT_EL":0.0099,"N_EL":10276,"Probabilidade":0.048},{"Nome":"WENCESLAU SOUZA MARQUES","Prefeitura":"TEIXEIRA","NAV":34,"NAV_EL":0.0035,"NAT":65,"NAT_EL":0.0067,"N_EL":9719,"Probabilidade":0.626},{"Nome":"EDMILSON ALVES DOS REIS","Prefeitura":"TEIXEIRA","NAV":70,"NAV_EL":0.0072,"NAT":118,"NAT_EL":0.0121,"N_EL":9719,"Probabilidade":0.114}]
}])