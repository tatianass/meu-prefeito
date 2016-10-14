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

junta_informacoes_candidato <- function(col) {
  not_na_index <- which(!is.na(col))
  ifelse(length(not_na_index) == 0, "-", col[max(not_na_index)])
}

# limite de despesas
limite_despesas_candidatos_pb <- read.csv("../data/limite_gastos_campanha_eleitoral_2016.csv", sep=";", dec=",", stringsAsFactors = F)
limite_despesas_candidatos_pb$Município <- iconv(limite_despesas_candidatos_pb$Município, to="ASCII//TRANSLIT")
limite_despesas_candidatos_pb<-limite_despesas_candidatos_pb %>% filter(UF == "PB") %>% 
  select(municipio = Município, Prefeito = Limite.de.Gasto.Prefeito.1º.Turno, Vereador = Limite.de.Gasto.Vereador, eleitores_aptos = Eleitorado.Apto) %>% 
  melt(id=c("municipio","eleitores_aptos")) %>% 
  rename(cargo = variable, limite_de_despesas = value) %>%
  mutate(cargo = as.character(cargo))

# gastos dos candidatos
gastos_candidatos_pb <- read.csv("../data/despesas_candidatos_2016_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)
gastos_candidatos_pb$Nome.da.UE <- iconv(gastos_candidatos_pb$Nome.da.UE, from="latin1", to="ASCII//TRANSLIT")
gastos_candidatos_pb$Nome.candidato <- iconv(gastos_candidatos_pb$Nome.candidato, from="latin1", to="ASCII//TRANSLIT")

# candidatos eleitos
eleicao_candidatos <- read.csv("../data/eleicao_todos_candidatos.csv", sep=";", stringsAsFactors = F)
eleicao_candidatos$Localidade <- iconv(eleicao_candidatos$Localidade, to="ASCII//TRANSLIT")
eleicao_candidatos$Candidato <- iconv(eleicao_candidatos$Candidato, to="ASCII//TRANSLIT")
eleicao_candidatos$Situação_classe <- ifelse((eleicao_candidatos$Situação %in% c("Suplente","Não eleito")), "Não eleito", "Eleito")
eleicao_candidatos <- bind_cols(eleicao_candidatos, separa_partido_coligacao(eleicao_candidatos$Partido...Coligação)) %>%
  select(Localidade, Cargo, Candidato, Votação, Situação, Situação_classe, Partido, Coligação, Nº)

# cidades sem registro de gastos
cidades_gastos <- gastos_candidatos_pb$Nome.da.UE %>% na.omit() %>% unique()
cidades_sem_registro_gasto <- eleicao_candidatos$Localidade %>% unique() 
cidades_sem_registro_gasto <- cidades_sem_registro_gasto[!(cidades_sem_registro_gasto %in% cidades_gastos)]
eleicao_candidatos <- eleicao_candidatos %>% filter(!(Localidade %in% cidades_sem_registro_gasto))


# tabela com total de gastos por candidato
total_gastos_candidatos <- gastos_candidatos_pb %>% group_by(Nome.candidato, Número.candidato, Nome.da.UE, Sigla..Partido, CPF.do.candidato, Cargo) %>% 
  summarise(soma_gastos = sum(Valor.despesa)) %>% 
  full_join(eleicao_candidatos, by = c("Nome.da.UE" = "Localidade", "Nome.candidato" = "Candidato", "Número.candidato" = "Nº", "Sigla..Partido" = "Partido", "Cargo" = "Cargo")) %>% 
  arrange(Nome.candidato, Número.candidato, Sigla..Partido, Nome.da.UE, Cargo)

by_user <- total_gastos_candidatos %>% group_by(Número.candidato, Nome.da.UE)
user.summary <- summarize_each(by_user, funs(junta_informacoes_candidato))

# DESCOBRIR PORQUE ESTAO APARECENDO MAIS CANDIDATOS NO USER.SUMMARY DO QUE NA TABELA DE TODOS OS CANDIDATOS
# FAZER JOIN COM O LIMITE DE DESPESAS
# PROCURAR SEXO DOS CANDIDATOS
full_join(limite_despesas_candidatos_pb, by = c(Nome.da.UE = "municipio", Cargo = "cargo"))

### word cloud
configura_conjunto_palavras <- function(x){
  gastosCorpus <- Corpus(VectorSource(x)) %>% 
    tm_map(PlainTextDocument) %>% tm_map(removePunctuation) %>% 
    tm_map(removeWords, stopwords('portuguese')) %>% tm_map(stemDocument, language = "portuguese")
  
  gastosCorpus
}

configura_conjunto_palavras(gastos_candidatos_pb$Descriçao.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
configura_conjunto_palavras(gastos_vereadores_pb$Descriçao.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)
configura_conjunto_palavras(gastos_prefeitos_pb$Descriçao.da.despesa) %>% wordcloud(max.words = 100, random.order = FALSE)