source("imports.R")
source("util.R")

# Informacoes pessoais dos candidatos
informacoes_pessoais_candidatos <- read.csv("../data/2016/consulta_cand_2016_PB.txt", sep=";", header = F, stringsAsFactors = F, encoding = "latin1", col.names = c("Data_geracao","Dora_geracao","Ano_eleicao","Num_turno","Descricao_eleicao","Sigla_uf","Sigla_ue","Descricao_ue","Codigo_cargo","Descricao_cargo","Nome_candidato","Sequencial_candidato", "Numero_candidato_urna","CPF_candidato","Nome_urna_candidato","Cod_situacao_candidatura","Descricao_situacao_candidatura","Numero_partido","Sigla_partido","Nome_partido","Codigo_legenda","Sigla_legenda","Composicao_legenda","Nome_legenda", "Codigo_ocupacao","Descricao_ocupacao","Data_nascimento","Num_titulo_eleitoral_candidato","Idade_data_eleicao","Codigo_sexo","Descricao_sexo","Cod_grau_instrucao","Descricao_grau_instrucao","Codigo_estado_civil","Descricao_estado_civil","Codigo_cor_raca", "Descricao_cor_raca","Codigo_nacionalidade","Descricao_nacionalidade","Sigla_uf_nascimento","Codigo_municipio_nascimento","Nome_municipio_nascimento","Despesa_max_campanha","Cod_situacao_totalizacao_turno","Descricao_situacao_totalizacao_turno","Email"))
informacoes_pessoais_candidatos <- carrega_informacoes_pessoais_candidatos(informacoes_pessoais_candidatos)

# Adiciona cargo, partido, coligação e votação dos candidatos
todos_candidatos <- read.csv("../data/2016/eleicao_todos_candidatos.csv", sep=";", stringsAsFactors = F, encoding = "UTF-8")
todos_candidatos <- carrega_todos_candidatos(todos_candidatos)
candidatos <- informacoes_pessoais_candidatos %>% inner_join(todos_candidatos, by = c("Descricao_ue" = "Localidade", "Numero_candidato_urna" = "Numero_candidato"))

# Adiciona limite de despesas para cada cargo e municipio
limite_despesas_candidatos_pb <- read.csv("../data/2016/limite_gastos_campanha_eleitoral_2016.csv", sep=";", dec=",", stringsAsFactors = F, encoding = "UTF-8")
limite_despesas_candidatos_pb <- carrega_limite_depesas_candidatos_pb(limite_despesas_candidatos_pb)
candidatos <- candidatos %>% inner_join(limite_despesas_candidatos_pb, by = c("Descricao_ue" = "Municipio", "Cargo" = "Cargo"))

# Adiciona gastos para cada candidato
gastos_candidatos_pb <- read.csv("../data/2016/despesas_candidatos_2016_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)
gastos_candidatos_pb <- carrega_gastos_candidatos_pb(gastos_candidatos_pb)

candidatos <- gastos_candidatos_pb %>% right_join(candidatos, by = c("CPF.do.candidato" = "CPF_candidato"))
candidatos$Soma_gastos <- with(candidatos, ifelse(is.na(Soma_gastos),0,Soma_gastos))

# Adiciona abstencao
abstencao <- read.csv("../data/2016/comparecimento_abstencao_localidade.csv", sep=";", dec = ",", stringsAsFactors = F, encoding = "UTF-8", header = T) %>% 
  select(Localidade, Cargo, Comparecimento, Abstenção)
abstencao$Localidade <- iconv(abstencao$Localidade, from="UTF-8", to="ASCII//TRANSLIT")

candidatos <- candidatos %>% inner_join(abstencao, by = c("Descricao_ue" = "Localidade", "Cargo" = "Cargo"))

# Adiciona despesas dos candidatos
eleitorado_apto <- read.csv("../data/2016/eleitorado_2016_mun.csv", sep=";") %>% filter(UF=="PB")
eleitorado_apto$MUNICIPIO <- iconv(eleitorado_apto$MUNICIPIO, from="UTF-8", to="ASCII//TRANSLIT")

candidatos <- candidatos %>% inner_join(eleitorado_apto, by = c("Descricao_ue" = "MUNICIPIO"))

# Adiciona informacoes das cidades
cidades <- read.csv("../data/municipios.csv", sep=";", dec=",", stringsAsFactors = F) %>% 
  filter(ANO == 2010, UF == 25) %>%
  select(Municipio, Esperanca_vida = ESPVIDA, IDHM, IDHM_E, IDHM_L, IDHM_R) %>%
  mutate(Municipio=replace(Municipio, Municipio=="SAO DOMINGOS", "SAO DOMINGOS DE POMBAL"))

candidatos <- candidatos %>% inner_join(cidades, by = c("Descricao_ue" = "Municipio"))

write.table(candidatos, "../data/2016/candidatos.csv" ,sep=";", row.names = F, quote = F)

### word cloud
# configura_conjunto_palavras <- function(x){
#   gastosCorpus <- Corpus(VectorSource(x)) %>% 
#     tm_map(PlainTextDocument) %>% tm_map(removePunctuation) %>% 
#     tm_map(removeWords, stopwords('portuguese')) %>% tm_map(stemDocument, language = "portuguese")
#   
#   gastosCorpus
# }
# 
# configura_conjunto_palavras(gastos_candidatos_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
# configura_conjunto_palavras(gastos_vereadores_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
# configura_conjunto_palavras(gastos_prefeitos_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)