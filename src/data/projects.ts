export type Project = {
  slug: string;
  title: string;
  type: string;
  year: number;
  estado?: "Em curso" | "Proposta";
  liveUrl?: string;
  resumo: string;
  longDescription: string;
  tech: string[];
  problem: string;
  solution: string;
  result: string;
  highlights: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "agendadj",
    title: "AgendaDJ",
    type: "App móvel",
    year: 2025,
    estado: "Em curso",
    liveUrl: "https://agendadj.pt",
    resumo: "Liga DJs a fãs e a quem organiza eventos: agenda, press kit e comunidades. Na App Store.",
    longDescription:
      "Uma app completa para o mundo dos DJs em Portugal: marcações, eventos, acesso aos bastidores, ferramentas com AI e comunidades em tempo real.",
    tech: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "OpenAI"],
    problem:
      "Os DJs em Portugal não tinham um sítio único para gerir marcações, divulgar eventos e falar com quem os segue. Estava tudo espalhado por grupos de WhatsApp e pelo Instagram.",
    solution:
      "Uma app com gestão de eventos, importação de eventos a partir de imagens ou texto com AI, chat de comunidade em tempo real, press kits e um sistema de marcações para várias entidades.",
    result:
      "Mais de 40 ecrãs, 20 tabelas na base de dados, 8 funções no servidor, importação de vários eventos de uma vez com AI, comunidades com mensagens em tempo real e press kits gerados na app.",
    highlights: [
      { label: "Ecrãs", value: "40+" },
      { label: "Tabelas", value: "20" },
      { label: "Funções", value: "8" },
      { label: "Com AI", value: "3" },
    ],
  },
  {
    slug: "discord-bot-ai",
    title: "Discord AI Bot",
    type: "Bot",
    year: 2025,
    resumo: "Um bot de Discord com AI que percebe o contexto da conversa, modera e responde a comandos.",
    longDescription:
      "Bot de Discord que usa a API do Claude para conversas com memória, ferramentas de moderação do servidor e comandos próprios.",
    tech: ["Node.js", "Discord.js", "Claude API", "TypeScript"],
    problem: "As comunidades no Discord precisam de bots que percebam a conversa, e não só de bots que reconhecem comandos.",
    solution:
      "Um bot com a API do Claude para conversas de várias mensagens com memória, fluxos de moderação à medida e comandos fáceis de acrescentar.",
    result: "Bot no ar com conversas de AI, moderação do servidor e mais de 10 comandos próprios.",
    highlights: [
      { label: "Comandos", value: "10+" },
      { label: "Modelo", value: "Claude" },
      { label: "Ligado", value: "24/7" },
    ],
  },
  {
    slug: "dj-webpage",
    title: "DJ Dagô Website",
    type: "Site",
    year: 2025,
    resumo: "O meu site de booking como DJ: eventos, contacto e marcação directa.",
    longDescription:
      "Um site estático e rápido para marcações e para os eventos do DJ Dagô, com a lista das próximas datas e marcação directa pelo WhatsApp.",
    tech: ["HTML", "CSS", "JavaScript"],
    problem: "A tocar em Portugal e em Moçambique, precisava de um canal de marcações directo para além do Instagram.",
    solution: "Um site simples e rápido com as datas, a informação para marcar e um botão directo para o WhatsApp. Sem frameworks, sem peso a mais.",
    result: "Página de booking no ar, escura e fiel à marca, usada para marcações directas e para quem procura as próximas datas.",
    highlights: [
      { label: "Abre em", value: "<1 s" },
      { label: "Feito em", value: "Estático" },
      { label: "Marcações", value: "Directas" },
    ],
  },
  {
    slug: "lisboa-rio",
    title: "Lisboa Rio",
    type: "Design",
    year: 2026,
    estado: "Proposta",
    resumo: "Proposta de app para um clube à beira-rio em Lisboa: fidelização, eventos e acesso VIP.",
    longDescription:
      "Proposta de uma app nativa para o clube Lisboa Rio, com pontos de fidelização, eventos, bilhetes com QR, convites entre amigos e uma experiência pensada para quem volta.",
    tech: ["Expo", "React Native", "TypeScript", "Figma"],
    problem: "Os clubes dependem do Instagram e de plataformas de terceiros, sem um canal próprio para fidelizar os clientes da casa.",
    solution:
      "Desenhei uma app com pontos de fidelização, lista de eventos, leitura de bilhetes por QR, vantagens por nível e convites entre amigos.",
    result: "Proposta completa com mais de 10 ecrãs: entrada, eventos, bilhetes com QR, cartão virtual, programa de fidelização e funcionalidades para manter as pessoas a voltar.",
    highlights: [
      { label: "Ecrãs", value: "10+" },
      { label: "Funções", value: "6" },
    ],
  },
  {
    slug: "musictolegal",
    title: "MusicToLegal",
    type: "App web",
    year: 2026,
    resumo: "Lê a biblioteca de um DJ, reconhece cada faixa pelo som e faz a lista para as comprar legalmente.",
    longDescription:
      "Uma ferramenta para os DJs lerem a biblioteca de música, reconhecerem cada faixa pela impressão sonora e por outros métodos quando o primeiro falha, e receberem as ligações para comprar o que falta antes de uma fiscalização da ASAE.",
    tech: ["Python", "Flask", "AcoustID", "MusicBrainz", "iTunes API", "Chromaprint"],
    problem:
      "Em Portugal, um DJ precisa de prova de compra de cada faixa que toca em público. Identificar à mão centenas de faixas e descobrir onde comprar cada uma é impossível.",
    solution:
      "Uma análise em 8 fases: impressão sonora, identificação por API, cruzamento de metadados, pesquisa pelo nome do ficheiro no iTunes, detecção de remisturas e mashups, e verificação das ligações das lojas. Tudo numa página com nova análise por faixa, filtros e botões para cada loja.",
    result:
      "Lê bibliotecas inteiras, identifica mais de 90% das faixas e gera ligações verificadas para o Beatport, Traxsource, Bandcamp e iTunes. Reconhece sozinho remisturas, mashups e sets gravados.",
    highlights: [
      { label: "Identifica", value: "90%+" },
      { label: "Fases", value: "8" },
      { label: "Lojas", value: "4" },
      { label: "Testes", value: "23" },
    ],
  },
  {
    slug: "rna-tours",
    title: "RNA Tours",
    type: "Site",
    year: 2026,
    estado: "Proposta",
    resumo: "Proposta de site para uma agência de viagens de Lisboa, rápido e em várias línguas.",
    longDescription:
      "Proposta de site para uma empresa de turismo de Lisboa, com a lista de passeios, pedidos de reserva e três línguas.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    problem: "A agência tinha um site antigo que não transformava visitas em reservas.",
    solution: "Um site rápido e actual, com páginas claras para cada passeio, formulário de contacto e cuidado com a pesquisa no Google e a velocidade.",
    result: "Pronto a publicar na Vercel, com nota acima de 95 no Lighthouse, três línguas e um desenho pensado para levar à reserva.",
    highlights: [
      { label: "Lighthouse", value: "95+" },
      { label: "Línguas", value: "3" },
      { label: "Alojado", value: "Vercel" },
    ],
  },
  {
    slug: "tokyo-jamaica",
    title: "Tokyo Jamaica",
    type: "Design",
    year: 2026,
    estado: "Proposta",
    resumo: "Proposta de redesenho de uma app de streaming de música, escura e fluida.",
    longDescription:
      "Proposta de redesenho de uma app de música, a explorar um visual escuro com vidro fosco, pequenas animações em cada toque e uma navegação fluida.",
    tech: ["Figma", "React Native", "Framer Motion"],
    problem: "As apps de música parecem todas iguais. Quase todas copiam o Spotify e não têm personalidade.",
    solution:
      "Um visual escuro e ousado com vidro fosco, formas de onda animadas, navegação por gestos e uma identidade própria.",
    result: "Protótipo de alta fidelidade com componentes feitos à medida, a mostrar o que se consegue em interface e animação.",
    highlights: [
      { label: "Estilo", value: "Vidro fosco" },
      { label: "Animações", value: "12+" },
      { label: "Componentes", value: "À medida" },
    ],
  },
  {
    slug: "txx-app",
    title: "TxxTxxTxx App",
    type: "App móvel",
    year: 2026,
    estado: "Em curso",
    resumo: "A app privada do nosso grupo de amigos: xitique, viagens e jogos com AI. Na App Store.",
    longDescription:
      "App nativa para um grupo de 12 amigos moçambicanos. Gere o xitique (a poupança rotativa), as viagens do grupo, as bocas geradas por AI e os jogos, com entrada biométrica e notificações.",
    tech: ["Expo", "React Native", "TypeScript", "InstantDB", "Expo Router", "Biometria"],
    problem: "Gerir o xitique, saber quem já pagou e combinar as viagens do grupo pelo WhatsApp era o caos.",
    solution:
      "Uma app com o calendário de pagamentos do xitique, atalhos para o MB WAY, viagens, perfis de cada membro, gerador de bocas com AI, entrada com Face ID ou impressão digital e notificações. Com o contexto moçambicano lá dentro.",
    result: "App nativa com página inicial, carteira do xitique, viagens, galeria, jogos, calendário de eventos e votações, tudo com desempenho nativo e segurança biométrica.",
    highlights: [
      { label: "Membros", value: "12" },
      { label: "Módulos", value: "7" },
      { label: "Entrada", value: "Biométrica" },
      { label: "Base", value: "InstantDB" },
    ],
  },
  {
    slug: "library-dj",
    title: "Library DJ",
    type: "App de computador",
    year: 2026,
    liveUrl: "https://librarydj.me",
    resumo: "App de computador que arruma, limpa e completa a biblioteca de um DJ, com sugestões de género por AI.",
    longDescription:
      "Uma app de computador para DJs com milhares de faixas por arrumar. Lê as pastas de música e as etiquetas, encontra repetidas, sugere géneros com AI e exporta crates como listas M3U8. Feita com Tauri e Rust para ser rápida.",
    tech: ["Tauri v2", "React 19", "Rust", "SQLite", "Zustand", "Gemini AI", "Discogs API"],
    problem:
      "Um DJ junta milhares de faixas com etiquetas desarrumadas, sem género e repetidas. Limpar à mão uma biblioteca com mais de 16 mil faixas é impossível.",
    solution:
      "Uma app que lê as pastas, lê e escreve etiquetas, encontra repetidas pelo conteúdo, sugere géneros com o Gemini, vai buscar dados ao Discogs e cria crates por género, momento ou energia.",
    result:
      "Primeira versão lançada: instalador assinado para Mac, lista fluida com mais de 16 mil faixas, sugestões de género com AI, repetidas, exportação de crates, cópias de segurança e uma página com transferências protegidas.",
    highlights: [
      { label: "Faixas", value: "16 mil+" },
      { label: "Motor", value: "Rust" },
      { label: "AI", value: "Gemini" },
      { label: "Preço", value: "45 €" },
    ],
  },
  {
    slug: "ika-dogwear",
    title: "IKA Dogwear",
    type: "Loja online",
    year: 2026,
    liveUrl: "https://ikadogwear.com",
    resumo: "Loja online de coleiras e trelas feitas à mão, com gestão de encomendas e conteúdos.",
    longDescription:
      "Loja online de uma marca artesanal portuguesa de coleiras e trelas em paracord e biothane. Tem um painel próprio para editar os textos no sítio, gerir produtos e acompanhar encomendas, e está preparada para a pesquisa no Google.",
    tech: ["Next.js 16", "Tailwind v4", "Supabase", "Framer Motion", "Vercel Analytics"],
    problem:
      "Uma pequena marca artesanal precisava de uma loja à altura do trabalho feito à mão, com controlo total sobre os conteúdos e as encomendas, e sem pagar as taxas do Shopify.",
    solution:
      "Uma loja feita à medida, com edição dos textos no próprio site, gestão de produtos, encomendas com estados, exportação para CSV, aviso de cookies, perguntas frequentes e dados estruturados para o Google.",
    result:
      "Loja no ar com painel de gestão (resumo, produtos, encomendas), nota acima de 95 no Lighthouse, conforme ao RGPD, com newsletter e pronta para pagamentos com Stripe.",
    highlights: [
      { label: "Lighthouse", value: "95+" },
      { label: "Painel", value: "3 áreas" },
      { label: "Google", value: "JSON-LD" },
      { label: "Alojado", value: "Vercel" },
    ],
  },
  {
    slug: "clutchups",
    title: "ClutchUps",
    type: "App web",
    year: 2026,
    liveUrl: "https://clutchups.com",
    resumo: "Plataforma de apostas em partidas de Call of Duty, com torneios e classificações.",
    longDescription:
      "Plataforma competitiva onde os jogadores apostam dinheiro em partidas de Call of Duty. Tem classificação ELO, escolha de mapas, partidas em tempo real, pagamentos com Stripe, procura de equipa e um painel para resolver disputas.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Stripe", "Realtime Presence"],
    problem:
      "Os jogadores de CoD não tinham na Europa uma plataforma de confiança para partidas a dinheiro, com disputas bem resolvidas, emparelhamento justo e pagamentos seguros.",
    solution:
      "Uma plataforma com a partida toda em tempo real (fila, confirmação, voto do capitão, escolha de mapas, desafio, voto na série), depósitos e levantamentos com Stripe, classificação ELO, denúncias com painel de gestão e procura de equipa.",
    result:
      "No ar com pagamentos por cartão, MB WAY e PayPal, 6 níveis de experiência, séries à melhor de 1, 3, 5 ou 7, apostas de quem assiste, sorteio de mapas verificável e resolução de disputas completa.",
    highlights: [
      { label: "Pagamentos", value: "Stripe" },
      { label: "Níveis", value: "6" },
      { label: "Tempo real", value: "Sim" },
      { label: "Séries", value: "Até 7" },
    ],
  },
  {
    slug: "instagram-analytics",
    title: "Instagram Analytics",
    type: "Automação",
    year: 2026,
    resumo: "Ferramentas para o Instagram de um DJ: estatísticas, publicação, legendas e calendário.",
    longDescription:
      "Conjunto de ferramentas em Python para gerir a conta de Instagram @deejay.dago. Vai buscar as estatísticas à API da Meta, escreve legendas, agenda publicações e acompanha o envolvimento.",
    tech: ["Python", "Meta Graph API", "Instagram API"],
    problem:
      "Manter o Instagram de um DJ obriga a publicar sempre, perceber o que resulta e adaptar o conteúdo, tudo à mão e espalhado por várias ferramentas da Meta.",
    solution:
      "9 módulos em Python para estatísticas, publicação, legendas, calendário e envolvimento, todos ligados à API da Meta.",
    result:
      "Em uso numa conta com 9,4 mil seguidores. O que melhor resulta: terças às 9h, e os carrosséis com 2,11% de envolvimento. A publicação está pronta e o módulo de anúncios por fazer.",
    highlights: [
      { label: "Seguidores", value: "9,4 mil" },
      { label: "Módulos", value: "9" },
      { label: "Melhor hora", value: "Ter 9h" },
      { label: "Melhor formato", value: "Carrossel" },
    ],
  },
  {
    slug: "songer",
    title: "Songer",
    type: "App de computador",
    year: 2025,
    liveUrl: "https://songerapp.me",
    resumo: "Gestor de música para DJs e coleccionadores: biblioteca, leitor, Spotify e transferências.",
    longDescription:
      "Gestor de música para o computador, feito em Python com PyQt6. Percorre a biblioteca, toca as faixas num leitor próprio, pesquisa no Spotify, transfere com yt-dlp e edita as etiquetas, tudo na mesma app.",
    tech: ["Python", "PyQt6", "Spotipy", "yt-dlp", "Mutagen", "FFmpeg"],
    problem:
      "DJs e coleccionadores precisam de uma só ferramenta para ver a biblioteca, ouvir faixas, descobrir música nova e transferir, sem saltar entre cinco apps.",
    solution:
      "Uma app com a biblioteca, leitor de áudio, pesquisa no Spotify, transferências com yt-dlp, edição de etiquetas e uma página inicial com atalhos.",
    result:
      "Versão 2.0.0 lançada: visual novo, leitor integrado, filtros na biblioteca, Spotify, transferências do YouTube e funciona em Mac e Windows.",
    highlights: [
      { label: "Versão", value: "2.0.0" },
      { label: "Leitor", value: "Integrado" },
      { label: "Transferências", value: "yt-dlp" },
      { label: "Etiquetas", value: "Mutagen" },
    ],
  },
  {
    slug: "theoffice",
    title: "theOFFICE / GRVVE",
    type: "App web",
    year: 2026,
    estado: "Em curso",
    resumo: "Um escritório de marketing com agentes de AI para os eventos da GRVVE.",
    longDescription:
      "Um motor de marketing com AI para os conceitos da GRVVE (Fiesta Dura, SALERO, Bashment, Remember, Apupu). Agentes autónomos criam conteúdo, planeiam publicações e escolhem o público. Por agora corre em simulação, com resultados só internos.",
    tech: ["Node.js", "TypeScript", "React", "Phaser 3", "Supabase", "Agentes de AI"],
    problem:
      "Promover vários eventos recorrentes para públicos diferentes exige trabalho manual constante (publicações, stories, público, horários) que não escala.",
    solution:
      "Um sistema em que agentes de marketing autónomos criam conteúdo, planeiam campanhas e simulam a reacção do público para cada conceito, com um painel visual em React e Phaser.",
    result:
      "A simulação funciona, com servidor, a cadeia de agentes e o painel. Falta ligar aos anúncios da Meta e à publicação no Instagram.",
    highlights: [
      { label: "Conceitos", value: "5" },
      { label: "Modo", value: "Simulação" },
      { label: "Agentes", value: "AI" },
      { label: "Painel", value: "Phaser 3" },
    ],
  },
  {
    slug: "gabineteos",
    title: "GabineteOS",
    type: "Software",
    year: 2026,
    estado: "Em curso",
    resumo: "Software para gabinetes de contabilidade portugueses gerirem vários clientes num só sítio.",
    longDescription:
      "Plataforma para gabinetes de contabilidade portugueses: várias organizações, acompanhamento de clientes, fluxos de serviço, registo de actividade e trabalho em equipa, num monorepo com Turborepo.",
    tech: ["Next.js 15", "NestJS", "Drizzle", "PostgreSQL", "Redis", "Turborepo", "Bun"],
    problem:
      "Os gabinetes de contabilidade gerem dezenas de clientes em folhas de cálculo e ferramentas soltas, sem um sítio central para fluxos, prazos e coordenação da equipa.",
    solution:
      "Servidor em NestJS (autenticação, organizações, clientes, serviços), Drizzle com PostgreSQL e cache em Redis, e a interface em Next.js 15 com shadcn/ui. Monorepo com Turborepo e Bun.",
    result:
      "Fases 0 a 3 do servidor feitas (autenticação, organizações, clientes, serviços, actividade). A fase 4, da interface, espera pelo acerto com a equipa.",
    highlights: [
      { label: "Servidor", value: "NestJS" },
      { label: "ORM", value: "Drizzle" },
      { label: "Cache", value: "Redis" },
      { label: "Monorepo", value: "Turborepo" },
    ],
  },
  {
    slug: "presencas-professor",
    title: "Presenças Professor",
    type: "App web",
    year: 2025,
    liveUrl: "https://presencasprofessor.pt",
    resumo: "Registo de presenças para uma educadora de infância, simples e rápido para o dia a dia.",
    longDescription:
      "Uma app web feita para uma amiga educadora de infância registar as presenças todos os dias. Pensada para ser rápida: abrir, tocar em presente ou ausente, e pronto. Um dos primeiros projectos feitos para uma pessoa real.",
    tech: ["HTML", "CSS", "JavaScript"],
    problem:
      "A educadora registava as presenças em papel todos os dias. Era lento, confuso e difícil de rever no fim do mês.",
    solution:
      "Uma app simples: abre-se todos os dias, marca-se cada criança como presente ou ausente com um toque, e o histórico está sempre à mão.",
    result:
      "Em uso diário pela educadora. Abre depressa, funciona bem no telemóvel e não pede login: é abrir e marcar.",
    highlights: [
      { label: "Pessoas", value: "1" },
      { label: "Uso", value: "Diário" },
      { label: "Feito em", value: "JavaScript" },
    ],
  },
];
