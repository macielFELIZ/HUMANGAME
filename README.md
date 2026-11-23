# HUMANIGAME — Aventura do Conhecimento

Jogo educacional de Ciências Humanas para o Ensino Fundamental I (1º ao 5º ano), inspirado na dinâmica RPG e no PORTUGAME.

## Conteúdos
- História
- Geografia
- Filosofia: temas introdutórios de reflexão, ética e diálogo
- Sociologia: temas introdutórios de convivência, cultura e relações sociais

## Conteúdo incluído
- 5 séries (1º ao 5º ano)
- 4 áreas de aprendizagem por série
- 2 desafios por área em cada série
- 40 questões demonstrativas
- Correção automática com explicações
- XP, moedas, níveis e bônus por concluir uma área
- Perfil com nome e avatar
- Indicadores de progresso
- Salvamento local com LocalStorage

**Nota pedagógica:** no Ensino Fundamental I, Filosofia e Sociologia aparecem como temas e habilidades introdutórias e interdisciplinares; não necessariamente como componentes curriculares autônomos. Adapte os conteúdos ao currículo da rede e valide-os com docentes antes do uso formal.

## Executar
1. Extraia `HUMANIGAME.zip`.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador.
4. Opcional: instale a extensão Live Server no VS Code e selecione **Open with Live Server**.

Não é necessário Python, Node.js, banco de dados ou dependências.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `humanigame`.
2. Envie os arquivos mantendo a estrutura de pastas.
3. Vá a **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha `main` e `/ (root)`, depois clique em **Save**.

## Adicionar questões
Edite `js/data/questions.js`. Exemplo:
```js
{
  id: "g1-historia-3",
  grade: 1,
  subject: "História",
  question: "Enunciado da questão?",
  options: ["Alternativa A", "Alternativa B", "Alternativa C"],
  answer: 0,
  explanation: "Explicação pedagógica."
}
```
Use `grade` de 1 a 5 e `subject` como `História`, `Geografia`, `Filosofia` ou `Sociologia`. O campo `id` deve ser único; `answer` começa em zero.

## Pontuação
- Resposta correta na primeira tentativa: +10 XP e +3 moedas.
- Concluir os dois desafios de uma área: +20 XP e +5 moedas.
- Cada 100 XP aumenta um nível.

## Limitações
- Sem login real, backend, banco de dados ou painel remoto docente.
- O progresso fica no navegador e dispositivo usados; não sincroniza entre aparelhos.
- Banco inicial demonstrativo: ampliar e revisar antes de uso curricular formal.
- Nome e avatar são salvos localmente no navegador.
