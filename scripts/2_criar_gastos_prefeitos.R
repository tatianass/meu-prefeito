source("imports.R")

separa_partido_coligacao <- function(x){
  x <- candidatos_eleitos$Partido...Coligação
  partido_coligacao_list <- str_split(x, " / ")
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
gastos_candidatos_pb <- read.csv("../data/despesas_candidatos_relatorio_financeiro_2016_PB.txt", sep=";", encoding = "latin1", dec = ",", stringsAsFactors = F)
gastos_candidatos_pb$Nome.da.UE <- iconv(gastos_candidatos_pb$Nome.da.UE, to="ASCII//TRANSLIT")
gastos_vereadores_pb <- filter(gastos_candidatos_pb, Cargo == "Vereador")
gastos_prefeitos_pb <- filter(gastos_candidatos_pb, Cargo == "Prefeito")

# candidatos eleitos
candidatos_eleitos <- read.csv("../data/eleicao_geral_resultado_candidatos.csv",sep=";")
candidatos_eleitos$Localidade <- iconv(candidatos_eleitos$Localidade, to="ASCII//TRANSLIT")

fruits <- c(
  "pros / aeaea",
  "psdb / por amor a campina",
  "pmdb"
)



candidatos_eleitos


# adicionar informacao de quais candidatos foram eleitos em total_gastos_candidatos
total_gastos_candidatos <- gastos_candidatos_pb %>% group_by(Nome.da.UE, Nome.candidato, Sigla..Partido, CPF.do.candidato, Cargo) %>% summarise(soma_gastos = sum(Valor.despesa)) %>% 
  left_join(limite_despesas_candidatos_pb, by = c(Nome.da.UE = "municipio", Cargo = "cargo"))


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
