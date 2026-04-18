# Plano de Rebranding e Reconstrução de Marca: FreeCoding (AffHub)

Este plano detalha a estratégia para transformar o **OpenClaude** na aplicação **FreeCoding**, sob a marca **AffHub**, removendo todas as referências ao nome original, autores e repositórios antigos.

> [!WARNING]
> **Nota Legal:** Embora o código de modificações seja MIT, a base é derivada do Claude Code (Anthropic). O rebranding altera a identidade visual e de mercado, mas não anula os direitos autorais das partes originais. Recomenda-se manter as menções de licença exigidas nos arquivos fonte conforme os termos da MIT.

## Objetivos
1.  Remover referências a "OpenClaude", "Gitlawb" e "gitlawb/openclaude".
2.  Implementar a nova identidade: **FreeCoding** (App) e **AffHub** (Marca).
3.  Atualizar todos os links de repositório para: `https://github.com/evoluindocomia/affhub-freecoding/`.
4.  Atualizar manifestos de projeto (`package.json`) e o comando CLI para `freecoding`.
5.  Garantir que a aplicação continue funcional após a renomeação de caminhos de configuração (`~/.freecoding`).

## Nova Identidade Definida
- **Nome do Projeto**: `freecoding`
- **Marca**: `AffHub`
- **Comando CLI**: `freecoding`
- **Pasta de Configuração**: `~/.freecoding`
- **Prefixo de Variáveis**: `FREECODING_`
- **URL do Repositório**: `https://github.com/evoluindocomia/affhub-freecoding/`

---

## Fases de Execução

### Fase 1: Pesquisa e Mapeamento Final
- Identificar todas as variantes das strings: `OpenClaude`, `openclaude`, `gitlawb`, `Gitlawb`.
- Mapear links `github.com/Gitlawb/openclaude`.
- Mapear variáveis de ambiente críticas que começam com `CLAUDE_` ou `OPENCLAUDE_`.

### Fase 2: Substituição Global de Texto
#### [MODIFY] Todos os arquivos de texto
- Substituir `OpenClaude` -> `FreeCoding` (Respeitando Case)
- Substituir `gitlawb/openclaude` -> `evoluindocomia/affhub-freecoding`
- Substituir `https://github.com/Gitlawb/openclaude` -> `https://github.com/evoluindocomia/affhub-freecoding`
- Substituir menções a `Gitlawb` (como autor/organização) por `AffHub` ou `Evoluindo com IA`.

### Fase 3: Atualização de Manifestos e Configurações
#### [MODIFY] package.json
- Alterar `"name": "@gitlawb/openclaude"` para `"name": "freecoding"`.
- Alterar seção `"bin"`: `"freecoding": "./bin/freecoding"`.
- Atualizar URLs de repositório, home e bugs.

#### [MODIFY] envUtils.ts
- Alterar a função `resolveClaudeConfigHomeDir` para usar `.freecoding` como padrão.
- Atualizar verificações de variáveis de ambiente para priorizar prefixos `FREECODING_`.

### Fase 4: Refatoração de Arquivos e Pastas
- Renomear o arquivo binário em `bin/openclaude` para `bin/freecoding`.
- Atualizar referências de temas e IDs na extensão do VS Code (`vscode-extension/`).

### Fase 5: UI e Banners
- Personalizar o banner de inicialização no terminal com a marca **AffHub | FreeCoding**.
- Atualizar o comando `/provider` e mensagens de boas-vindas.

---

## Estratégia de "Reconstrução"
Para reconstruir e adicionar novas funcionalidades, a estratégia recomendada é a **Refatoração Progressiva**:
1.  **Estabilização da Marca**: Concluir o rebranding primeiro para ter um "novo começo".
2.  **Desacoplamento de Provedores**: Criar uma camada de abstração mais genérica em `src/services/api/` para que não pareça um "shim" do Claude, mas sim um sistema multi-modelo nativo.
3.  **Expansão de Tools**: Introduzir novas capacidades (ex: Docker integration, Cloud providers) como módulos independentes em `src/tools/`.

## Plano de Verificação
- Executar `bun run build` para validar o novo binário.
- Testar o comando global após o link simbólico (`npm link`).
- Verificar se a pasta de configuração correta (`~/.freecoding`) é criada no primeiro uso.
