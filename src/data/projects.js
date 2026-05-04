export const PROJECTS = [
  {
    id: "natura-prenestina",
    title: "Natura Prenestina",
    categories: ["Games"],
    description: {
      it: "Gioco mobile educativo sulla biodiversità dei Monti Prenestini.",
      en: "Educational mobile game about the biodiversity of the Monti Prenestini.",
    },
    longDescription: {
      it: "Edu game sviluppato interamente in Unity per Movie Logic. Due modalità di gioco: Esplorazione (libera, immersiva, per scoprire flora e fauna locali) e Sfida (a tempo, missioni di ricerca di specie). Pubblicato su App Store e Google Play.",
      en: "Edu game built entirely in Unity for Movie Logic. Two game modes: Exploration (free, immersive, to discover local flora and fauna) and Challenge (timed, species-hunting missions). Published on the App Store and Google Play.",
    },
    images: [
      "/images/Prenestina-1.jpg",
      "/images/natura-prenestina.jpg",
      "/images/natura-prenestina-2.jpg",
      "/images/natura-prenestina-3.jpg",
    ],
    tags: ["Unity", "Mobile Game", "Edu Learning", "iOS", "Android"],
    metadata: {
      role: {
        it: "Sole Unity Developer + supporto game design",
        en: "Sole Unity Developer + game design support",
      },
      year: "2023",
      client: "Movie Logic",
      tech: "Unity, C#, Android, iOS",
      links: {
        appStore: "https://apps.apple.com/it/app/natura-prenestina/id6451042925",
        googlePlay:
            "https://play.google.com/store/apps/details?id=com.MovieLogicSRL.naturaprenestina",
      },
    },
  },
  {
    id: "archeo-spoletino",
    title: "Archeo Spoletino",
    categories: ["Games"],
    description: {
      it: "Serious game didattico di archeologia.",
      en: "Educational archaeology serious game.",
    },
    longDescription: {
      it: "Serious game per il Comune di Civitella d'Agliano. Il giocatore veste i panni di un giovane archeologo che lavora su un sito di scavo nella Tuscia: scopre quattro reperti danneggiati e li ricompone tramite puzzle a difficoltà crescente, sbloccando contesto storico-culturale per ogni oggetto. Pubblicato su App Store e Google Play.",
      en: "Serious game for the Municipality of Civitella d'Agliano. The player takes on the role of a young archaeologist working on a dig site in Tuscia: they uncover four damaged artifacts and reassemble them through increasingly hard puzzles, unlocking historical and cultural context for each one. Published on the App Store and Google Play.",
    },
    images: [
      "/images/Archeo-1.jpg",
      "/images/Archeo-2.jpg",
      "/images/Archeo-3.jpg",
    ],
    tags: ["Unity", "Serious Game", "Mobile Game", "Cultural Heritage", "iOS", "Android"],
    metadata: {
      role: {
        it: "Unity Developer",
        en: "Unity Developer",
      },
      year: "2022",
      client: "Movie Logic / Comune di Civitella d'Agliano",
      tech: "Unity, C#, Android, iOS",
      links: {
        appStore: "https://apps.apple.com/it/app/archeospoletino/id6449252831",
        googlePlay:
            "https://play.google.com/store/apps/details?id=com.MovieLogic.ArcheoSpoletino&hl=it",
      },
    },
  },
  {
    id: "dickens",
    title: "Dickens",
    categories: ["Games"],
    description: {
      it: "Multiplayer horror escape game con generazione procedurale.",
      en: "Multiplayer horror escape game with procedural generation.",
    },
    longDescription: {
      it: "Progetto personale: horror co-op e PvP ambientato in un labirinto generato proceduralmente, popolato da mostri. I giocatori devono fuggire raccogliendo dispositivi che innescano interazioni tra mostri e giocatori e tra giocatori stessi. Sfide tecniche principali: algoritmo di generazione del dungeon, networking con Unity Netcode for GameObjects con componente custom di sincronizzazione del Rigidbody per fisica fluida tra host e client, plugin custom per il baking delle lightmap sui prefab (funzionalità non nativa in Unity). Progetto sospeso per mancanza di team artistico dedicato.",
      en: "Personal project: co-op and PvP horror set in a procedurally generated maze populated by monsters. Players must escape by collecting devices that trigger interactions between monsters and players, and between players themselves. Key technical challenges: dungeon-generation algorithm, networking with Unity Netcode for GameObjects with a custom Rigidbody synchronization component for smooth physics between host and clients, custom plugin for baking lightmaps on prefabs (a feature not natively available in Unity). Project on hold due to the lack of a dedicated art team.",
    },
    images: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&auto=format&fit=crop",
    ],
    tags: ["Unity", "Multiplayer", "Horror", "Procedural Generation", "Netcode"],
    metadata: {
      role: { it: "Sole Developer", en: "Sole Developer" },
      year: "2024",
      client: { it: "Progetto personale", en: "Personal Project" },
      tech: "Unity, C#, Netcode for GameObjects, Procedural Generation",
    },
  },
  {
    id: "ecomic",
    title: "Ecomic - Ministero della Cultura",
    categories: ["VR/AR", "Digital Twin & Apps"],
    description: {
      it: "App turistiche con AR per il programma Ecomic del MiC. Attualmente in sviluppo.",
      en: "Tourist apps with AR for the Ecomic program of the Italian Ministry of Culture. Currently in development",
    },
    longDescription: {
      it: "Sviluppo lato Unity di 3 app turistiche Android e iOS per il programma Ecomic del Ministero della Cultura, pensate per incentivare la visita ai luoghi della cultura. Le app mostrano POI, percorsi, video, audio e testi caricati dagli operatori tramite una dashboard online, con supporto alla modalità AR. Progetto in corso, coperto da NDA.",
      en: "Unity-side development of 3 tourist apps on Android and iOS for the Ecomic program of the Italian Ministry of Culture, aimed at encouraging visits to cultural sites. The apps show POIs, routes, videos, audio and texts uploaded by operators through an online dashboard, with AR mode support. Ongoing project, under NDA.",
    },
    images: [
      "https://images.unsplash.com/photo-1626387346567-68d0c9b27cb1?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=1200&q=80&auto=format&fit=crop",
    ],
    tags: ["Unity", "AR", "Mobile", "Cultural Heritage", "iOS", "Android"],
    metadata: {
      role: { it: "Unity Developer", en: "Unity Developer" },
      year: "2025",
      client: "Movie Logic / Ministero della Cultura",
      tech: "Unity, C#, AR Foundation, Android, iOS",
    },
  },
  {
    id: "idego-vr",
    title: "Idego VR Healthcare Training",
    categories: ["VR/AR"],
    description: {
      it: "Simulazione VR per training sanitario domiciliare.",
      en: "VR simulation for home-care healthcare training.",
    },
    longDescription: {
      it: "Applicazione VR per Oculus che simula diversi interventi a domicilio dei pazienti. Mi sono occupato di sincronizzare il sistema di animazioni con gli eventi di gioco, di un sistema interattivo di domande e risposte e del report strutturato delle risposte date dai trainee.",
      en: "VR application for Oculus simulating various interventions at patients' homes. I handled syncing the animation system with game events, an interactive Q&A system and a structured report of trainee answers.",
    },
    images: [
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&q=80&auto=format&fit=crop",
    ],
    tags: ["Unity", "VR", "Oculus", "Healthcare", "Training Simulation"],
    metadata: {
      role: { it: "Unity VR Developer", en: "Unity VR Developer" },
      year: "2025",
      client: "Idego",
      tech: "Unity, C#, Oculus SDK",
    },
  },
  {
    id: "spectra",
    title: "Spectra",
    categories: ["Web"],
    description: {
      it: "Piattaforma per film interattivi e gallerie 3D WebGL.",
      en: "Platform for interactive films and 3D WebGL galleries.",
    },
    longDescription: {
      it: "Piattaforma full-stack di Movie Logic dedicata a film interattivi e gallerie/spazi 3D WebGL. Sviluppo sia frontend (React) che backend (ASP.NET Core). Aggiornamento corposo della piattaforma attualmente in lavorazione.",
      en: "Movie Logic's full-stack platform dedicated to interactive films and 3D WebGL galleries/spaces. I work on both frontend (React) and backend (ASP.NET Core). A major update to the platform is currently in progress.",
    },
    images: [
      "/images/Sivalanet-1.jpg",
      "/images/Real-estate-1.jpg",
      "/images/Real-estate-2.jpg",
      "/images/Calcata-1.jpg",
    ],
    tags: ["Unity", "WebGL", "React", "ASP.NET Core", "Interactive Film"],
    metadata: {
      role: { it: "Full-stack Developer", en: "Full-stack Developer" },
      year: { it: "2022 - presente", en: "2022 - present" },
      client: "Movie Logic",
      tech: "React, ASP.NET Core, Unity WebGL",
    },
  },
  {
    id: "itinero",
    title: "Itinero",
    categories: ["Digital Twin & Apps"],
    description: {
      it: "App mobile turistica con backend Clean Architecture / CQRS.",
      en: "Tourist mobile app with a Clean Architecture / CQRS backend.",
    },
    longDescription: {
      it: "App mobile e backend di Itinero, progetto storico di Movie Logic. In produzione dal 2023, pubblicato su App Store e Google Play. Backend in ASP.NET Core e PostgreSQL strutturato secondo Clean Architecture e CQRS.",
      en: "Mobile app and backend for Itinero, a long-running Movie Logic project. In production since 2023 and published on the App Store and Google Play. Backend in ASP.NET Core and PostgreSQL structured around Clean Architecture and CQRS.",
    },
    images: [
      "/images/Itinero-1.jpg",
      "/images/itinero-2.jpg",
      "/images/itinero-3.jpg",
    ],
    tags: ["ASP.NET Core", "PostgreSQL", "Mobile", "Clean Architecture", "CQRS"],
    metadata: {
      role: {
        it: "Mobile + Backend Developer",
        en: "Mobile + Backend Developer",
      },
      year: "2023",
      client: "Movie Logic",
      tech: "ASP.NET Core, PostgreSQL, Clean Architecture, CQRS",
    },
  },
  {
    id: "trenitalia",
    title: "Digital Twin Trenitalia",
    categories: ["Digital Twin & Apps"],
    description: {
      it: "Sistema di monitoraggio 3D real-time per flotta alta velocità.",
      en: "Real-time 3D monitoring system for the high-speed fleet.",
    },
    longDescription: {
      it: "Sistema di monitoraggio Digital Twin sviluppato in Unity per la flotta alta velocità di Trenitalia, in uso su touch-table professionali nella sala controllo centralizzata. Architettura a tre livelli: mappa nazionale georeferenziata, dashboard real-time per comfort e diagnostica dei vagoni, Digital Twin 3D per la visualizzazione delle anomalie.",
      en: "Digital Twin monitoring system built in Unity for Trenitalia's high-speed fleet, running on professional touch-tables in the centralized control room. Three-tier architecture: georeferenced national map, real-time dashboard for car comfort and diagnostics, 3D Digital Twin for anomaly visualization.",
    },
    images: ["/images/trenitalia_1.png", "/images/trenitalia_2.png"],
    tags: ["Unity", "Digital Twin", "DSS", "IoT", "Touch Table"],
    metadata: {
      role: { it: "Unity Developer", en: "Unity Developer" },
      year: "2020 - 2021",
      client: "KeyBiz / Trenitalia",
      tech: "Unity, C#, IoT integration",
    },
  },
  {
    id: "reggia-caserta",
    title: "Reggia di Caserta",
    categories: ["Web", "VR/AR"],
    description: {
      it: "Diorama WebGL ed esperienza VR per Oculus.",
      en: "WebGL diorama and VR experience for Oculus.",
    },
    longDescription: {
      it: "Per Digimax, ho sviluppato due esperienze dedicate alla Reggia di Caserta: un diorama interattivo in WebGL fruibile da browser e un'esperienza VR per Oculus. Entrambe realizzate in Unity.",
      en: "For Digimax, I built two experiences dedicated to the Royal Palace of Caserta: an interactive WebGL diorama playable in the browser and a VR experience for Oculus. Both built in Unity.",
    },
    images: [
      "/images/Parco-Reale-Reggia-di-Caserta-Ricostruzione-in-realta-virtuale-1024x576.jpg",
    ],
    tags: ["Unity", "WebGL", "VR", "Oculus", "Cultural Heritage"],
    metadata: {
      role: { it: "Unity Developer", en: "Unity Developer" },
      year: "2023 - 2024",
      client: "Digimax",
      tech: "Unity, WebGL, Oculus SDK",
    },
  },
];
