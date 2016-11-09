source("imports.R")

informacoes_pessoais_candidatos <- read.csv("../data/2012/consulta_cand_2012_PB.txt", sep=";", header = F, stringsAsFactors = F, encoding = "latin1", col.names = c("Data_geracao","Dora_geracao","Ano_eleicao","Num_turno","Descricao_eleicao","Sigla_uf","Sigla_ue","Descricao_ue","Codigo_cargo","Descricao_cargo","Nome_candidato","Sequencial_candidato",
                                                                                                                                                               "Numero_candidato_urna","CPF_candidato","Nome_urna_candidato","Cod_situacao_candidatura","Descricao_situacao_candidatura","Numero_partido","Sigla_partido","Nome_partido","Codigo_legenda","Sigla_legenda","Composicao_legenda","Nome_legenda",
                                                                                                                                                               "Codigo_ocupacao","Descricao_ocupacao","Data_nascimento","Num_titulo_eleitoral_candidato","Idade_data_eleicao","Codigo_sexo","Descricao_sexo","Cod_grau_instrucao","Descricao_grau_instrucao","Codigo_estado_civil","Descricao_estado_civil","Codigo_cor_raca",
                                                                                                                                                               "Descricao_cor_raca","Codigo_nacionalidade","Descricao_nacionalidade","Sigla_uf_nascimento","Codigo_municipio_nascimento","Nome_municipio_nascimento","Despesa_max_campanha","Cod_situacao_totalizacao_turno","Descricao_situacao_totalizacao_turno","Email"))

todos_candidatos <- read.csv("../data/2012/consulta_cand_2012_PB.txt", sep=";", header = F, stringsAsFactors = F, encoding = "latin1")

#limite_despesas_candidatos_pb <- read.csv("", sep=";", dec=",", stringsAsFactors = F, encoding = "UTF-8")

gastos_candidatos_pb <- read.csv("../data/2012/despesas_candidatos_2012_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)

#abstencao <- read.csv("../data/2012/", sep=";", dec = ",", stringsAsFactors = F, encoding = "UTF-8", header = T) %>% 
#  select(Localidade, Cargo, Comparecimento, Abstenção)

eleitorado_apto <- read.csv("../data/2012/perfil_eleitorado_2012.txt", sep=";", header = F, encoding = "latin1") 
#%>% filter(UF=="PB")

cidades <- read.csv("../data/municipios.csv", sep=";", dec=",", stringsAsFactors = F) %>% 
  filter(ANO == 2010, UF == 25) %>%
  select(Municipio, Esperanca_vida = ESPVIDA, IDHM, IDHM_E, IDHM_L, IDHM_R) %>%
  mutate(Municipio=replace(Municipio, Municipio=="SAO DOMINGOS", "SAO DOMINGOS DE POMBAL"))










