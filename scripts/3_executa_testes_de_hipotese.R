source("imports.R")

candidatos <- read.csv("../data/candidatos.csv", sep=";")

candidatos$Porcentagem_limite_despesas <- with(candidatos, Soma_gastos/Limite_de_despesas)

# Municipios menos educados elegem em prefeitos que tiveram mais gastos de campanha
eleitos <- candidatos %>% filter(Cargo == "Prefeito", Situação_classe == "Eleito")
qqnorm(eleitos$IDHM_E)
qqnorm(eleitos$Porcentagem_limite_despesas)

with(eleitos, cor.test(IDHM_E, Porcentagem_limite_despesas))
with(eleitos, plot(IDHM_E, Porcentagem_limite_despesas))

# Candidatos a prefeito eleitos gastaram mais dinheiro que candidatos não eleitos
nao.eleitos <- candidatos %>% filter(Cargo == "Prefeito", Situação_classe == "Não eleito") %>% 
  filter(Porcentagem_limite_despesas <= 1) %>% #outlier
  group_by(Descricao_ue) %>% summarise(Porcentagem_limite_despesas = max(Porcentagem_limite_despesas))

eleitos <- candidatos %>% filter(Cargo == "Prefeito", Situação_classe == "Eleito", Descricao_ue %in% nao.eleitos$Descricao_ue) %>% arrange(Descricao_ue) %>% select(Descricao_ue, Porcentagem_limite_despesas)
nao.eleitos <- nao.eleitos %>% filter(Descricao_ue %in% eleitos$Descricao_ue) %>% arrange(Descricao_ue)

hist(eleitos$Porcentagem_limite_despesas); hist(nao.eleitos$Porcentagem_limite_despesas)
summary(eleitos$Porcentagem_limite_despesas); summary(nao.eleitos$Porcentagem_limite_despesas)

qqnorm(eleitos$Porcentagem_limite_despesas); qqnorm(nao.eleitos$Porcentagem_limite_despesas)
wilcox.test(eleitos$Porcentagem_limite_despesas, nao.eleitos$Porcentagem_limite_despesas, paired = T)

# comparar gastos de campanhas dos reeleitos com os eleitos sem estar no cargo
reeleitos <- candidatos %>% filter(Descricao_ocupacao == "VEREADOR", Cargo == "Vereador", Situação_classe == "Eleito")
eleitos.1 <- candidatos %>% filter(Descricao_ocupacao != "VEREADOR", Cargo == "Vereador", Situação_classe == "Eleito")

hist(reeleitos$Porcentagem_limite_despesas, breaks = c(0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,7))
shapiro.test(reeleitos$Porcentagem_limite_despesas)
summary(reeleitos$Porcentagem_limite_despesas)


hist(eleitos.1$Porcentagem_limite_despesas, breaks = c(0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1))
shapiro.test(eleitos.1$Porcentagem_limite_despesas)
summary(eleitos.1$Porcentagem_limite_despesas)