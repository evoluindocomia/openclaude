# Plano de Conhecimento do Projeto: FreeCoding (AffHub)

Este documento fornece uma análise detalhada da aplicação FreeCoding, mapeando suas estruturas, funcionalidades e arquitetura sob a nova marca AffHub.

---

## 1. Visão Geral do Projeto

O **FreeCoding** é uma evolução do projeto OpenClaude, agora operando sob a marca **AffHub**. O projeto foi totalmente rebatizado para refletir sua independência e foco em ser um agente de codificação universal.

### Principais Objetivos:
- **Multi-LLM**: Suporte para OpenAI, Gemini, DeepSeek, Ollama e qualquer API compatível com OpenAI.
- **Terminal-First**: Interface rica baseada em terminal (TUI) usando React e Ink.
- **Agente de Codificação**: Capacidade de executar ferramentas (bash, edição de arquivos, busca na web, etc.) para resolver tarefas de programação.
- **Extensível**: Suporte para o Model Context Protocol (MCP) e plugins personalizados.
- **Branding**: Identidade visual e estrutural AffHub | FreeCoding.

---

## 2. Arquitetura do Sistema

A aplicação segue uma arquitetura modular em TypeScript, otimizada para execução em ambiente Node.js.

### Estrutura de Pastas (Mapeamento):
- `bin/`: Scripts de entrada para o executável `freecoding`.
- `src/`: Core da aplicação.
- `src/services/api/`: Implementações dos provedores (Claude, OpenAI Shim, Gemini, Ollama).
- `src/tools/`: Definição e lógica de todas as ferramentas disponíveis para o agente.
- `src/cli/`: Lógica específica da interface de linha de comando.
- `src/components/`: Componentes React (Ink) para a UI do terminal, incluindo o novo Startup Screen.
- `src/proto/`: Definições gRPC para o modo headless.
- `scripts/`: Ferramentas de build e automação.
- `python/`: Componentes auxiliares em Python.
- `vscode-extension/`: Código fonte da extensão para o VS Code (publicada por `affhub`).

---

## 3. Configurações e Infraestrutura

O sistema foi refatorado para utilizar caminhos e variáveis de ambiente segregadas:
- **Diretório de Configurações**: `~/.freecoding` (mantendo fallbacks para `.openclaude` e `.claude`).
- **Variáveis de Ambiente**: Prioriza prefixos `FREECODING_` (ex: `FREECODING_API_KEY`).
- **Repositório Oficial**: `https://github.com/evoluindocomia/affhub-freecoding/`

---

## 4. Componentes Core e Fluxo de Execução

### 4.1. QueryEngine (`src/QueryEngine.ts`)
É o "cérebro" da conversação. Gerencia o ciclo de vida de uma consulta (query), mantém o estado das mensagens, executa ganchos (hooks) e coordena a comunicação entre o usuário e o modelo.

### 4.2. Lifecycle de uma Query (`src/query.ts`)
O fluxo principal de uma interação segue este loop:
1. **Entrada do Usuário**: Recebe o prompt ou comando.
2. **Processamento de Contexto**: Anexa informações relevantes (arquivos abertos, logs, erro anterior).
3. **Chamada ao Modelo**: Envia o contexto para o provedor configurado.
4. **Execução de Ferramentas (Tool Loop)**: Chamada de ferramentas como `bash`, `read_file`, etc.
5. **Resposta Final**: Exibe a resposta ao usuário.

---

## 5. Mapeamento de Funcionalidades

### 5.1. Provedores de LLM (Providers)
Localizados em `src/services/api/`:
- **Claude**: Implementação nativa via Anthropic SDK.
- **OpenAI Shim**: Mapeia modelos como GPT-4o e DeepSeek.
- **Ollama**: Suporte para modelos locais.
- **Gemini**: Integração com a Google AI SDK.

### 5.2. Ecossistema de Ferramentas (Tools)
As ferramentas estão em `src/tools/` e incluem:
- **ToolDefinition**: Esquema que define o nome, descrição e parâmetros de uma ferramenta.
- **QueryEngineConfig**: Configurações de inicialização do motor de busca.

---

## 6. Processo de Desenvolvimento

- **Runtime**: Utiliza Bun para execução de testes e scripts.
- **Build**: `bun run build` gera os arquivos transpilados em `dist/`.
- **Testes**: Suite abrangente em `bun test`, com alta cobertura em provedores e ferramentas.

---

## 7. Próximas Etapas para Modificações

Com base neste mapeamento, as modificações podem focar em:
1. **Adição de Novos Provedores**: Criar novos shims em `src/services/api/`.
2. **Novas Ferramentas**: Adicionar subpastas em `src/tools/` seguindo o padrão existente.
3. **Ajustes de UI**: Modificar componentes Ink em `src/components/` ou `src/screens/`.
4. **Otimização de Contexto**: Melhorar a lógica de compactação de mensagens em `src/services/compact/`.

---
*Plano gerado por Antigravity AI.*
