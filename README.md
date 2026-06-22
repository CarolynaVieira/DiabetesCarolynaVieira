# Carolyna Vieira Sites

Monorepo de sites estaticos da Dra. Carolyna Vieira, preparado para publicacao na Hostinger via GitHub Actions e FTP.

## Estrutura

```txt
index.html
assets/
principal/
diabetes/
checkup/
prevencao/
emagrecimento/
.github/workflows/
```

O site principal deve ser editado em `principal/`. O workflow publica o conteudo dessa pasta diretamente em `public_html/`, que e a raiz publica do dominio `carolynavieira.com.br`.

Os arquivos `index.html` e `assets/` na raiz existem como espelho local/compatibilidade, mas nao sao a fonte oficial de edicao do site principal. Depois de alterar `principal/`, sincronize a raiz com:

```powershell
.\scripts\sync-principal.ps1 -Check
```

Regra pratica: edite `principal/`, sincronize a raiz, publique. Nao use `public_html/principal/` para o dominio principal.

## Deploy

O workflow `.github/workflows/deploy.yml` publica automaticamente a branch `main` usando `SamKirkland/FTP-Deploy-Action@v4.4.0`.

Configure estes secrets no GitHub:

```txt
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
```

Destinos no FTP da Hostinger:

```txt
principal/      -> public_html/
diabetes/       -> public_html/diabetes/
checkup/        -> public_html/checkup/
prevencao/      -> public_html/prevencao/
emagrecimento/  -> public_html/emagrecimento/
```

Cada pasta deve funcionar de forma independente, com seus proprios arquivos e assets.
