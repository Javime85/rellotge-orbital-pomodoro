# Rellotge Orbital Pomodoro 🚀⏰

Extensió de navegador Firefox (Manifest V3) que combina un **rellotge orbital abstracte** amb un **temporitzador Pomodoro** complet. Reutilitza l'animació del *Rellotge Creatiu* adaptada a popup 300x150px.

[![Firefox Extension](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox)](https://addons.mozilla.org/)
[![p5.js](https://img.shields.io/badge/p5.js-FFFFFF?style=for-the-badge&logo=p5.js)](https://p5js.org/)
[![Manifest%20V3](https://img.shields.io/badge/Manifest-V3-4285F4?style=for-the-badge&logo=Google-Chrome)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

## ✨ Funcionalitats

- **Rellotge orbital abstracte**: hores, minuts i segons en 3 òrbites concèntriques.
- **Pomodoro clàssic**: 25 min treball / 5 min descans curt / 15 min descans llarg.
- **Persistència d'estat**: `storeItem()` / `getItem()` – continua exactament on ho vas deixar.
- **Feedback visual**: colors i arc de progrés diferents per fase.
- **Feedback auditiu**: sons curts al canvi de fase (ZapSplat, Mixkit, Uppbeat).
- **Controls**: Iniciar • Pausa • Reinicia.
- **UI responsive**: disseny net 300x150 px optimitzat per popup.

## 🎮 Com usar

### 1. Instal·lació local (Firefox)

1. Descarrega o clona el repositori.
2. A Firefox obre `about:debugging` → **This Firefox**.
3. Clica **Load Temporary Add-on** i selecciona `manifest.json`.
4. Fes clic a la icona de l’extensió per obrir la popup.

### 2. Controls

- **Iniciar**: comença sessió de treball (o reprèn si estava en pausa).
- **Pausa**: atura temporitzador (manté progrés).
- **Reinicia**: torna a estat inicial.

## 🛠 Tecnologies

p5.js + HTML5 Audio + localStorage + Manifest V3
├── Animació: p5.js canvas 300x100
├── Persistència: storeItem() / getItem()
├── Sons: HTML5 Audio() API
├── UI: DOM + CSS3 Flexbox + Shadows
└── Extensió: Firefox WebExtensions API

## 📂 Estructura

├── manifest.json # Configuració extensió + permís "storage"
├── popup.html # Estructura popup 300x150
├── popup.css # Estils externs responsius
├── popup.js # Lògica p5.js + Pomodoro + localStorage
├── p5.min.js # Llibreria p5.js
├── assets/ # Sons + imatges de fases
└── icons/ # Icones extensió (16/32/48/128 px)

## 🎵 Fonts dels sons (llicències gratuïtes)

| Fase        | So         | Font                                                                 | Llicència              |
|-------------|------------|----------------------------------------------------------------------|------------------------|
| Treball     | `work.mp3` | [ZapSplat](https://www.zapsplat.com/sound-effect-category/alerts-and-prompts/?item_id=164982) | Standard License (atribució) |
| Descans curt| `short.mp3`| [Mixkit](https://mixkit.co/free-sound-effects/notification/)        | Mixkit License         |
| Descans llarg| `long.mp3`| [Uppbeat](https://uppbeat.io/sfx/game-ui-level-unlock/166805/58158) | Uppbeat Free License   |

**Atribució ZapSplat**: sound effects obtained from [zapsplat.com](https://www.zapsplat.com).

## 🖼 Fonts de les imatges

| Fitxer                  | Ús                    | Origen / Autor                                                                 | Llicència                                |
|-------------------------|-----------------------|-------------------------------------------------------------------------------|------------------------------------------|
| `assets/work.png`       | Icona fase de treball | [Freepik – Information icon](https://www.freepik.com/free-vector/man-safety-vest-is-holding-pickaxe_256078407.htm#fromView=search&page=1&position=22&uuid=5b929706-8e6f-436a-911f-87c7f63459cf&query=persona+trabajando+mina)                            | Freepik Free License (atribució requerida) |
| `assets/shortbreak.png` | Icona descans curt    | [Freepik – Information icon](https://www.freepik.com/free-vector/young-girl-watching-movie-woman-lying-sofa-with-tablet-smiling-teenager-having-fun-surfing-internet_23591864.htm#fromView=search&page=1&position=25&uuid=f22a93bc-ccfc-43d9-b369-cf75cac07b46&query=persona+durmiendo+sofa)                      | Freepik Free License (atribució requerida) |
| `assets/longbreak.png`  | Icona descans llarg   | [Freepik – Information icon](http://freepik.com/free-vector/cute-unicorn-sleeping-moon-cartoon-vector-illustration-animal-space-concept-isolated-vector-flat-cartoon-style_10336144.htm#fromView=search&page=1&position=1&uuid=f5f0248b-ff99-46e8-8bac-c257814c39be&query=luna+dormida)                       | Freepik Free License (atribució requerida) |

**Atribució Freepik**: icons designed by Freepik – free for use with attribution. 
Més informació de llicència: https://support.freepik.com/s/topic/0TO3V000000Cla4WAC/licenses


## 📚 Documentació acadèmica

- **Repte 3 UOC**: *Extensió web* – Desenvolupament d'aplicacions interactives.

## 🔧 Instal·lació de desenvolupament

git clone https://github.com/Javime85/rellotge-orbital-pomodoro.git
cd rellotge-orbital-pomodoro

## 📄 Llicència

Projecte acadèmic UOC © 2025 Javier Villalón Mena.  
Els recursos externs (sons, imatges) estan subjectes a les seves pròpies llicències (vegeu la secció **Fonts dels sons**).

Aquest projecte està sota llicència:

[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## 🙌 Autor

**Javier Villalón Mena**  
Estudiant Grau Multimèdia • UOC

