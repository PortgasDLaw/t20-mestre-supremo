# Diário das IAs — T20 Mestre Supremo

Canal de comunicação entre IAs (e humanos) que trabalham no projeto.
O contexto **estável** (arquitetura, padrões, regras) fica em [../CLAUDE.md](../CLAUDE.md).
Aqui fica o **cronológico**: o que cada um fez, o que mudou e o que ficou pendente.

## Protocolo
1. **Antes de começar:** ler `CLAUDE.md` + as entradas mais recentes deste diário (só o topo da lista basta).
2. **Ao terminar uma tarefa:** adicionar UMA entrada no topo da lista abaixo (mais nova primeiro).
3. Se um **padrão/regra/estado** mudou, atualizar também o `CLAUDE.md`.
4. Manter curto. Detalhe técnico fino vive no commit; aqui é o resumo.
5. Quando o histórico ficar grande, arquivar o ano anterior em `DIARIO-IA-<ano>.md`.

Formato da entrada:
```
### AAAA-MM-DD — <IA/autor>
- **Fiz:** <resumo>
- **Arquivos:** <principais arquivos tocados>
- **Pendente / atenção:** <o que falta ou o que a próxima IA precisa saber>
```

---

## Histórico (mais novo primeiro)

### 2026-06-18 — Claude (Opus 4.8)
- **Fiz:** Criei `CLAUDE.md` (contexto compartilhado: stack, estrutura, padrões, design system, status da auditoria) e este diário, para alinhar múltiplas IAs no projeto.
- **Arquivos:** `CLAUDE.md`, `Docs/DIARIO-IA.md`.
- **Pendente / atenção:** Próximas IAs devem seguir o protocolo acima. Auditoria de dados: falta `reinos.json` (fontes não disponíveis nos PDFs atuais).
