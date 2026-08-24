<img src="src/lib/assets/logo.svg" width="80px" align="right">

### `GeoTrainr`

### The site is available online and for free here: [GeoTrainr](https://geotrainr-jet.vercel.app/)

## Project Overview

GeoTrainr is an interactive training platform for geography enthusiasts and GeoGuessr players.
The game offers two training modes based on flag and language recognition.

## Tech Stack

- **[SvelteKit](https://svelte.dev/docs/kit)** (Svelte 5) — framework & routing
- **[Tailwind CSS v4](https://tailwindcss.com/)** — styling
- **[shadcn-svelte](https://www.shadcn-svelte.com/)** — UI components
- **[GSAP](https://gsap.com/)** — animations
- **[Lucide](https://lucide.dev/)** — icons
- **[svelte-i18next](https://github.com/NishuGoel/svelte-i18next)** — internationalization (FR/EN)
- **Bun** — package manager

## Features

- **Flags Quiz**: Test your knowledge of world flags by identifying the correct country among several options.
- **Languages Quiz**: Identify the language of a displayed sentence, choosing from plausible answers based on logical groupings.
- **Dark Mode**: An interface adapted to user preferences (light / dark / system).
- **Responsive**: Fully responsive interface for mobile, tablet, and desktop devices.
- **Timer**: Option to add a timer to questions
- **Multilingual**: Available in French and English

## Game Modes

### Flags Mode (`/flags-quiz`)

In this mode, a flag image is displayed, and you must identify the corresponding country from five options.

#### Question Generation

- Flags are obtained dynamically via the [FlagCDN](https://flagcdn.com/) API.
- A list of countries is stored in JSON files (`src/lib/data/{fr,en}/flags.json`), organized by continent.
- A country is randomly selected as the correct answer.
- Four other countries from the same continent are randomly chosen as incorrect answers.
- The five options are shuffled to ensure fairness.

### Scripts Mode (`/scripts-quiz`)

In this mode, a sentence is displayed, and you must identify the language it is written in.

#### Question Generation

- Sentences are stored in `src/lib/data/{fr,en}/languages.json`, structured by linguistic regions.
- A language is randomly selected, and an associated sentence is displayed.
- Incorrect answers are selected from languages in the same regional group, ensuring all options appear plausible.
- The five choices are shuffled to avoid any predictable repetition.

## Interface and Accessibility

- Modern and clean interface built with shadcn-svelte.
- Dark mode for better readability.
- Smooth GSAP-powered transitions and animations between questions.

## Contributing

All contributions are welcome! To contribute:

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js with npm)

1. Clone the project

```sh
# Clone the project
git clone https://github.com/GautierPicon/GeoTrainr.git
cd GeoTrainr

# Install dependencies
bun install
```

### Start the website

```sh
bun run dev
```

The application will be accessible at `http://localhost:5173/`, unless another site is already using this location. In that case, refer to the link displayed in your terminal.

If you find a bug or want to suggest an improvement, you can open an issue [here](https://github.com/Gautierpicon/GeoTrainr/issues/new).
