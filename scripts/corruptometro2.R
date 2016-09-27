source("imports.R")

tre_sagres <- read.csv('../../data/tre_sagres_unificado.csv', encoding = "UTF-8", stringsAsFactors = F)
cidades <- read.csv('../../data/municipios.csv', encoding = "UTF-8", sep = ";", dec = ",", stringsAsFactors = F) %>% 
  filter(UF==25, ANO == max(ANO)) %>% rename(de_Ugestora = Municipio)

tre_sagres$de_Ugestora[tre_sagres$de_Ugestora == "CAMPO DE SANTANA"] <- "TACIMA"

tre_sagres$classe <- with(tre_sagres, ifelse(classe == "IRREGULAR", "SIM", "NAO"))
tre_sagres <- rename(tre_sagres, Ini_Gestao = dt_Ano)
tre_sagres <- mutate(tre_sagres, Fim_Gestao = Ini_Gestao+3)

format_number <- function(x){
  round(x, digits=3)*100
}

dados_completos <- full_join(tre_sagres, cidades, by = "de_Ugestora") %>% 
  filter(Candidato2016) %>%
  mutate(nu_Dispensas_Percent = format_number(nu_Dispensas_Prop_Contratos), nu_Aditivo_Prazo_Percent = format_number(nu_Aditivo_Prazo_Prop_Contratos),
         nu_Aditivo_Valor_Percent = format_number(nu_Aditivo_Valor_Prop_Contratos), nu_Convites_Percent = format_number(nu_Convites_Prop_Contratos)) %>%
  select(Prefeitura = de_Ugestora, Nome = Eleito, Ini_Gestao, Fim_Gestao, Irregular = classe, 
         nu_Dispensas, nu_Aditivo_Prazo, nu_Aditivo_Valor, nu_Convites, 
         nu_Dispensas_Percent, nu_Aditivo_Prazo_Percent, nu_Aditivo_Valor_Percent, nu_Convites_Percent, 
         Populacao = POP, Exp_Vida = ESPVIDA, Ind_Escolaridade = I_ESCOLARIDADE, IDHM, IDHM_Educacao = IDHM_E, IDHM_Longevidade = IDHM_L, IDHM_Renda = IDHM_R)



sink("indices_cidades.json")
cat(jsonlite::toJSON(dados_completos))
sink()


format_number(tre_sagres$nu_Dispensas_Prop_Contratos)

# format_number(nu_Dispensas_Prop_Contratos), format_number(nu_Aditivo_Prazo_Prop_Contratos), format_number(nu_Aditivo_Valor_Prop_Contratos), 
# format_number(nu_Convites_Prop_Contratos)
