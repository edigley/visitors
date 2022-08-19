from urllib.request import urlopen

arquivo = urlopen("https://raw.githubusercontent.com/edigley/visitors/master/texto.txt")
texto = arquivo.readlines()

#1. Gerar uma matriz, a partir de um dos textos

matriz = []

for paragrafo in texto:
  linha = []
  for caractere in paragrafo:
    #filtra apenas os caracteres númericos, alfabéticos maiúsculos e minúsculos e o caractere de espaço (ASCII) 
    if ( 47 < caractere < 58 or 64 < caractere < 91 or 96 < caractere < 122 or caractere == 32):
      linha.append(caractere)
  matriz.append(linha)

#calculando a dimensão da matrix depois do tratamento
tamanhosDasLinhas = [len(l) for l in matriz]

print("Número de linhas: ", len(matriz))
print("Número de colunas: ", max(tamanhosDasLinhas))

#imprimir a matrix
print("\nMatriz:\n")
print("\n------------------\n")
print('\n'.join(['\t'.join([str(c) for c in r]) for r in matriz]))
print("\n------------------\n")

#voltar ao texto a partir da matriz.

texto2 = "";
for linha in matriz:
  paragrafo = ""
  for celula in linha:
    paragrafo += chr(celula)
  texto2 += paragrafo + "\n"

#imprime o texto recuperado a partir da matriz
print("\nTexto recuperado a partir da matriz:\n")
print("\n------------------\n")
print(texto2)
