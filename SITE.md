# SITE.md: dagotinho.pt (portfolio do Yuri)

Fonte de verdade do site. Tudo o que se decide vem para aqui. Primeiro site feito com o skill `/site` (28 Set 2026). Ramo `redesign/historia`; a Vercel publica o `master`, por isso nada entra lá sem o sim do Yuri.

## Cliente
- Quem é: Yuri Dagot. Nasceu em Maputo em 1996 e vive em Lisboa desde 2014. É DJ a tempo inteiro desde 2020 e voltou ao código em 2025, com projectos seus feitos com AI. História completa com fontes em `memory/yuri_biografia.md` e `memory/yuri_carreira_dj.md` (repo CLAUDECODEHOUSE).
- Em frase dele (aprovada a 28 Set 2026): "Sou de Maputo, vivo em Lisboa. Passei a vida a juntar pessoas (na pista, nas festas que criei) e agora construo as coisas que eu próprio precisava."
- Para quem é o site: **toda a gente** (resposta dele, 28 Set 2026). Não é um site de DJ nem só de programação.
- O que o visitante tem de fazer ao sair (aprovado a 28 Set 2026): uma só acção, **"Fala comigo"**, que se abre em três caminhos: tenho um projecto para construir / tenho um evento / só quero dizer olá (Instagram).
- Material real disponível: 170 posts no Instagram @deejay.dago (2015 a 2026), vídeos no YouTube @MrYuridagot, o vídeo da Vibez (2020), logos DJ em `PROJECTOS/dj-webpage/assets/logodjdago/`. No repo não há fotos nem vídeos. **Autorizado a 28 Set 2026: usar as fotos e vídeos do Instagram**, com crédito aos fotógrafos das legendas (@_rafa_r_, @jonymorenhoz, @olsonferreira_, @joao_andre_18, @cyrilletaczynski e outros). Fotos antigas de Maputo: perguntadas, sem resposta ainda. **Google Fotos autorizado a 28 Set 2026** (usar pelo Chrome dele): 714 GB, e o mais antigo é de **Mai 2017** (palco a preto e branco, cartão "SALERO"); não há nada de 2012. Há Maputo de **Abr 2026** (a viagem dos anos da família). Curadoria por capítulo na Fase 5, com pesquisa no próprio Google Fotos (Maputo, Estocolmo, Rock in Rio, Coimbra, palco), e a lista final aprovada por ele antes de usar: há fotos privadas e outras pessoas. **Só fotos bonitas e com definição**; se não tiverem, melhorar a partir da original (OpenArt ou Codex), sem mudar a cara.
- Tom (três palavras, aprovadas a 28 Set 2026): **caloroso, confiante, curioso**.
- Nunca pode parecer: um CV corporativo; site feito por AI; template; "MEGA básico" (palavras dele sobre o método antigo). O portfolio actual tem 68 ocorrências no anti-slop.
- Sites de que gosta: do artigo da Webflow, só a ideia da Amanda Lee Peers (a vida em capítulos), não o visual. Dos vídeos do Opus 5.5: o voo de drone conduzido pelo scroll, mas o design desses sites "ainda tem muito look de AI".
- Prazo, créditos, alojamento: Vercel (projecto `portfolio`, domínio www.dagotinho.pt); OpenArt com 16 134 créditos a 28 Set 2026.

## Pontos sensíveis
- Técnico: "Computer Engineering studies", nunca "degree", sem destaque.
- Não puxar o DJ para tudo nem a programação para tudo: a história é da pessoa.
- Só factos com fonte. Afronation e The Weeknd ficam de fora.
- Os projectos reais nunca se chamam "demo". Os case studies em `/projects/[slug]` e o SEO mantêm-se.

