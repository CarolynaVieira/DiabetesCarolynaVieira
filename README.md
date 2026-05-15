# Carolyna Vieira Sites

Monorepo de sites estaticos da Dra. Carolyna Vieira, preparado para publicacao na Hostinger via GitHub Actions e FTP.

## Estrutura

```txt
principal/
diabetes/
checkup/
emagrecimento/
.github/workflows/
```

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
emagrecimento/  -> public_html/emagrecimento/
```

Cada pasta deve funcionar de forma independente, com seus proprios arquivos e assets.
