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

carrega_informacoes_pessoais_candidatos <- function(informacoes_pessoais_candidatos){
  informacoes_pessoais_candidatos <- informacoes_pessoais_candidatos %>% filter(Descricao_cargo %in% c("PREFEITO","VEREADOR"), Descricao_situacao_candidatura %in% c("DEFERIDO","DEFERIDO COM RECURSO")) %>% 
    select(Nome_candidato,CPF_candidato,Descricao_ue,-Descricao_cargo,Numero_candidato_urna,-Descricao_situacao_candidatura,Descricao_ocupacao,Idade_data_eleicao,Descricao_sexo,Descricao_grau_instrucao,Descricao_estado_civil,Descricao_nacionalidade,Sigla_uf_nascimento,Nome_municipio_nascimento)
  informacoes_pessoais_candidatos$Descricao_ue <- informacoes_pessoais_candidatos$Descricao_ue %>% iconv(from="latin1", to="ASCII//TRANSLIT") %>% tolower()
  
  
  
  return(informacoes_pessoais_candidatos)
}

carrega_todos_candidatos <- function(todos_candidatos){
  
  todos_candidatos$Localidade <- iconv(todos_candidatos$Localidade, from="UTF-8", to="ASCII//TRANSLIT")
  todos_candidatos$Situação_classe <- ifelse((todos_candidatos$Situação %in% c("Suplente","Não eleito")), "Não eleito", "Eleito")
  todos_candidatos <- bind_cols(todos_candidatos, separa_partido_coligacao(todos_candidatos$Partido...Coligação)) %>%
    select(Localidade, Cargo, Votação, Situação, Situação_classe, Partido, Coligação, Numero_candidato = Nº)

  todos_candidatos$Localidade <- todos_candidatos$Localidade %>% tolower()
  
  return(todos_candidatos)  
}

carrega_limite_depesas_candidatos_pb <- function(limite_despesas_candidatos_pb, retiraValores = F){

  limite_despesas_candidatos_pb$Município <- limite_despesas_candidatos_pb$Município %>% iconv(to="ASCII//TRANSLIT") %>% tolower()
  limite_despesas_candidatos_pb <- limite_despesas_candidatos_pb %>% filter(UF == "PB") %>%
    select(municipio = Município, Prefeito = Limite.de.Gasto.Prefeito.1º.Turno, Vereador = Limite.de.Gasto.Vereador) %>% 
    melt(id=c("municipio")) %>% 
    rename(Cargo = variable, Limite_de_despesas = value, Municipio = municipio) %>%
    mutate(Cargo = as.character(Cargo))
  
  if(retiraValores){
    limite_despesas_candidatos_pb$Limite_de_despesas <- "Sem limites"
  }
  
  return(limite_despesas_candidatos_pb)
}

carrega_gastos_candidatos_pb <- function(gastos_candidatos_pb) {
  gastos_candidatos_pb$Nome.da.UE <- gastos_candidatos_pb$Nome.da.UE %>% iconv(from="latin1", to="ASCII//TRANSLIT") %>% tolower()
  gastos_candidatos_pb <- gastos_candidatos_pb %>% group_by(CPF.do.candidato) %>% 
    summarise(Soma_gastos = sum(Valor.despesa))
  
  return(gastos_candidatos_pb)
}