## Estudo
Estudo de 28 Set 2026 (sites pessoais que contam uma vida). Capturas no scratchpad da sessão, pasta `estudo-portfolio\`.

| Site | Técnica | Porque importa |
|---|---|---|
| [Roman Jean-Elie](https://www.romanjeanelie.com/) | Next e R3F; personagem a dançar num "ecrã" que muda de sítio; máscara WHO; régua Cinema 2008 / Teatro 2013 / Código 2020 com vídeo dentro das letras | Três vidas com três elementos só. Falha: texto sobreposto nas transições, bloqueia o telemóvel |
| [Where is Paul?](https://paulvisciano.com/apps/where-is-paul/) | Globo globe.gl; a cor de cada sítio são as **noites** lá dormidas; cada momento tem URL próprio; saudação noutra língua a cada visita | Mede uma vida em noites, não em fama. Falha: é app, sem início nem pico |
| [Room 1112](https://ljwkelly.com/room1112) | Quarto em loop, momento aleatório, os detalhes mudam entre visitas | A memória como coisa que se reescreve |
| [makimum.dev](https://makimum.dev/) | Quarto Three.js de código (349 KB gz); céu e tempo reais de Helsínquia; o conteúdo todo também em texto | Site diferente consoante a hora real; a versão em texto resolve o modo sem animações |
| [Stas Bondar](https://www.stabondar.com/) | "Sobre mim" em texto com física (Matter.js) | A biografia vira objecto |
| [Daiki Fujita](https://da-san333.com/) | A loja de electrónica da família e o Paint do Windows 95 viram a linguagem visual inteira | A infância como gramática do site |
| [Robert Huynh](https://huynhrobert.com/) | Metáfora de jogo de tabuleiro (a paixão dele) | Aviso: metáfora certa, execução de template (creme, pills, CHAPTER 04, cartões iguais), nada se joga de verdade |

Referências gerais em `.claude/skills/site/references/estado-da-arte.md` e `sites-desmontados.md`.

**O que o sector inteiro faz e nós não vamos fazer:** nome gigante em grotesca condensada no hero; "Hi, I'm X" ou preloader WELCOME; pills de rótulos por baixo do nome; ponto verde LIVE a pulsar; "CHAPTER 01" e "01 / 08"; timeline vertical com linha e pontos; grelha de cartões iguais; números-troféu em caixas; faixa de logos de colaborações; mapa com pins em fotos redondas; quarto 3D de objectos clicáveis; a história num parágrafo cronológico separado da obra; creme com grotesca e mono; bloquear o telemóvel.

**Ideias de fio e pico que saíram do estudo** (para as direcções):
1. Uma linha Maputo–Lisboa desenhada, com a espessura ou a cor a medir o tempo vivido (noites, como o Paul).
2. Régua proporcional aos anos reais, com a cidade ou a pista a aparecer dentro das letras do nome.
3. Um traço que muda o que mede: som da rua de Maputo, depois a waveform de uma faixa, depois um cursor de terminal.
4. O nome que muda por capítulo (Yuri Dagot, WhyViiDee, Dagô, dagotinho), com o nome real como âncora.
5. Dois céus reais: hora e tempo de Maputo e de Lisboa agora, lado a lado.
6. Tracklist como índice: capítulos como faixas, o activo "a tocar".
7. Quem volta ao site entra por outro capítulo.
8. Cada momento com URL próprio (`/maputo/1996`) e o conteúdo todo também em texto.

## Direcção escolhida (28 Set 2026)
**A 1, "Da Marginal ao Cais", com os dois céus e o nome a mudar da 3.** Detalhe completo em `docs/direccoes/DIRECCOES.md`; quadros em `docs/direccoes/direccao-*.jpg`.
- Motif: a linha de água. A Marginal de Maputo (Índico) e o Cais do Sodré (Tejo). Fotografia documental com a luz do fim do dia.
- Fio contínuo: a linha do horizonte, sempre à mesma altura do ecrã: mar, asa do avião, Tejo, linha das cabeças na pista (vira onda sonora), cursor numa linha de código.
- A pessoa: o Yuri recortado de fotos reais, ao centro. De costas no início, de frente no fim.
- O pico: voo contínuo de 30 s conduzido pelo scroll, da Marginal ao anoitecer até dentro de um armazém no Cais cheio de gente (Wan 3.0 num só plano, sequência de frames em canvas).
- Da direcção 3: **os dois céus** (hora e tempo reais de Maputo e de Lisboa, no topo) e **o nome a mudar** por capítulo (dagotinho, WhyViiDee, Dagô, Yuri Dagot), com o nome real sempre como âncora.
- Técnica nova estreada neste site: sequência de frames em canvas e voo contínuo gerado.

### Actos
| # | Acto | Fundo | Verbo | Frame sem animações |
|---|---|---|---|---|
| 0 | Abertura "Sou de Maputo. Vivo em Lisboa." | Índico ao anoitecer, frame 1 do voo | ler | `public/voo/inicio.webp` com o título |
| 1 | Maputo, 1996 a 2014 | voo parado na Marginal | parar | `paragem-1.webp` + foto da piscina |
| 2 | Lisboa, 2014 | voo parado sobre o Tejo | parar | `paragem-2.webp` + setup de 2018 |
| 3 | Cais do Sodré, desde 2020 | dentro do armazém, a linha vira onda sonora | parar | `paragem-3.webp` + Rock in Rio |
| 4 | "E agora construo as coisas que eu próprio precisava" | noite, o carril desliza de lado | deslizar | lista horizontal com scroll próprio |
| 5 | Fala comigo | espuma clara, ele de frente | escolher | igual |

### Tokens
- Paleta (6 papéis e um acento, em hex): índico `#0E2A30`, noite `#0B0D10`, espuma `#E9EFEA`, betão `#8C8F8A`, tingido `#9DB3B0`, água `#35504F`; acento sódio `#F2A541`, com areia `#F2D5A8` no hover.
- Fontes (escolhidas a 28 Set 2026, teste em `docs/direccoes/fontes.jpg`): **Zodiak 700** nos títulos e no nome; **Satoshi 400/700** no texto e na navegação.
- Raio dos cantos: zero. Botões e fotos com esquina viva.
- NUNCAs deste site: cartões com sombra, gradientes roxos, emojis, contadores a subir, marquee, travessões, a palavra "demo", o Técnico em destaque.

