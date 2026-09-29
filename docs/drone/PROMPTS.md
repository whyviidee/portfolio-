# Drone shot: prompts por afinar (29 Set 2026)

Nada gerado ainda. Primeiro afinamos isto, depois gasta-se.

## Decisões por confirmar com o Yuri

1. **O arco da luz** (confirmado pelo Yuri a 29 Set: fim ao nascer do sol): Maputo ao fim da tarde, Maputo de noite (a janela do quarto), o oceano de noite, Lisboa iluminada, o Cais de noite, o palco de noite, e o fim **ao nascer do sol no Tejo**. A luz nunca anda para trás.
2. **A figura é sempre pequena** (entre 1/12 e 1/8 da altura do ecrã), de costas ou de três quartos. Nunca de frente, nunca em grande plano.
3. **Cada versão do Yuri tem uma peça que a identifica mesmo de longe**: em miúdo, calções de banho vermelhos; aos 15, na cama com headphones e o controlador em cima dele; aos 18, mochila; WhyViiDee, headphones ao pescoço; Dagô, na cabine de braço no ar; hoje, t-shirt branca e fio de prata.

## Quem é o Yuri (bloco de identidade, vai em todos os prompts)

Referências carregadas no OpenArt: `yuri-adulto-corpo.jpg` (corpo inteiro, de pé, t-shirt branca), `yuri-cabine.jpg` (na cabine), `6-setup-casa-2018.jpg` (2018, boné), `1-maputo-piscina.jpg` (em criança).

Qual referência para cada época: a de 2018 com o boné "já não sou tão eu hoje em dia, mas faz parte da minha vida" (o Yuri, 29 Set), por isso serve só para os anos de WhyViiDee (paragens 3 e 4). O Yuri de hoje (paragens 5 e 6) sai só de `yuri-adulto-corpo` e `yuri-cabine`.

```
The man is Yuri, a Mozambican of mixed heritage in his early thirties: slim and
athletic, warm light-brown skin, very short black hair, a short beard and moustache,
often thin dark sunglasses, relaxed posture. Match his body, skin tone, hair and proportions exactly to the
reference photos. He is always small in frame and seen from behind or three-quarter
back view, never facing the camera.
```

## Estilo (vai em todos os prompts)

```
Real aerial drone footage, shot on a DJI Mavic 3 Cine at 30 to 60 metres, 24mm,
natural colour as the sensor saw it, no cinematic grading, no teal and orange, gentle
atmospheric haze, true-to-life scale and architecture, real people going about their
evening who ignore the camera, subtle motion blur on moving cars and waves.
Photorealistic documentary, not a render, not an illustration. No text, no logos,
no watermarks.
```

## As seis imagens-chave (Nano Banana Pro, image2image, 16:9, 4K)

**1. Marginal de Maputo, fim da tarde (o início do site).** Referências: local-marginal, 1-maputo-piscina.
```
Aerial drone view looking out over the Indian Ocean from the Avenida da Marginal in
Maputo at golden hour, the old weathered concrete sea wall running diagonally across
the frame, the city skyline soft on the left, a cargo ship on the horizon, palm trees
and a few parked cars along the avenue. On the sea wall, small in frame, a
ten-year-old Mozambican boy with short black hair, slim, in red swim shorts and a
faded t-shirt, sits with his legs hanging over the water, seen from behind, looking at
the sea. Match the boy's skin tone and build to the childhood reference photo.
```

**2. Maputo de noite, a janela do quarto.** A cena verdadeira, nas palavras do Yuri: "aprendi quase tudo sozinho no quarto, com fones antes de dormir, com a controladora em cima de mim e o PC ao lado, e a minha mãe a mandar-me ir dormir porque tinha escola no dia seguinte". As festas da escola e de amigos vão para o texto do site.
```
Aerial drone view at night slowly approaching a mid-rise apartment building in Maputo,
concrete balconies, most windows dark, jacaranda trees in the street below, a
streetlight. One window on the third floor is open and lit by the blue glow of a
laptop screen. Through the window, small in frame, a fifteen-year-old Mozambican boy
with short black hair lies in bed wearing big headphones, a small two-deck DJ
controller resting on his lap and a laptop on the bed beside him, absorbed in the
music. The warm light of the corridor falls through a half-open bedroom door behind
him, as if someone has just looked in to tell him to go to sleep.
```

**3. A chegada a Lisboa pelo Tejo, de noite.**
```
Aerial drone view flying in low over the Tagus river at night towards Lisbon, the
25 de Abril bridge lit on the right, the Cristo Rei on the south bank behind it, the
Lisbon hills with warm lights ahead. On the riverside walkway at Cais do Sodré, small
in frame, an eighteen-year-old young man with a backpack and a travel suitcase stands
looking at the city, seen from behind.
```

