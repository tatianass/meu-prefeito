app.controller("IndexController", ["$scope", "$http", function($scope, $http){
    $scope.detalhes = false;
    $scope.txtDetalhes = "Mais Detalhes" 
    $scope.nome = "";
    $scope.value = 0;
    $scope.info = {}
    $scope.infoPB = {"Ini_Gestao":2013,"Media_Contratos_PB":232.4056,"Media_Dispensas_PB":20.1222,"Media_Aditivos_Prazo_PB":23.8389,"Media_Aditivos_Valor_PB":33.1278,"Media_Convites_PB":20.5778,"IDHM_PB":0.5878,"IDHM_E_PB":0.4775,"IDHM_L_PB":0.7558,"IDHM_R_PB":0.5645,"Ind_Escolaridade_PB":0.3003,"Exp_Vida_PB":70.3435,"Media_Dispensas_PB_Percent":0.0866,"Media_Convite_PB_Percent":0.0885,"Media_Aditivos_Prazo_PB_Percent":0.1026,"Media_Aditivos_Valor_PB_Percent":0.1425}
    
    //dados da candidatura
    $scope.featureData = {}
    //dados socioeconomicos
    $scope.featureDataMin = {}

    //media da Paraiba para a candidatura
    var mediaFeature = [
                        {
                            "value": "232"
                        }, 
                        {
                            "value": "20"
                        }, 
                        {
                            "value": "21"
                        }, 
                        {
                            "value": "24"
                        }, 
                        {
                            "value": "33"
                        }
                    ]

    //media da Paraiba para os indices socioeconomicos
    var mediaFeatureMin = [
                        {
                            "value": "0.4775"
                        }, 
                        {
                            "value": "0.7558"
                        }, 
                        {
                            "value": "0.5645"
                        }, 
                        {
                            "value": "0.5878"
                        }, 
                        {
                            "value": "0.3003"
                        }
                    ]                

    //grafico das features/indicadores
    $scope.features = {
        "chart": {
                "caption": "Informações do Mandato do Candidato à releição",
                "paletteColors": "#81b3dd,#b9cb6e",
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
                "xAxisMaxValue": "400"
            },            
            "categories": [
                {
                    "category": [
                        {
                            "label": "Contratos"
                        }, 
                        {
                            "label": "Dispensas"
                        }, 
                        {
                            "label": "Convites"
                        }, 
                        {
                            "label": "Aditivos de Prazo"
                        }, 
                        {
                            "label": "Aditivos de Valor"
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

    //grafico das features/indicadores com valor pequeno
    $scope.featuresMin = {
        "chart": {
                "caption": "Índices Socioeconômicos da Cidade",
                "paletteColors": "#81b3dd,#b9cb6e",
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
                "xAxisMaxValue": "1"
            },            
            "categories": [
                {
                    "category": [
                        {
                            "label": "IDHM Educação"
                        }, 
                        {
                            "label": "IDHM Longevidade"
                        }, 
                        {
                            "label": "IDHM Renda"
                        }, 
                        {
                            "label": "IDHM"
                        }, 
                        {
                            "label": "Escolaridade"
                        }
                    ]
                }
            ],            
            "dataset": [
                {
                    "seriesname": "Resultado",
                    "data": $scope.featureDataMin
                }, 
                {
                    "seriesname": "Média",
                    "data": mediaFeatureMin
                }
            ]

    };

    $scope.setDetalhes = function(){
        if($scope.detalhes){
            $scope.txtDetalhes = "Mais Detalhes"
        }else{
            $scope.txtDetalhes = "Menos Detalhes"
        }

        $scope.detalhes = !$scope.detalhes
    }

    //figuras representando reacoes a cada probabilidade
    $scope.emotion = "emotion/1.png";

    //atualizando as figuras
    var updateImage = function(p){
        $scope.emotion = "img/candidatos/" + p + ".jpg";
    }

    //busca pelo nome no do candidato
    $scope.search = function(nome){
        //busca por nome nos dados
        $scope.dados.forEach(function(i){
        if(i.Nome === nome){
            $scope.info = i;
        }
        
        }) 

        updateImage(nome)

        //deixa campo de pesquisa em branco
        $scope.nome = "";

        //atualizando os valores dos indicadores
        $scope.featureData=[{
            label: "",
            value: $scope.info.nu_Contratos
        },
        {
            label: "",
            value: $scope.info.nu_Dispensas
        },
        {
            label: "",
            value: $scope.info.nu_Convites
        },
        {
            label: "",
            value: $scope.info.nu_Aditivo_Prazo
        },
        {
            label: "",
            value: $scope.info.nu_Aditivo_Valor
        }]

        $scope.featureDataMin=[{
            label: "",
            value: $scope.info.IDHM_Educacao
        },
        {
            label: "",
            value: $scope.info.IDHM_Longevidade
        },
        {
            label: "",
            value: $scope.info.IDHM_Renda
        },
        {
            label: "",
            value: $scope.info.IDHM
        },
        {
            label: "",
            value: $scope.info.Ind_Escolaridade
        }]

        $scope.features.dataset[0].data = $scope.featureData;
        $scope.featuresMin.dataset[0].data = $scope.featureDataMin;
    }

    //dados
    $scope.dados = [{"Prefeitura":"ALCANTIL","Nome":"JOSE ADEMAR DE FARIAS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":179,"nu_Dispensas":12,"nu_Aditivo_Prazo":20,"nu_Aditivo_Valor":20,"nu_Convites":20,"nu_Dispensas_Percent":6.7,"nu_Aditivo_Prazo_Percent":11.2,"nu_Aditivo_Valor_Percent":11.2,"nu_Convites_Percent":11.2,"Populacao":5236,"Exp_Vida":70.91,"Ind_Escolaridade":0.263,"IDHM":0.578,"IDHM_Educacao":0.458,"IDHM_Longevidade":0.765,"IDHM_Renda":0.55},{"Prefeitura":"ALHANDRA","Nome":"RENATO MENDES LEITE","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":1000,"nu_Dispensas":24,"nu_Aditivo_Prazo":70,"nu_Aditivo_Valor":108,"nu_Convites":381,"nu_Dispensas_Percent":2.4,"nu_Aditivo_Prazo_Percent":7,"nu_Aditivo_Valor_Percent":10.8,"nu_Convites_Percent":38.1,"Populacao":17891,"Exp_Vida":71.69,"Ind_Escolaridade":0.312,"IDHM":0.582,"IDHM_Educacao":0.465,"IDHM_Longevidade":0.778,"IDHM_Renda":0.544},{"Prefeitura":"ALHANDRA","Nome":"MARCELO RODRIGUES DA COSTA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":414,"nu_Dispensas":26,"nu_Aditivo_Prazo":54,"nu_Aditivo_Valor":75,"nu_Convites":31,"nu_Dispensas_Percent":6.3,"nu_Aditivo_Prazo_Percent":13,"nu_Aditivo_Valor_Percent":18.1,"nu_Convites_Percent":7.5,"Populacao":17891,"Exp_Vida":71.69,"Ind_Escolaridade":0.312,"IDHM":0.582,"IDHM_Educacao":0.465,"IDHM_Longevidade":0.778,"IDHM_Renda":0.544},{"Prefeitura":"AMPARO","Nome":"JOSE ARNALDO DA SILVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":46,"nu_Dispensas":1,"nu_Aditivo_Prazo":5,"nu_Aditivo_Valor":16,"nu_Convites":6,"nu_Dispensas_Percent":2.2,"nu_Aditivo_Prazo_Percent":10.9,"nu_Aditivo_Valor_Percent":34.8,"nu_Convites_Percent":13,"Populacao":2088,"Exp_Vida":70.14,"Ind_Escolaridade":0.368,"IDHM":0.606,"IDHM_Educacao":0.551,"IDHM_Longevidade":0.752,"IDHM_Renda":0.537},{"Prefeitura":"AREIA","Nome":"PAULO GOMES PEREIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":183,"nu_Dispensas":25,"nu_Aditivo_Prazo":4,"nu_Aditivo_Valor":7,"nu_Convites":37,"nu_Dispensas_Percent":13.7,"nu_Aditivo_Prazo_Percent":2.2,"nu_Aditivo_Valor_Percent":3.8,"nu_Convites_Percent":20.2,"Populacao":23803,"Exp_Vida":70.34,"Ind_Escolaridade":0.311,"IDHM":0.594,"IDHM_Educacao":0.467,"IDHM_Longevidade":0.756,"IDHM_Renda":0.593},{"Prefeitura":"AREIAL","Nome":"CICERO PEDRO MEDA DE ALMEIDA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":231,"nu_Dispensas":19,"nu_Aditivo_Prazo":15,"nu_Aditivo_Valor":35,"nu_Convites":33,"nu_Dispensas_Percent":8.2,"nu_Aditivo_Prazo_Percent":6.5,"nu_Aditivo_Valor_Percent":15.2,"nu_Convites_Percent":14.3,"Populacao":6438,"Exp_Vida":71.75,"Ind_Escolaridade":0.29,"IDHM":0.608,"IDHM_Educacao":0.503,"IDHM_Longevidade":0.779,"IDHM_Renda":0.573},{"Prefeitura":"AROEIRAS","Nome":"MYLTON DOMINGUES DE AGUIAR MARQUES","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":243,"nu_Dispensas":39,"nu_Aditivo_Prazo":36,"nu_Aditivo_Valor":45,"nu_Convites":42,"nu_Dispensas_Percent":16,"nu_Aditivo_Prazo_Percent":14.8,"nu_Aditivo_Valor_Percent":18.5,"nu_Convites_Percent":17.3,"Populacao":19004,"Exp_Vida":69.71,"Ind_Escolaridade":0.238,"IDHM":0.548,"IDHM_Educacao":0.411,"IDHM_Longevidade":0.745,"IDHM_Renda":0.537},{"Prefeitura":"BANANEIRAS","Nome":"DOUGLAS LUCENA MOURA DE MEDEIROS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":743,"nu_Dispensas":155,"nu_Aditivo_Prazo":39,"nu_Aditivo_Valor":46,"nu_Convites":31,"nu_Dispensas_Percent":20.9,"nu_Aditivo_Prazo_Percent":5.2,"nu_Aditivo_Valor_Percent":6.2,"nu_Convites_Percent":4.2,"Populacao":21811,"Exp_Vida":70.98,"Ind_Escolaridade":0.259,"IDHM":0.568,"IDHM_Educacao":0.43,"IDHM_Longevidade":0.766,"IDHM_Renda":0.555},{"Prefeitura":"BARRA DE SANTANA","Nome":"MANOEL ALMEIDA DE ANDRADE","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":35,"nu_Dispensas":1,"nu_Aditivo_Prazo":6,"nu_Aditivo_Valor":14,"nu_Convites":9,"nu_Dispensas_Percent":2.9,"nu_Aditivo_Prazo_Percent":17.1,"nu_Aditivo_Valor_Percent":40,"nu_Convites_Percent":25.7,"Populacao":8175,"Exp_Vida":69.81,"Ind_Escolaridade":0.254,"IDHM":0.567,"IDHM_Educacao":0.465,"IDHM_Longevidade":0.747,"IDHM_Renda":0.526},{"Prefeitura":"BAYEUX","Nome":"EXPEDITO PEREIRA DE SOUZA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":832,"nu_Dispensas":78,"nu_Aditivo_Prazo":73,"nu_Aditivo_Valor":134,"nu_Convites":54,"nu_Dispensas_Percent":9.4,"nu_Aditivo_Prazo_Percent":8.8,"nu_Aditivo_Valor_Percent":16.1,"nu_Convites_Percent":6.5,"Populacao":99572,"Exp_Vida":71.73,"Ind_Escolaridade":0.461,"IDHM":0.649,"IDHM_Educacao":0.566,"IDHM_Longevidade":0.779,"IDHM_Renda":0.619},{"Prefeitura":"BERNARDINO BATISTA","Nome":"GERVAZIO GOMES DOS SANTOS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":350,"nu_Dispensas":81,"nu_Aditivo_Prazo":36,"nu_Aditivo_Valor":48,"nu_Convites":1,"nu_Dispensas_Percent":23.1,"nu_Aditivo_Prazo_Percent":10.3,"nu_Aditivo_Valor_Percent":13.7,"nu_Convites_Percent":0.3,"Populacao":3071,"Exp_Vida":67.96,"Ind_Escolaridade":0.279,"IDHM":0.558,"IDHM_Educacao":0.462,"IDHM_Longevidade":0.716,"IDHM_Renda":0.526},{"Prefeitura":"BOA VENTURA","Nome":"MARIA LEONICE LOPES VITAL","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":222,"nu_Dispensas":20,"nu_Aditivo_Prazo":22,"nu_Aditivo_Valor":22,"nu_Convites":0,"nu_Dispensas_Percent":9,"nu_Aditivo_Prazo_Percent":9.9,"nu_Aditivo_Valor_Percent":9.9,"nu_Convites_Percent":0,"Populacao":5746,"Exp_Vida":72.38,"Ind_Escolaridade":0.328,"IDHM":0.599,"IDHM_Educacao":0.48,"IDHM_Longevidade":0.79,"IDHM_Renda":0.566},{"Prefeitura":"BOM JESUS","Nome":"ROBERTO BANDEIRA DE MELO BARBOSA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":145,"nu_Dispensas":3,"nu_Aditivo_Prazo":4,"nu_Aditivo_Valor":4,"nu_Convites":39,"nu_Dispensas_Percent":2.1,"nu_Aditivo_Prazo_Percent":2.8,"nu_Aditivo_Valor_Percent":2.8,"nu_Convites_Percent":26.9,"Populacao":2398,"Exp_Vida":70.72,"Ind_Escolaridade":0.309,"IDHM":0.597,"IDHM_Educacao":0.477,"IDHM_Longevidade":0.762,"IDHM_Renda":0.584},{"Prefeitura":"BORBOREMA","Nome":"MARIA PAULA GOMES PEREIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":176,"nu_Dispensas":0,"nu_Aditivo_Prazo":22,"nu_Aditivo_Valor":30,"nu_Convites":32,"nu_Dispensas_Percent":0,"nu_Aditivo_Prazo_Percent":12.5,"nu_Aditivo_Valor_Percent":17,"nu_Convites_Percent":18.2,"Populacao":5094,"Exp_Vida":69.99,"Ind_Escolaridade":0.264,"IDHM":0.558,"IDHM_Educacao":0.426,"IDHM_Longevidade":0.75,"IDHM_Renda":0.544},{"Prefeitura":"BREJO DO CRUZ","Nome":"FRANCISCO DUTRA SOBRINHO","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":262,"nu_Dispensas":3,"nu_Aditivo_Prazo":44,"nu_Aditivo_Valor":68,"nu_Convites":71,"nu_Dispensas_Percent":1.1,"nu_Aditivo_Prazo_Percent":16.8,"nu_Aditivo_Valor_Percent":26,"nu_Convites_Percent":27.1,"Populacao":13079,"Exp_Vida":72.85,"Ind_Escolaridade":0.287,"IDHM":0.597,"IDHM_Educacao":0.463,"IDHM_Longevidade":0.798,"IDHM_Renda":0.575},{"Prefeitura":"BREJO DOS SANTOS","Nome":"LAURI FERREIRA DA COSTA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":79,"nu_Dispensas":1,"nu_Aditivo_Prazo":13,"nu_Aditivo_Valor":42,"nu_Convites":24,"nu_Dispensas_Percent":1.3,"nu_Aditivo_Prazo_Percent":16.5,"nu_Aditivo_Valor_Percent":53.2,"nu_Convites_Percent":30.4,"Populacao":6181,"Exp_Vida":71.58,"Ind_Escolaridade":0.336,"IDHM":0.619,"IDHM_Educacao":0.541,"IDHM_Longevidade":0.776,"IDHM_Renda":0.564},{"Prefeitura":"BREJO DOS SANTOS","Nome":"LUIZ VIEIRA DE ALMEIDA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":82,"nu_Dispensas":10,"nu_Aditivo_Prazo":39,"nu_Aditivo_Valor":59,"nu_Convites":6,"nu_Dispensas_Percent":12.2,"nu_Aditivo_Prazo_Percent":47.6,"nu_Aditivo_Valor_Percent":72,"nu_Convites_Percent":7.3,"Populacao":6181,"Exp_Vida":71.58,"Ind_Escolaridade":0.336,"IDHM":0.619,"IDHM_Educacao":0.541,"IDHM_Longevidade":0.776,"IDHM_Renda":0.564},{"Prefeitura":"CACIMBA DE AREIA","Nome":"ORISMAN FERREIRA DA NOBREGA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":178,"nu_Dispensas":5,"nu_Aditivo_Prazo":11,"nu_Aditivo_Valor":11,"nu_Convites":5,"nu_Dispensas_Percent":2.8,"nu_Aditivo_Prazo_Percent":6.2,"nu_Aditivo_Valor_Percent":6.2,"nu_Convites_Percent":2.8,"Populacao":3541,"Exp_Vida":71.25,"Ind_Escolaridade":0.324,"IDHM":0.596,"IDHM_Educacao":0.497,"IDHM_Longevidade":0.771,"IDHM_Renda":0.553},{"Prefeitura":"CACIMBAS","Nome":"NILTON DE ALMEIDA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":593,"nu_Dispensas":36,"nu_Aditivo_Prazo":2,"nu_Aditivo_Valor":4,"nu_Convites":246,"nu_Dispensas_Percent":6.1,"nu_Aditivo_Prazo_Percent":0.3,"nu_Aditivo_Valor_Percent":0.7,"nu_Convites_Percent":41.5,"Populacao":6811,"Exp_Vida":65.3,"Ind_Escolaridade":0.234,"IDHM":0.523,"IDHM_Educacao":0.425,"IDHM_Longevidade":0.672,"IDHM_Renda":0.501},{"Prefeitura":"CACIMBAS","Nome":"GERALDO TERTO DA SILVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":152,"nu_Dispensas":23,"nu_Aditivo_Prazo":15,"nu_Aditivo_Valor":17,"nu_Convites":23,"nu_Dispensas_Percent":15.1,"nu_Aditivo_Prazo_Percent":9.9,"nu_Aditivo_Valor_Percent":11.2,"nu_Convites_Percent":15.1,"Populacao":6811,"Exp_Vida":65.3,"Ind_Escolaridade":0.234,"IDHM":0.523,"IDHM_Educacao":0.425,"IDHM_Longevidade":0.672,"IDHM_Renda":0.501},{"Prefeitura":"CAJAZEIRAS","Nome":"FRANCISCA DENISE ALBUQUERQUE DE OLIVEIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":822,"nu_Dispensas":116,"nu_Aditivo_Prazo":67,"nu_Aditivo_Valor":100,"nu_Convites":25,"nu_Dispensas_Percent":14.1,"nu_Aditivo_Prazo_Percent":8.2,"nu_Aditivo_Valor_Percent":12.2,"nu_Convites_Percent":3,"Populacao":58122,"Exp_Vida":73.87,"Ind_Escolaridade":0.442,"IDHM":0.679,"IDHM_Educacao":0.574,"IDHM_Longevidade":0.815,"IDHM_Renda":0.668},{"Prefeitura":"CAMPINA GRANDE","Nome":"VENEZIANO VITAL DO REGO SEGUNDO NETO","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":440,"nu_Dispensas":43,"nu_Aditivo_Prazo":55,"nu_Aditivo_Valor":115,"nu_Convites":166,"nu_Dispensas_Percent":9.8,"nu_Aditivo_Prazo_Percent":12.5,"nu_Aditivo_Valor_Percent":26.1,"nu_Convites_Percent":37.7,"Populacao":382571,"Exp_Vida":73.73,"Ind_Escolaridade":0.574,"IDHM":0.72,"IDHM_Educacao":0.654,"IDHM_Longevidade":0.812,"IDHM_Renda":0.702},{"Prefeitura":"CAMPINA GRANDE","Nome":"ROMERO RODRIGUES VEIGA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":1898,"nu_Dispensas":467,"nu_Aditivo_Prazo":255,"nu_Aditivo_Valor":325,"nu_Convites":76,"nu_Dispensas_Percent":24.6,"nu_Aditivo_Prazo_Percent":13.4,"nu_Aditivo_Valor_Percent":17.1,"nu_Convites_Percent":4,"Populacao":382571,"Exp_Vida":73.73,"Ind_Escolaridade":0.574,"IDHM":0.72,"IDHM_Educacao":0.654,"IDHM_Longevidade":0.812,"IDHM_Renda":0.702},{"Prefeitura":"CAPIM","Nome":"EDVALDO CARLOS FREIRE JUNIOR","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":116,"nu_Dispensas":1,"nu_Aditivo_Prazo":10,"nu_Aditivo_Valor":22,"nu_Convites":28,"nu_Dispensas_Percent":0.9,"nu_Aditivo_Prazo_Percent":8.6,"nu_Aditivo_Valor_Percent":19,"nu_Convites_Percent":24.1,"Populacao":5601,"Exp_Vida":68.69,"Ind_Escolaridade":0.23,"IDHM":0.533,"IDHM_Educacao":0.4,"IDHM_Longevidade":0.728,"IDHM_Renda":0.52},{"Prefeitura":"CARRAPATEIRA","Nome":"JOSE ARDISON PEREIRA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":241,"nu_Dispensas":5,"nu_Aditivo_Prazo":0,"nu_Aditivo_Valor":0,"nu_Convites":136,"nu_Dispensas_Percent":2.1,"nu_Aditivo_Prazo_Percent":0,"nu_Aditivo_Valor_Percent":0,"nu_Convites_Percent":56.4,"Populacao":2378,"Exp_Vida":70.91,"Ind_Escolaridade":0.324,"IDHM":0.603,"IDHM_Educacao":0.543,"IDHM_Longevidade":0.765,"IDHM_Renda":0.529},{"Prefeitura":"CONDADO","Nome":"CAIO RODRIGO BEZERRA PAIXAO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":322,"nu_Dispensas":22,"nu_Aditivo_Prazo":19,"nu_Aditivo_Valor":25,"nu_Convites":1,"nu_Dispensas_Percent":6.8,"nu_Aditivo_Prazo_Percent":5.9,"nu_Aditivo_Valor_Percent":7.8,"nu_Convites_Percent":0.3,"Populacao":6528,"Exp_Vida":71.16,"Ind_Escolaridade":0.282,"IDHM":0.594,"IDHM_Educacao":0.476,"IDHM_Longevidade":0.769,"IDHM_Renda":0.573},{"Prefeitura":"COREMAS","Nome":"EDILSON PEREIRA DE OLIVEIRA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":647,"nu_Dispensas":4,"nu_Aditivo_Prazo":59,"nu_Aditivo_Valor":111,"nu_Convites":329,"nu_Dispensas_Percent":0.6,"nu_Aditivo_Prazo_Percent":9.1,"nu_Aditivo_Valor_Percent":17.2,"nu_Convites_Percent":50.9,"Populacao":15064,"Exp_Vida":72.65,"Ind_Escolaridade":0.289,"IDHM":0.592,"IDHM_Educacao":0.452,"IDHM_Longevidade":0.794,"IDHM_Renda":0.578},{"Prefeitura":"COREMAS","Nome":"ANTONIO CARLOS CAVALCANTI LOPES","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":294,"nu_Dispensas":2,"nu_Aditivo_Prazo":28,"nu_Aditivo_Valor":73,"nu_Convites":13,"nu_Dispensas_Percent":0.7,"nu_Aditivo_Prazo_Percent":9.5,"nu_Aditivo_Valor_Percent":24.8,"nu_Convites_Percent":4.4,"Populacao":15064,"Exp_Vida":72.65,"Ind_Escolaridade":0.289,"IDHM":0.592,"IDHM_Educacao":0.452,"IDHM_Longevidade":0.794,"IDHM_Renda":0.578},{"Prefeitura":"COXIXOLA","Nome":"GIVALDO LIMEIRA DE FARIAS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":313,"nu_Dispensas":9,"nu_Aditivo_Prazo":21,"nu_Aditivo_Valor":32,"nu_Convites":36,"nu_Dispensas_Percent":2.9,"nu_Aditivo_Prazo_Percent":6.7,"nu_Aditivo_Valor_Percent":10.2,"nu_Convites_Percent":11.5,"Populacao":1770,"Exp_Vida":72.63,"Ind_Escolaridade":0.338,"IDHM":0.641,"IDHM_Educacao":0.567,"IDHM_Longevidade":0.794,"IDHM_Renda":0.586},{"Prefeitura":"CUITEGI","Nome":"GUILHERME CUNHA MADRUGA JUNIOR","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":254,"nu_Dispensas":10,"nu_Aditivo_Prazo":14,"nu_Aditivo_Valor":27,"nu_Convites":35,"nu_Dispensas_Percent":3.9,"nu_Aditivo_Prazo_Percent":5.5,"nu_Aditivo_Valor_Percent":10.6,"nu_Convites_Percent":13.8,"Populacao":6864,"Exp_Vida":68.94,"Ind_Escolaridade":0.261,"IDHM":0.57,"IDHM_Educacao":0.45,"IDHM_Longevidade":0.732,"IDHM_Renda":0.563},{"Prefeitura":"CURRAL VELHO","Nome":"JOAQUIM ALVES BARBOSA FILHO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":142,"nu_Dispensas":0,"nu_Aditivo_Prazo":1,"nu_Aditivo_Valor":1,"nu_Convites":10,"nu_Dispensas_Percent":0,"nu_Aditivo_Prazo_Percent":0.7,"nu_Aditivo_Valor_Percent":0.7,"nu_Convites_Percent":7,"Populacao":2496,"Exp_Vida":69.36,"Ind_Escolaridade":0.315,"IDHM":0.606,"IDHM_Educacao":0.491,"IDHM_Longevidade":0.739,"IDHM_Renda":0.613},{"Prefeitura":"DESTERRO","Nome":"DILSON DE ALMEIDA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":225,"nu_Dispensas":28,"nu_Aditivo_Prazo":0,"nu_Aditivo_Valor":0,"nu_Convites":95,"nu_Dispensas_Percent":12.4,"nu_Aditivo_Prazo_Percent":0,"nu_Aditivo_Valor_Percent":0,"nu_Convites_Percent":42.2,"Populacao":7983,"Exp_Vida":68.43,"Ind_Escolaridade":0.308,"IDHM":0.58,"IDHM_Educacao":0.49,"IDHM_Longevidade":0.724,"IDHM_Renda":0.551},{"Prefeitura":"DUAS ESTRADAS","Nome":"EDSON GOMES DE LUNA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":278,"nu_Dispensas":12,"nu_Aditivo_Prazo":31,"nu_Aditivo_Valor":38,"nu_Convites":57,"nu_Dispensas_Percent":4.3,"nu_Aditivo_Prazo_Percent":11.2,"nu_Aditivo_Valor_Percent":13.7,"nu_Convites_Percent":20.5,"Populacao":3624,"Exp_Vida":72.72,"Ind_Escolaridade":0.307,"IDHM":0.603,"IDHM_Educacao":0.488,"IDHM_Longevidade":0.795,"IDHM_Renda":0.565},{"Prefeitura":"ESPERANCA","Nome":"NOBSON PEDRO DE ALMEIDA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":902,"nu_Dispensas":46,"nu_Aditivo_Prazo":99,"nu_Aditivo_Valor":221,"nu_Convites":320,"nu_Dispensas_Percent":5.1,"nu_Aditivo_Prazo_Percent":11,"nu_Aditivo_Valor_Percent":24.5,"nu_Convites_Percent":35.5,"Populacao":30952,"Exp_Vida":71.04,"Ind_Escolaridade":0.326,"IDHM":0.623,"IDHM_Educacao":0.526,"IDHM_Longevidade":0.767,"IDHM_Renda":0.598},{"Prefeitura":"ESPERANCA","Nome":"ANDERSON MONTEIRO COSTA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":829,"nu_Dispensas":198,"nu_Aditivo_Prazo":215,"nu_Aditivo_Valor":317,"nu_Convites":57,"nu_Dispensas_Percent":23.9,"nu_Aditivo_Prazo_Percent":25.9,"nu_Aditivo_Valor_Percent":38.2,"nu_Convites_Percent":6.9,"Populacao":30952,"Exp_Vida":71.04,"Ind_Escolaridade":0.326,"IDHM":0.623,"IDHM_Educacao":0.526,"IDHM_Longevidade":0.767,"IDHM_Renda":0.598},{"Prefeitura":"FREI MARTINHO","Nome":"AGUIFAILDO LIRA DANTAS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":161,"nu_Dispensas":14,"nu_Aditivo_Prazo":70,"nu_Aditivo_Valor":70,"nu_Convites":20,"nu_Dispensas_Percent":8.7,"nu_Aditivo_Prazo_Percent":43.5,"nu_Aditivo_Valor_Percent":43.5,"nu_Convites_Percent":12.4,"Populacao":2920,"Exp_Vida":71.18,"Ind_Escolaridade":0.327,"IDHM":0.641,"IDHM_Educacao":0.542,"IDHM_Longevidade":0.77,"IDHM_Renda":0.631},{"Prefeitura":"GUARABIRA","Nome":"MARIA DE FATIMA DE AQUINO PAULINO","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":2012,"nu_Dispensas":51,"nu_Aditivo_Prazo":192,"nu_Aditivo_Valor":456,"nu_Convites":935,"nu_Dispensas_Percent":2.5,"nu_Aditivo_Prazo_Percent":9.5,"nu_Aditivo_Valor_Percent":22.7,"nu_Convites_Percent":46.5,"Populacao":54979,"Exp_Vida":73.73,"Ind_Escolaridade":0.461,"IDHM":0.673,"IDHM_Educacao":0.586,"IDHM_Longevidade":0.812,"IDHM_Renda":0.641},{"Prefeitura":"GUARABIRA","Nome":"ZENOBIO TOSCANO DE OLIVEIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":1249,"nu_Dispensas":56,"nu_Aditivo_Prazo":64,"nu_Aditivo_Valor":116,"nu_Convites":58,"nu_Dispensas_Percent":4.5,"nu_Aditivo_Prazo_Percent":5.1,"nu_Aditivo_Valor_Percent":9.3,"nu_Convites_Percent":4.6,"Populacao":54979,"Exp_Vida":73.73,"Ind_Escolaridade":0.461,"IDHM":0.673,"IDHM_Educacao":0.586,"IDHM_Longevidade":0.812,"IDHM_Renda":0.641},{"Prefeitura":"IMACULADA","Nome":"ALDO LUSTOSA DA SILVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":97,"nu_Dispensas":10,"nu_Aditivo_Prazo":19,"nu_Aditivo_Valor":19,"nu_Convites":8,"nu_Dispensas_Percent":10.3,"nu_Aditivo_Prazo_Percent":19.6,"nu_Aditivo_Valor_Percent":19.6,"nu_Convites_Percent":8.2,"Populacao":11343,"Exp_Vida":67.87,"Ind_Escolaridade":0.294,"IDHM":0.557,"IDHM_Educacao":0.461,"IDHM_Longevidade":0.715,"IDHM_Renda":0.524},{"Prefeitura":"ITABAIANA","Nome":"ANTONIO CARLOS RODRIGUES DE MELO JUNIOR","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":194,"nu_Dispensas":53,"nu_Aditivo_Prazo":1,"nu_Aditivo_Valor":1,"nu_Convites":11,"nu_Dispensas_Percent":27.3,"nu_Aditivo_Prazo_Percent":0.5,"nu_Aditivo_Valor_Percent":0.5,"nu_Convites_Percent":5.7,"Populacao":24428,"Exp_Vida":68.63,"Ind_Escolaridade":0.386,"IDHM":0.613,"IDHM_Educacao":0.536,"IDHM_Longevidade":0.727,"IDHM_Renda":0.592},{"Prefeitura":"ITATUBA","Nome":"ARON RENE MARTINS DE ANDRADE","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":405,"nu_Dispensas":27,"nu_Aditivo_Prazo":31,"nu_Aditivo_Valor":42,"nu_Convites":19,"nu_Dispensas_Percent":6.7,"nu_Aditivo_Prazo_Percent":7.7,"nu_Aditivo_Valor_Percent":10.4,"nu_Convites_Percent":4.7,"Populacao":10196,"Exp_Vida":69.51,"Ind_Escolaridade":0.248,"IDHM":0.562,"IDHM_Educacao":0.436,"IDHM_Longevidade":0.742,"IDHM_Renda":0.549},{"Prefeitura":"JOAO PESSOA","Nome":"LUCIANO CARTAXO PIRES DE SA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":985,"nu_Dispensas":73,"nu_Aditivo_Prazo":279,"nu_Aditivo_Valor":366,"nu_Convites":4,"nu_Dispensas_Percent":7.4,"nu_Aditivo_Prazo_Percent":28.3,"nu_Aditivo_Valor_Percent":37.2,"nu_Convites_Percent":0.4,"Populacao":713290,"Exp_Vida":74.89,"Ind_Escolaridade":0.663,"IDHM":0.763,"IDHM_Educacao":0.693,"IDHM_Longevidade":0.832,"IDHM_Renda":0.77},{"Prefeitura":"JURIPIRANGA","Nome":"ANTONIO MAROJA GUEDES FILHO","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":223,"nu_Dispensas":16,"nu_Aditivo_Prazo":1,"nu_Aditivo_Valor":8,"nu_Convites":134,"nu_Dispensas_Percent":7.2,"nu_Aditivo_Prazo_Percent":0.4,"nu_Aditivo_Valor_Percent":3.6,"nu_Convites_Percent":60.1,"Populacao":10237,"Exp_Vida":65.64,"Ind_Escolaridade":0.263,"IDHM":0.548,"IDHM_Educacao":0.448,"IDHM_Longevidade":0.677,"IDHM_Renda":0.544},{"Prefeitura":"JURIPIRANGA","Nome":"PAULO DALIA TEIXEIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":363,"nu_Dispensas":84,"nu_Aditivo_Prazo":22,"nu_Aditivo_Valor":30,"nu_Convites":53,"nu_Dispensas_Percent":23.1,"nu_Aditivo_Prazo_Percent":6.1,"nu_Aditivo_Valor_Percent":8.3,"nu_Convites_Percent":14.6,"Populacao":10237,"Exp_Vida":65.64,"Ind_Escolaridade":0.263,"IDHM":0.548,"IDHM_Educacao":0.448,"IDHM_Longevidade":0.677,"IDHM_Renda":0.544},{"Prefeitura":"LAGOA DE DENTRO","Nome":"FABIANO PEDRO DA SILVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":288,"nu_Dispensas":47,"nu_Aditivo_Prazo":46,"nu_Aditivo_Valor":60,"nu_Convites":29,"nu_Dispensas_Percent":16.3,"nu_Aditivo_Prazo_Percent":16,"nu_Aditivo_Valor_Percent":20.8,"nu_Convites_Percent":10.1,"Populacao":7367,"Exp_Vida":71.3,"Ind_Escolaridade":0.261,"IDHM":0.57,"IDHM_Educacao":0.444,"IDHM_Longevidade":0.772,"IDHM_Renda":0.539},{"Prefeitura":"LASTRO","Nome":"WILMESON EMMANUEL MENDES SARMENTO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":81,"nu_Dispensas":17,"nu_Aditivo_Prazo":7,"nu_Aditivo_Valor":8,"nu_Convites":4,"nu_Dispensas_Percent":21,"nu_Aditivo_Prazo_Percent":8.6,"nu_Aditivo_Valor_Percent":9.9,"nu_Convites_Percent":4.9,"Populacao":2799,"Exp_Vida":69.83,"Ind_Escolaridade":0.191,"IDHM":0.533,"IDHM_Educacao":0.38,"IDHM_Longevidade":0.747,"IDHM_Renda":0.532},{"Prefeitura":"MALTA","Nome":"MANOEL BENEDITO DE LUCENA FILHO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":352,"nu_Dispensas":30,"nu_Aditivo_Prazo":43,"nu_Aditivo_Valor":44,"nu_Convites":5,"nu_Dispensas_Percent":8.5,"nu_Aditivo_Prazo_Percent":12.2,"nu_Aditivo_Valor_Percent":12.5,"nu_Convites_Percent":1.4,"Populacao":5591,"Exp_Vida":73.01,"Ind_Escolaridade":0.328,"IDHM":0.642,"IDHM_Educacao":0.533,"IDHM_Longevidade":0.8,"IDHM_Renda":0.62},{"Prefeitura":"MARI","Nome":"ANTONIO GOMES DA SILVA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"NAO","nu_Contratos":698,"nu_Dispensas":40,"nu_Aditivo_Prazo":4,"nu_Aditivo_Valor":22,"nu_Convites":375,"nu_Dispensas_Percent":5.7,"nu_Aditivo_Prazo_Percent":0.6,"nu_Aditivo_Valor_Percent":3.2,"nu_Convites_Percent":53.7,"Populacao":21100,"Exp_Vida":66.5,"Ind_Escolaridade":0.255,"IDHM":0.548,"IDHM_Educacao":0.429,"IDHM_Longevidade":0.692,"IDHM_Renda":0.553},{"Prefeitura":"MARI","Nome":"MARCOS AURELIO MARTINS DE PAIVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":329,"nu_Dispensas":34,"nu_Aditivo_Prazo":25,"nu_Aditivo_Valor":39,"nu_Convites":52,"nu_Dispensas_Percent":10.3,"nu_Aditivo_Prazo_Percent":7.6,"nu_Aditivo_Valor_Percent":11.9,"nu_Convites_Percent":15.8,"Populacao":21100,"Exp_Vida":66.5,"Ind_Escolaridade":0.255,"IDHM":0.548,"IDHM_Educacao":0.429,"IDHM_Longevidade":0.692,"IDHM_Renda":0.553},{"Prefeitura":"MASSARANDUBA","Nome":"PAULO FRACINETTE DE OLIVEIRA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":7,"nu_Dispensas":0,"nu_Aditivo_Prazo":0,"nu_Aditivo_Valor":0,"nu_Convites":4,"nu_Dispensas_Percent":0,"nu_Aditivo_Prazo_Percent":0,"nu_Aditivo_Valor_Percent":0,"nu_Convites_Percent":57.1,"Populacao":12902,"Exp_Vida":69.8,"Ind_Escolaridade":0.221,"IDHM":0.567,"IDHM_Educacao":0.441,"IDHM_Longevidade":0.747,"IDHM_Renda":0.552},{"Prefeitura":"MATARACA","Nome":"OLIMPIO DE ALENCAR ARAUJO BEZERRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":289,"nu_Dispensas":4,"nu_Aditivo_Prazo":47,"nu_Aditivo_Valor":58,"nu_Convites":46,"nu_Dispensas_Percent":1.4,"nu_Aditivo_Prazo_Percent":16.3,"nu_Aditivo_Valor_Percent":20.1,"nu_Convites_Percent":15.9,"Populacao":7354,"Exp_Vida":65.49,"Ind_Escolaridade":0.28,"IDHM":0.536,"IDHM_Educacao":0.427,"IDHM_Longevidade":0.675,"IDHM_Renda":0.533},{"Prefeitura":"MATINHAS","Nome":"MARIA DE FATIMA SILVA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":151,"nu_Dispensas":3,"nu_Aditivo_Prazo":5,"nu_Aditivo_Valor":7,"nu_Convites":25,"nu_Dispensas_Percent":2,"nu_Aditivo_Prazo_Percent":3.3,"nu_Aditivo_Valor_Percent":4.6,"nu_Convites_Percent":16.6,"Populacao":4321,"Exp_Vida":69.81,"Ind_Escolaridade":0.188,"IDHM":0.541,"IDHM_Educacao":0.4,"IDHM_Longevidade":0.747,"IDHM_Renda":0.531},{"Prefeitura":"MONTADAS","Nome":"JAIRO HERCULANO DE MELO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":117,"nu_Dispensas":24,"nu_Aditivo_Prazo":14,"nu_Aditivo_Valor":15,"nu_Convites":25,"nu_Dispensas_Percent":20.5,"nu_Aditivo_Prazo_Percent":12,"nu_Aditivo_Valor_Percent":12.8,"nu_Convites_Percent":21.4,"Populacao":4952,"Exp_Vida":69.85,"Ind_Escolaridade":0.29,"IDHM":0.59,"IDHM_Educacao":0.505,"IDHM_Longevidade":0.748,"IDHM_Renda":0.545},{"Prefeitura":"MONTE HOREBE","Nome":"CLAUDIA APARECIDA DIAS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":148,"nu_Dispensas":9,"nu_Aditivo_Prazo":4,"nu_Aditivo_Valor":26,"nu_Convites":18,"nu_Dispensas_Percent":6.1,"nu_Aditivo_Prazo_Percent":2.7,"nu_Aditivo_Valor_Percent":17.6,"nu_Convites_Percent":12.2,"Populacao":4508,"Exp_Vida":70.29,"Ind_Escolaridade":0.271,"IDHM":0.587,"IDHM_Educacao":0.463,"IDHM_Longevidade":0.755,"IDHM_Renda":0.579},{"Prefeitura":"NAZAREZINHO","Nome":"SALVAN MENDES PEDROZA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":383,"nu_Dispensas":54,"nu_Aditivo_Prazo":31,"nu_Aditivo_Valor":53,"nu_Convites":0,"nu_Dispensas_Percent":14.1,"nu_Aditivo_Prazo_Percent":8.1,"nu_Aditivo_Valor_Percent":13.8,"nu_Convites_Percent":0,"Populacao":7272,"Exp_Vida":69.83,"Ind_Escolaridade":0.256,"IDHM":0.562,"IDHM_Educacao":0.449,"IDHM_Longevidade":0.747,"IDHM_Renda":0.528},{"Prefeitura":"NOVA PALMEIRA","Nome":"JOSE FELIX DE LIMA FILHO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":100,"nu_Dispensas":10,"nu_Aditivo_Prazo":1,"nu_Aditivo_Valor":3,"nu_Convites":20,"nu_Dispensas_Percent":10,"nu_Aditivo_Prazo_Percent":1,"nu_Aditivo_Valor_Percent":3,"nu_Convites_Percent":20,"Populacao":4361,"Exp_Vida":70.73,"Ind_Escolaridade":0.307,"IDHM":0.595,"IDHM_Educacao":0.488,"IDHM_Longevidade":0.762,"IDHM_Renda":0.567},{"Prefeitura":"OLIVEDOS","Nome":"GRIGORIO DE ALMEIDA SOUTO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":97,"nu_Dispensas":10,"nu_Aditivo_Prazo":7,"nu_Aditivo_Valor":8,"nu_Convites":48,"nu_Dispensas_Percent":10.3,"nu_Aditivo_Prazo_Percent":7.2,"nu_Aditivo_Valor_Percent":8.2,"nu_Convites_Percent":49.5,"Populacao":3625,"Exp_Vida":70.96,"Ind_Escolaridade":0.379,"IDHM":0.603,"IDHM_Educacao":0.54,"IDHM_Longevidade":0.766,"IDHM_Renda":0.531},{"Prefeitura":"OURO VELHO","Nome":"NATALIA CARNEIRO NUNES DE LIRA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":95,"nu_Dispensas":9,"nu_Aditivo_Prazo":16,"nu_Aditivo_Valor":40,"nu_Convites":25,"nu_Dispensas_Percent":9.5,"nu_Aditivo_Prazo_Percent":16.8,"nu_Aditivo_Valor_Percent":42.1,"nu_Convites_Percent":26.3,"Populacao":2928,"Exp_Vida":70.86,"Ind_Escolaridade":0.404,"IDHM":0.614,"IDHM_Educacao":0.518,"IDHM_Longevidade":0.764,"IDHM_Renda":0.585},{"Prefeitura":"PASSAGEM","Nome":"MAGNO SILVA MARTINS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":204,"nu_Dispensas":21,"nu_Aditivo_Prazo":17,"nu_Aditivo_Valor":17,"nu_Convites":13,"nu_Dispensas_Percent":10.3,"nu_Aditivo_Prazo_Percent":8.3,"nu_Aditivo_Valor_Percent":8.3,"nu_Convites_Percent":6.4,"Populacao":2228,"Exp_Vida":72.41,"Ind_Escolaridade":0.358,"IDHM":0.62,"IDHM_Educacao":0.534,"IDHM_Longevidade":0.79,"IDHM_Renda":0.566},{"Prefeitura":"PEDRA LAVRADA","Nome":"JOSE ANTONIO VASCONCELOS DA COSTA","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":295,"nu_Dispensas":1,"nu_Aditivo_Prazo":0,"nu_Aditivo_Valor":0,"nu_Convites":143,"nu_Dispensas_Percent":0.3,"nu_Aditivo_Prazo_Percent":0,"nu_Aditivo_Valor_Percent":0,"nu_Convites_Percent":48.5,"Populacao":7435,"Exp_Vida":68.96,"Ind_Escolaridade":0.259,"IDHM":0.574,"IDHM_Educacao":0.458,"IDHM_Longevidade":0.733,"IDHM_Renda":0.564},{"Prefeitura":"PEDRAS DE FOGO","Nome":"DERIVALDO ROMAO DOS SANTOS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":203,"nu_Dispensas":38,"nu_Aditivo_Prazo":35,"nu_Aditivo_Valor":55,"nu_Convites":41,"nu_Dispensas_Percent":18.7,"nu_Aditivo_Prazo_Percent":17.2,"nu_Aditivo_Valor_Percent":27.1,"nu_Convites_Percent":20.2,"Populacao":26995,"Exp_Vida":71.23,"Ind_Escolaridade":0.299,"IDHM":0.59,"IDHM_Educacao":0.468,"IDHM_Longevidade":0.771,"IDHM_Renda":0.568},{"Prefeitura":"POCINHOS","Nome":"CLAUDIO CHAVES COSTA","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":37,"nu_Dispensas":23,"nu_Aditivo_Prazo":15,"nu_Aditivo_Valor":15,"nu_Convites":2,"nu_Dispensas_Percent":62.2,"nu_Aditivo_Prazo_Percent":40.5,"nu_Aditivo_Valor_Percent":40.5,"nu_Convites_Percent":5.4,"Populacao":17002,"Exp_Vida":71.73,"Ind_Escolaridade":0.293,"IDHM":0.591,"IDHM_Educacao":0.477,"IDHM_Longevidade":0.779,"IDHM_Renda":0.556},{"Prefeitura":"RIACHO DOS CAVALOS","Nome":"JOAQUIM HUGO VIEIRA CARNEIRO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":253,"nu_Dispensas":32,"nu_Aditivo_Prazo":41,"nu_Aditivo_Valor":53,"nu_Convites":8,"nu_Dispensas_Percent":12.6,"nu_Aditivo_Prazo_Percent":16.2,"nu_Aditivo_Valor_Percent":20.9,"nu_Convites_Percent":3.2,"Populacao":8314,"Exp_Vida":70.14,"Ind_Escolaridade":0.262,"IDHM":0.568,"IDHM_Educacao":0.447,"IDHM_Longevidade":0.752,"IDHM_Renda":0.546},{"Prefeitura":"SANTA HELENA","Nome":"EMMANUEL FELIPE LUCENA MESSIAS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":180,"nu_Dispensas":5,"nu_Aditivo_Prazo":6,"nu_Aditivo_Valor":9,"nu_Convites":9,"nu_Dispensas_Percent":2.8,"nu_Aditivo_Prazo_Percent":3.3,"nu_Aditivo_Valor_Percent":5,"nu_Convites_Percent":5,"Populacao":5357,"Exp_Vida":72.16,"Ind_Escolaridade":0.326,"IDHM":0.609,"IDHM_Educacao":0.504,"IDHM_Longevidade":0.786,"IDHM_Renda":0.57},{"Prefeitura":"SERRA GRANDE","Nome":"JAIRO HALLEY DE MOURA CRUZ","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"SIM","nu_Contratos":220,"nu_Dispensas":19,"nu_Aditivo_Prazo":41,"nu_Aditivo_Valor":65,"nu_Convites":26,"nu_Dispensas_Percent":8.6,"nu_Aditivo_Prazo_Percent":18.6,"nu_Aditivo_Valor_Percent":29.5,"nu_Convites_Percent":11.8,"Populacao":2975,"Exp_Vida":69.69,"Ind_Escolaridade":0.309,"IDHM":0.586,"IDHM_Educacao":0.491,"IDHM_Longevidade":0.745,"IDHM_Renda":0.549},{"Prefeitura":"SOLEDADE","Nome":"FLAVIO AURELIANO DA SILVA NETO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":195,"nu_Dispensas":17,"nu_Aditivo_Prazo":27,"nu_Aditivo_Valor":33,"nu_Convites":12,"nu_Dispensas_Percent":8.7,"nu_Aditivo_Prazo_Percent":13.8,"nu_Aditivo_Valor_Percent":16.9,"nu_Convites_Percent":6.2,"Populacao":13704,"Exp_Vida":71.31,"Ind_Escolaridade":0.351,"IDHM":0.616,"IDHM_Educacao":0.506,"IDHM_Longevidade":0.772,"IDHM_Renda":0.598},{"Prefeitura":"SOUSA","Nome":"ANDRE AVELINO DE PAIVA GADELHA NETO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":586,"nu_Dispensas":112,"nu_Aditivo_Prazo":41,"nu_Aditivo_Valor":65,"nu_Convites":27,"nu_Dispensas_Percent":19.1,"nu_Aditivo_Prazo_Percent":7,"nu_Aditivo_Valor_Percent":11.1,"nu_Convites_Percent":4.6,"Populacao":65340,"Exp_Vida":73.84,"Ind_Escolaridade":0.41,"IDHM":0.668,"IDHM_Educacao":0.567,"IDHM_Longevidade":0.814,"IDHM_Renda":0.645},{"Prefeitura":"TAVARES","Nome":"AILTON NIXON SUASSUNA PORTO","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":373,"nu_Dispensas":6,"nu_Aditivo_Prazo":31,"nu_Aditivo_Valor":67,"nu_Convites":14,"nu_Dispensas_Percent":1.6,"nu_Aditivo_Prazo_Percent":8.3,"nu_Aditivo_Valor_Percent":18,"nu_Convites_Percent":3.8,"Populacao":14103,"Exp_Vida":71.59,"Ind_Escolaridade":0.257,"IDHM":0.586,"IDHM_Educacao":0.462,"IDHM_Longevidade":0.777,"IDHM_Renda":0.56},{"Prefeitura":"TEIXEIRA","Nome":"WENCESLAU SOUZA MARQUES","Ini_Gestao":2009,"Fim_Gestao":2012,"Irregular":"SIM","nu_Contratos":810,"nu_Dispensas":78,"nu_Aditivo_Prazo":31,"nu_Aditivo_Valor":34,"nu_Convites":217,"nu_Dispensas_Percent":9.6,"nu_Aditivo_Prazo_Percent":3.8,"nu_Aditivo_Valor_Percent":4.2,"nu_Convites_Percent":26.8,"Populacao":14089,"Exp_Vida":69.46,"Ind_Escolaridade":0.391,"IDHM":0.605,"IDHM_Educacao":0.527,"IDHM_Longevidade":0.741,"IDHM_Renda":0.566},{"Prefeitura":"TEIXEIRA","Nome":"EDMILSON ALVES DOS REIS","Ini_Gestao":2013,"Fim_Gestao":2016,"Irregular":"NAO","nu_Contratos":438,"nu_Dispensas":64,"nu_Aditivo_Prazo":48,"nu_Aditivo_Valor":70,"nu_Convites":29,"nu_Dispensas_Percent":14.6,"nu_Aditivo_Prazo_Percent":11,"nu_Aditivo_Valor_Percent":16,"nu_Convites_Percent":6.6,"Populacao":14089,"Exp_Vida":69.46,"Ind_Escolaridade":0.391,"IDHM":0.605,"IDHM_Educacao":0.527,"IDHM_Longevidade":0.741,"IDHM_Renda":0.566}];
}])