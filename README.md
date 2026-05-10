# Diabetes Carolyna Vieira

Site estatico publicado pela Hostinger a partir deste repositorio GitHub.

## Fluxo de atualizacao

1. Edite os arquivos no VS Code.
2. Salve e teste localmente.
3. Envie as alteracoes para o GitHub:

```bash
git status
git add .
git commit -m "Descreva a alteracao"
git push origin main
```

4. No hPanel da Hostinger, abra:

```txt
carolynavieira.com.br > Avancado > GIT
```

5. Na linha do repositorio, clique nos tres pontos e execute o deploy.

## Publicacao

O deploy da Hostinger usa:

```txt
Repositorio: https://github.com/CarolynaVieira/DiabetesCarolynaVieira.git
Branch: main
Diretorio: diabetes
```

Isso publica o site em:

```txt
public_html/diabetes
```

que e a pasta usada pelo subdominio:

```txt
diabetes.carolynavieira.com.br
```

## Observacao

Nao use FTP como fluxo principal neste projeto. O GitHub deve ser a fonte oficial do site.
