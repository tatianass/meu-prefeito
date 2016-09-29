source("imports.R")

tre_sagres <- read.csv('../data/tre_sagres_unificado.csv', encoding = "UTF-8", stringsAsFactors = F)
cidades <- read.csv('../data/municipios.csv', encoding = "UTF-8", sep = ";", dec = ",", stringsAsFactors = F) %>% 
  filter(UF==25, ANO == max(ANO)) %>% rename(de_Ugestora = Municipio)
contas_irregulares <- read.csv('../data/contas_julgadas_irregulares_TRE_2016.csv', encoding = "UTF-8", stringsAsFactors = F)


tre_sagres$de_Ugestora[tre_sagres$de_Ugestora == "CAMPO DE SANTANA"] <- "TACIMA"

tre_sagres$classe <- with(tre_sagres, ifelse(classe == "IRREGULAR", "SIM", "NAO"))
tre_sagres <- rename(tre_sagres, Ini_Gestao = dt_Ano)
tre_sagres <- mutate(tre_sagres, Fim_Gestao = Ini_Gestao+3)

format_number <- function(x){
  round(x, digits=3)*100
}

indicadores_cont_cid <- full_join(tre_sagres, cidades, by = "de_Ugestora") %>%
  mutate(nu_Dispensas_Percent = format_number(nu_Dispensas_Prop_Contratos), nu_Aditivo_Prazo_Percent = format_number(nu_Aditivo_Prazo_Prop_Contratos),
         nu_Aditivo_Valor_Percent = format_number(nu_Aditivo_Valor_Prop_Contratos), nu_Convites_Percent = format_number(nu_Convites_Prop_Contratos))

indicadores_cont_PB <- indicadores_cont_cid %>% group_by(Ini_Gestao) %>% 
  summarise(Media_Contratos_PB = mean(nu_Contratos, trim=0.1), Media_Dispensas_PB=mean(nu_Dispensas, trim=0.1), Media_Aditivos_Prazo_PB=mean(nu_Aditivo_Prazo, trim=0.1), Media_Aditivos_Valor_PB=mean(nu_Aditivo_Valor, trim=0.1), Media_Convites_PB=mean(nu_Convites, trim=0.1), 
            IDHM_PB = mean(IDHM), IDHM_E_PB = mean(IDHM_E), IDHM_L_PB = mean(IDHM_L), IDHM_R_PB = mean(IDHM_R), Ind_Escolaridade_PB = mean(I_ESCOLARIDADE), Exp_Vida_PB = mean(ESPVIDA)) %>%
  mutate(Media_Dispensas_PB_Percent = Media_Dispensas_PB/Media_Contratos_PB, Media_Convite_PB_Percent = Media_Convites_PB/Media_Contratos_PB, Media_Aditivos_Prazo_PB_Percent = Media_Aditivos_Prazo_PB/Media_Contratos_PB, Media_Aditivos_Valor_PB_Percent = Media_Aditivos_Valor_PB/Media_Contratos_PB)

indicadores_cont_cid_candidatos <- indicadores_cont_cid %>%
  filter(Candidato2016) %>%
  select(Prefeitura = de_Ugestora, Nome = Eleito, Ini_Gestao, Fim_Gestao, Irregular = classe, 
         nu_Contratos, nu_Dispensas, nu_Aditivo_Prazo, nu_Aditivo_Valor, nu_Convites, 
         nu_Dispensas_Percent, nu_Aditivo_Prazo_Percent, nu_Aditivo_Valor_Percent, nu_Convites_Percent, 
         Populacao = POP, Exp_Vida = ESPVIDA, Ind_Escolaridade = I_ESCOLARIDADE, IDHM, IDHM_Educacao = IDHM_E, IDHM_Longevidade = IDHM_L, IDHM_Renda = IDHM_R)


sink("../site/data/indices_estado.json")
cat(jsonlite::toJSON(indicadores_cont_PB))
sink()

sink("../site/data/indices_cidades.json")
cat(jsonlite::toJSON(indicadores_cont_cid_candidatos))
sink()