## Escada de ferramentas
- JavaScript simples chega: um `requestAnimationFrame` com amortecimento conduz o voo (canvas) e o carril. Zero dependências novas; o `framer-motion` e o `lucide-react` do site antigo saíram.
- CSS scroll-driven: não usado, o voo precisa de paragens por troço (tabela `TRAJECTO` em `Voo.tsx`).
- GSAP, OGL, Three.js: desnecessários.

## Assets
Registo detalhado em `assets/PROMPTS.md`.
- Fotos reais escolhidas pelo Yuri a 28 Set 2026, originais em `fotos/originais/` (fora do git): 1 piscina em criança, foto de álbum fotografada (4032×3024, restaurar e recortar a outra criança); 2 beira-mar Dez 2020 (3000×4000, pronta); 6 setup em casa Nov 2018 (577×577, melhorar); 8 Rock in Rio cabine 29 Jun 2026 00:10 (4000×6000, profissional); 9 Rock in Rio palco BacanaPlay 28 Jun 2026 20:16 (4000×2667). Usos: 1 abre Maputo, 6 a era WhyViiDee, 8 e 9 os palcos, 2 o fim de frente.
- Restauros (28 Set 2026, `fotos/restauradas/`, fora do git): 6 melhorada no Nano Banana Pro 2K (2048 px, cara igual; aprovada por mim, à espera dele). 1 no Nano Banana Pro ficou bonita mas mudou a boca e o rosto e inventou piscina: recusada pela regra da cara. Alternativa sem AI (recorte, balanço de brancos por percentis, nitidez): 2581×2359, cara intacta, sem a outra criança. 80 créditos.
- Bíblia aprovada:
- Créditos gastos até agora: ~1620 (4 imagens das direcções ~420; voo Wan 3.0 720p 30 s, 1200).
- Voo da prova: `docs/direccoes/voo-wan-720p.mp4` (fora do git). Resultou: horizonte à mesma altura do princípio ao fim, céu a escurecer, entrada contínua no armazém. Falhou: a ponte nasce na água aos ~12 s; o armazém aparece à frente do Cristo Rei (geografia trocada); frames a 12 MB.

## Verificação
- [x] anti-slop (limpo a 28 Set 2026, depois de passar os projectos para português)
- [x] capturas por acto (1440×900, 1440×650, 1920×1080, 390×844, com e sem animações): 0 erros, fontes carregadas, sem scroll lateral
- [x] Lighthouse telemóvel, build de produção: desempenho 95, acessibilidade 96, boas práticas 100, SEO 100. O único contraste em falta é a assinatura MWLBYD, discreta de propósito.
- [x] revisão independente (subagente, 28 Set 2026): 8 achados P1 e 10 P2. Corrigidos todos menos dois, que ficam para o Yuri: a data do regresso ao código (2025) contra o Presenças Professor (2024), e a caixa dos céus por cima da fronteira foto/creme no Fala comigo, que aceito
- [ ] olhos de humano (o Yuri no telemóvel dele)

## Estado
- Onde ficámos (28 Set 2026): Fase 6 construída no ramo `redesign/historia` do repo do portfolio. Página principal nova (voo, paragens, carril de projectos, Fala comigo), páginas de projecto em português com o desenho novo, privacidade (em inglês, é a que as apps da App Store apontam) e 404.
- Nada publicado: a Vercel publica o `master`, por isso tudo fica no ramo até ao sim do Yuri.
- Próximo passo: mostrar ao Yuri, e com o sim dele fazer push do ramo para ver a pré-visualização da Vercel antes de juntar ao `master`. O voo em 1080p (2400 créditos) continua adiado.