**4. Cais do Sodré de noite, a Rua Nova do Carvalho.**
```
Aerial drone view at night gliding over the Rua Nova do Carvalho in Cais do Sodré,
Lisbon, the street painted pink, strings of lights, crowds of young people outside
the bars, the small facade of a late-night bar with warm light spilling out of the
door. At the door, small in frame, a young DJ with headphones around his neck and a
record bag talks to a group of friends, seen three-quarter from behind.
```

**5. O palco grande.**
```
Aerial drone view flying into an open riverside warehouse venue in Lisbon at night,
an industrial steel roof, a crowd of thousands with hands in the air, warm stage
lights and haze. On the DJ booth at the far end, small in frame and lit from behind,
a DJ with headphones raises one arm to the crowd. Match the DJ's build and profile to
the booth reference photo.
```

**6. O fim: o Tejo ao nascer do sol.**
```
Aerial drone view at sunrise over the Cais das Colunas in Lisbon, the two marble
columns and the stone steps going into the calm Tagus, soft pink and gold light, the
river mirror-still, gulls, the 25 de Abril bridge far in the distance. Sitting alone
on the top step, small in frame, a man in a plain white t-shirt with a thin silver
chain looks at the river, seen from behind. Match his body, skin tone and hair to the
full-body reference photo.
```

## O vídeo (Wan 3.0 prime, 1080p, sem som, primeiro e último frame)

Cinco troços, cada um entre duas imagens-chave, 8 s cada, 40 s no total.
Prompt base de cada troço (muda só a descrição do caminho):

```
One continuous aerial drone shot, smooth and steady forward flight with no cuts, no
zoom, no speed ramps, gently changing altitude. {caminho}. Real people and traffic
keep moving naturally, the water ripples, lights flicker slightly. Keep the small
figure of the man consistent with the first frame. Natural colour, real drone
footage, photorealistic.
```

Caminhos:
1. do 1 ao 2: "The drone rises from the sea wall, turns away from the ocean and glides over the Maputo avenues as dusk turns to night, slowing down in front of a lit bedroom window"
2. do 2 ao 3: "The drone pulls back from the window, climbs above the rooftops into the night sky, flies over the dark ocean and descends over the Tagus as the lights of Lisbon appear"
3. do 3 ao 4: "The drone passes over the young man on the riverside and turns into the narrow streets of Cais do Sodré, arriving above the pink street full of people"
4. do 4 ao 5: "The drone follows the river at night and flies through the open doors of a warehouse, above the crowd, towards the DJ booth"
5. do 5 ao 6: "The drone rises through the warehouse roof into the night, and as dawn breaks it flies along the river to the Cais das Colunas, slowing down above the man sitting on the steps"

## Custo previsto

Imagens: 6 × 40 = 240 por volta (conto com 2 a 3 voltas: ~700).
Vídeo: 5 × 1 120 = 5 600 (Wan 3.0 prime, 1080p, 8 s).
Total ~6 300 de 7 900 aprovados.

## Registo de gerações

- 29 Set, imagem 1 (Marginal), 2 versões, ~80 créditos: o Yuri: "o miúdo parece mesmo eu". Escolhida a versão B (luz mais quente, drone baixo atrás dele, dá para subir no vídeo). OpenArt: resource `WdS1vEirw9D3YGyZBDCA`. Nota: a versão A punha o miúdo de lado, virado para o passeio.
- 29 Set, imagens 2 a 6, 2 versões cada, ~400 créditos, com a imagem 1 como referência de cor e realismo. Histories: 2 `gVkHSeZlJOw8uWdptXNf`, 3 `wHUKeaSNEpGM5Kc67AmF`, 4 `bV3dXL8NKETBuGHPffDj`, 5 `k4EWArtyTY1dUzRoAnml`, 6 `ro5DQbPpEeuv3BXEIBqX`.
- 29 Set: o Yuri: o homem sentado no Cais "não tem nada a ver comigo", pediu melhores referências. Erro meu: descrevi-o "alto e largo"; nas fotos é magro e atlético, barba curta, óculos escuros finos muitas vezes. Carregadas 7 fotos recentes do Instagram dele (`hoje-corpo-rosa/porta/rua`, `hoje-cara`, `hoje-cabine-1/2`, `hoje-bracos`). Refeitas a 6 (mesma cena, só troca o homem) e a 5 (ele de perto a tocar, pedido dele: "quero eu hoje em dia a tocar mesmo"). Histories: 6 `bItaKuqxPaMpGijdaI6P`, 5 `lUMOZetFtY1mGXRqKXtI`.
