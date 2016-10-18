candidatos <- read.csv("../data/candidatos.csv", sep=";")

candidatos$Porcentagem_limite_despesas <- with(candidatos, Soma_gastos/Limite_de_despesas)


# comparar gastos de campanhas dos reeleitos com os eleitos sem estar no cargo
reeleitos <- candidatos %>% filter(Descricao_ocupacao == "VEREADOR", Cargo == "Vereador", Situação_classe == "Eleito")
eleitos.1 <- candidatos %>% filter(Descricao_ocupacao != "VEREADOR", Cargo == "Vereador", Situação_classe == "Eleito")

hist(reeleitos$Porcentagem_limite_despesas, breaks = c(0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,7))
shapiro.test(reeleitos$Porcentagem_limite_despesas)
summary(reeleitos$Porcentagem_limite_despesas)


hist(eleitos.1$Porcentagem_limite_despesas, breaks = c(0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1))
shapiro.test(eleitos.1$Porcentagem_limite_despesas)
summary(eleitos.1$Porcentagem_limite_despesas)
