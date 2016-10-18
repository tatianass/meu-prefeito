source("imports.R")

separa_partido_coligacao <- function(x){
  partido_coligacao_list <- str_split(x, " / ", n = 2) %>%
  lapply(function(y) {
    if (is.na(y[2])) {
      y[2] <- "-"
    } 
    y
  })
  
  partido_coligacao <- do.call(rbind, partido_coligacao_list) %>% data.frame
  partido_coligacao <- transmute(partido_coligacao, Partido=as.character(X1), Coligação=as.character(X2))
  return(partido_coligacao)
}

# Informacoes pessoais dos candidatos
informacoes_pessoais_candidatos <- read.csv("../data/consulta_cand_2016_PB.txt", sep=";", header = F, stringsAsFactors = F, encoding = "latin1", col.names = c("Data_geracao","Dora_geracao","Ano_eleicao","Num_turno","Descricao_eleicao","Sigla_uf","Sigla_ue","Descricao_ue","Codigo_cargo","Descricao_cargo","Nome_candidato","Sequencial_candidato",
                                                                                                                                                               "Numero_candidato_urna","CPF_candidato","Nome_urna_candidato","Cod_situacao_candidatura","Descricao_situacao_candidatura","Numero_partido","Sigla_partido","Nome_partido","Codigo_legenda","Sigla_legenda","Composicao_legenda","Nome_legenda",
                                                                                                                                                               "Codigo_ocupacao","Descricao_ocupacao","Data_nascimento","Num_titulo_eleitoral_candidato","Idade_data_eleicao","Codigo_sexo","Descricao_sexo","Cod_grau_instrucao","Descricao_grau_instrucao","Codigo_estado_civil","Descricao_estado_civil","Codigo_cor_raca",
                                                                                                                                                               "Descricao_cor_raca","Codigo_nacionalidade","Descricao_nacionalidade","Sigla_uf_nascimento","Codigo_municipio_nascimento","Nome_municipio_nascimento","Despesa_max_campanha","Cod_situacao_totalizacao_turno","Descricao_situacao_totalizacao_turno","Email"))

informacoes_pessoais_candidatos <- informacoes_pessoais_candidatos %>% filter(Descricao_cargo %in% c("PREFEITO","VEREADOR"), Descricao_situacao_candidatura %in% c("DEFERIDO","DEFERIDO COM RECURSO")) %>% 
  select(Nome_candidato,CPF_candidato,Descricao_ue,-Descricao_cargo,Numero_candidato_urna,-Descricao_situacao_candidatura,Descricao_ocupacao,Idade_data_eleicao,Descricao_sexo,Descricao_grau_instrucao,Descricao_estado_civil,Descricao_cor_raca,Descricao_nacionalidade,Sigla_uf_nascimento,Nome_municipio_nascimento)
informacoes_pessoais_candidatos$Descricao_ue <- iconv(informacoes_pessoais_candidatos$Descricao_ue, from="latin1", to="ASCII//TRANSLIT")

# Adiciona cargo, partido, coligação e votação dos candidatos
todos_candidatos <- read.csv("../data/eleicao_todos_candidatos.csv", sep=";", stringsAsFactors = F, encoding = "UTF-8")
todos_candidatos$Localidade <- iconv(todos_candidatos$Localidade, from="UTF-8", to="ASCII//TRANSLIT")
todos_candidatos$Situação_classe <- ifelse((todos_candidatos$Situação %in% c("Suplente","Não eleito")), "Não eleito", "Eleito")
todos_candidatos <- bind_cols(todos_candidatos, separa_partido_coligacao(todos_candidatos$Partido...Coligação)) %>%
  select(Localidade, Cargo, Votação, Situação, Situação_classe, Partido, Coligação, Numero_candidato = Nº)

candidatos <- informacoes_pessoais_candidatos %>% inner_join(todos_candidatos, by = c("Descricao_ue" = "Localidade", "Numero_candidato_urna" = "Numero_candidato"))

# Adiciona limite de despesas para cada cargo e municipio
limite_despesas_candidatos_pb <- read.csv("../data/limite_gastos_campanha_eleitoral_2016.csv", sep=";", dec=",", stringsAsFactors = F, encoding = "UTF-8")
limite_despesas_candidatos_pb$Município <- iconv(limite_despesas_candidatos_pb$Município, to="ASCII//TRANSLIT")
limite_despesas_candidatos_pb<-limite_despesas_candidatos_pb %>% filter(UF == "PB") %>%
  select(municipio = Município, Prefeito = Limite.de.Gasto.Prefeito.1º.Turno, Vereador = Limite.de.Gasto.Vereador) %>% 
  melt(id=c("municipio")) %>% 
  rename(Cargo = variable, Limite_de_despesas = value, Municipio = municipio) %>%
  mutate(Cargo = as.character(Cargo))

candidatos <- candidatos %>% inner_join(limite_despesas_candidatos_pb, by = c("Descricao_ue" = "Municipio", "Cargo" = "Cargo"))

# Adiciona gastos para cada candidato
gastos_candidatos_pb <- read.csv("../data/despesas_candidatos_2016_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)
gastos_candidatos_pb$Nome.da.UE <- iconv(gastos_candidatos_pb$Nome.da.UE, from="latin1", to="ASCII//TRANSLIT")

candidatos <- gastos_candidatos_pb %>% group_by(CPF.do.candidato) %>% 
  summarise(Soma_gastos = sum(Valor.despesa)) %>%
  right_join(candidatos, by = c("CPF.do.candidato" = "CPF_candidato"))

candidatos$Soma_gastos <- with(candidatos, ifelse(is.na(Soma_gastos),0,Soma_gastos))

# Adiciona abstencao
abstencao <- read.csv("../data/comparecimento_abstencao_localidade.csv", sep=";", dec = ",", stringsAsFactors = F, encoding = "UTF-8", header = T) %>% 
  select(Localidade, Cargo, Comparecimento, Abstenção)
abstencao$Localidade <- iconv(abstencao$Localidade, from="UTF-8", to="ASCII//TRANSLIT")

candidatos <- candidatos %>% inner_join(abstencao, by = c("Descricao_ue" = "Localidade", "Cargo" = "Cargo"))

# Adiciona despesas dos candidatos
eleitorado_apto <- read.csv("../data/eleitorado_2016_mun.csv", sep=";") %>% filter(UF=="PB")
eleitorado_apto$MUNICIPIO <- iconv(eleitorado_apto$MUNICIPIO, from="UTF-8", to="ASCII//TRANSLIT")

candidatos <- candidatos %>% inner_join(eleitorado_apto, by = c("Descricao_ue" = "MUNICIPIO"))

write.table(candidatos, "../data/candidatos.csv" ,sep=";", row.names = F, quote = F)

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