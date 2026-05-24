# DataFake BR — Gerador de Dados Fictícios (Brasil)

![DataFake BR](images/dados-copy.png)

Uma ferramenta leve e independente para gerar dados fictícios brasileiros para testes e desenvolvimento.

---

## Índice

- [Recursos](#recursos)
- [Demo rápida](#demo-rápida)
- [Instalação & Uso](#instalação--uso)
- [Campos Gerados](#campos-gerados)
- [Personalização](#personalização)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Recursos

- Gera CPF, RG, número de cartão (com bandeira), CEP (cidade/estado), e-mail e telefone (com DDD → cidade/estado)
- Ícones e UI responsiva pronta para testes manuais
- Botões de copiar com notificação (toast)
- Projeto sem dependências externas (apenas Font Awesome CDN para ícones)

## Demo rápida

1. Abra `index.html` no navegador (ou use Live Server do VS Code).
2. Clique em **Gerar Dados**.
3. Use o ícone de cópia ao lado de cada campo para copiar.

## Instalação & Uso

- Clone o repositório:

```bash
git clone https://github.com/anselmotadeu/geradorDeDados.git
cd geradorDeDados
```

- Abra `index.html` diretamente ou use uma extensão de servidor local (`Live Server`) para desenvolver.

## Campos Gerados

- **CPF** — formato `000.000.000-00` (fictício)
- **RG** — formato `00.000.000-0` (fictício)
- **Número de Cartão** — gera números com prefixos reais por bandeira (Visa, Mastercard, Amex) e exibe o ícone da bandeira dentro do campo
- **CEP** — formato `00000-000`; exibe cidade e estado abaixo do campo (mapeamento por prefixo)
- **E-mail** — e-mails fictícios com provedores comuns
- **Telefone** — gera com DDD real (mapa simplificado) e exibe cidade/estado abaixo

## Personalização

- As regras de geração estão em `app.js`.
	- `bandeiras` — lista de bandeiras e prefixos para adicionar novas bandeiras
	- `cepRegioes` — mapa que relaciona prefixos de CEP a estados e listas de cidades
	- `dddMap` — mapeamento DDD → cidade/estado

Edite esses arrays para adaptar o conjunto de dados ao seu contexto de testes.

## Contribuindo

Contribuições são bem-vindas:

1. Abra uma issue descrevendo a sugestão ou bug
2. Crie uma branch seguindo o padrão `feature/<nome>` ou `fix/<nome>`
3. Envie um pull request com descrição clara das mudanças

## Licença

Este projeto está licenciado sob a licença MIT.

---

Se quiser, posso adicionar um exemplo de GitHub Actions (CI) e um arquivo `CONTRIBUTING.md` mais detalhado — quer que eu adicione agora?
