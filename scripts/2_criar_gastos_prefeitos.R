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

# junta_informacoes_candidato <- function(col) {
#   not_na_index <- which(!is.na(col))
#   ifelse(length(not_na_index) == 0, "-", col[max(not_na_index)])
# }
# 
# by_user <- total_gastos_candidatos %>% group_by(Número.candidato, Nome.da.UE)
# user.summary <- summarize_each(by_user, funs(junta_informacoes_candidato))

# limite de despesas
limite_despesas_candidatos_pb <- read.csv("../data/limite_gastos_campanha_eleitoral_2016.csv", sep=";", dec=",", stringsAsFactors = F, encoding = "UTF-8")
limite_despesas_candidatos_pb$Município <- iconv(limite_despesas_candidatos_pb$Município, to="ASCII//TRANSLIT")
limite_despesas_candidatos_pb<-limite_despesas_candidatos_pb %>% filter(UF == "PB") %>% 
  select(municipio = Município, Prefeito = Limite.de.Gasto.Prefeito.1º.Turno, Vereador = Limite.de.Gasto.Vereador, eleitores_aptos = Eleitorado.Apto) %>% 
  melt(id=c("municipio","eleitores_aptos")) %>% 
  rename(Cargo = variable, Limite_de_despesas = value, Municipio = municipio, Eleitores_aptos = eleitores_aptos) %>%
  mutate(Cargo = as.character(Cargo))

# gastos dos candidatos
gastos_candidatos_pb <- read.csv("../data/despesas_candidatos_2016_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)
gastos_candidatos_pb$Nome.da.UE <- iconv(gastos_candidatos_pb$Nome.da.UE, from="latin1", to="ASCII//TRANSLIT")
gastos_candidatos_pb$Nome.candidato <- iconv(gastos_candidatos_pb$Nome.candidato, from="latin1", to="ASCII//TRANSLIT")

# candidatos eleitos
todos_candidatos <- read.csv("../data/eleicao_todos_candidatos.csv", sep=";", stringsAsFactors = F, encoding = "UTF-8")
todos_candidatos$Localidade <- iconv(todos_candidatos$Localidade, from="UTF-8", to="ASCII//TRANSLIT")
todos_candidatos$Candidato <- iconv(todos_candidatos$Candidato, from="UTF-8", to="ASCII//TRANSLIT")
todos_candidatos$Situação_classe <- ifelse((todos_candidatos$Situação %in% c("Suplente","Não eleito")), "Não eleito", "Eleito")
todos_candidatos <- bind_cols(todos_candidatos, separa_partido_coligacao(todos_candidatos$Partido...Coligação)) %>%
  select(Localidade, Cargo, Candidato, Votação, Situação, Situação_classe, Partido, Coligação, Nº)

# cidades sem registro de gastos
# cidades_gastos <- gastos_candidatos_pb$Nome.da.UE %>% na.omit() %>% unique()
# cidades_sem_registro_gasto <- todos_candidatos$Localidade %>% unique() 
# cidades_sem_registro_gasto <- cidades_sem_registro_gasto[!(cidades_sem_registro_gasto %in% cidades_gastos)]
# todos_candidatos <- todos_candidatos %>% filter(!(Localidade %in% cidades_sem_registro_gasto))

# tabela com total de gastos por candidato e limite de despesas de candidatos
total_gastos_candidatos <- gastos_candidatos_pb %>% group_by(Número.candidato, Nome.da.UE, CPF.do.candidato, Nome.candidato) %>% 
  summarise(soma_gastos = sum(Valor.despesa)) %>%
  right_join(todos_candidatos, by = c("Nome.da.UE" = "Localidade", "Número.candidato" = "Nº")) %>% 
  arrange(Número.candidato, Nome.da.UE, Cargo)
  
total_gastos_candidatos$soma_gastos <- with(total_gastos_candidatos, ifelse(is.na(soma_gastos),0,soma_gastos))

informacoes_candidatos <- total_gastos_candidatos %>% inner_join(limite_despesas_candidatos_pb, by = c(Nome.da.UE = "Municipio", Cargo = "Cargo"))

# PROCURAR SEXO DOS CANDIDATOS
# ADICIONAR INFORMACAO DO ELEITORADO POR MUNICIPIO
# COMPARECIMENTO E ABSTENCAO POR LOCALIDADE

### word cloud
configura_conjunto_palavras <- function(x){
  gastosCorpus <- Corpus(VectorSource(x)) %>% 
    tm_map(PlainTextDocument) %>% tm_map(removePunctuation) %>% 
    tm_map(removeWords, stopwords('portuguese')) %>% tm_map(stemDocument, language = "portuguese")
  
  gastosCorpus
}

configura_conjunto_palavras(gastos_candidatos_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
configura_conjunto_palavras(gastos_vereadores_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
configura_conjunto_palavras(gastos_prefeitos_pb$Descrição.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)