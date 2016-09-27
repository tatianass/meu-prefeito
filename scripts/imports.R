if(!require(dplyr)){
  install.packages("dplyr")
}
library(dplyr)

# Machine learning
if(!require(caret)){  
  install.packages("caret")
}
library(caret)

# Metricas de importancia de atributos
if(!require(FSelector)){  
  install.packages("FSelector")
}
library(FSelector)

# Tratar com JSON
if(!require(jsonlite)){  
  install.packages("jsonlite")
}
library(jsonlite)

if(!require(rjson)){  
  install.packages("rjson")
}
library(rjson)