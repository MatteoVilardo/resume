export const DATA = {
  profile: {
    name: "Matteo Vilardo",
    title: "Game Developer / Backend Developer",
    description: "Sviluppatore Unity con una grande passione per i videogiochi. Esperto nel risolvere problemi e lavorare in team.",
    image: "/images/fotoprofilo.jpeg",
    contacts: {
      email: "info.matteo.vilardo@gmail.com",
      phone: "+39 3342230958",
      linkedin: "https://www.linkedin.com/in/matteo-vilardo-8a1db0/",
      upwork: "https://www.upwork.com/freelancers/~01ef376046e8c89c8a",
      cv: "/cv-matteo-vilardo.pdf"
    }
  },
  stack: {
    languages: ["C#", "Asp Net Core", "Javascript (React/Angular)"],
    engines: ["Unity"],
    technologies: ["WebGL", "VR/AR (Oculus, HTC, Mobile)", "PostgreSQL"],
    specialties: ["Digital Twin", "DSS", "Serious Gaming"]
  },
  themes: {
    cyber: {
      name: "Cyber",
      primary: "#f0abfc", // Fuchsia 300
      secondary: "#3b82f6", // Blue 500
      accent: "#d946ef", // Fuchsia 500
      bg: "#020617",
      grid: "rgba(217, 70, 239, 0.3)"
    },
    ocean: {
      name: "Ocean",
      primary: "#60a5fa", // Blue 400
      secondary: "#2dd4bf", // Teal 400
      accent: "#3b82f6",
      bg: "#020617",
      grid: "rgba(59, 130, 246, 0.3)"
    },
    emerald: {
      name: "Emerald",
      primary: "#34d399", // Emerald 400
      secondary: "#10b981", // Emerald 500
      accent: "#059669",
      bg: "#020617",
      grid: "rgba(16, 185, 129, 0.3)"
    }
  },
  experience: [
    {
      id: "movie-logic",
      company: "Movie Logic",
      role: "Freelance Unity e Backend Developer",
      period: "2021 - Attuale",
      tasks: [
        "Sviluppo Edu Learning games (iOS/Android)",
        "Sviluppo Itinero: App mobile + Backend (Asp Net Core/PostgreSQL)",
        "Sviluppo CMS in Angular"
      ]
    },
    {
      id: "digimax",
      company: "Digimax",
      role: "Freelance Unity Developer",
      period: "2023 - 2025",
      tasks: [
        "Diorama WebGL e VR per la Reggia di Caserta",
        "Sviluppo Mobile Game promozionale"
      ]
    },
    {
      id: "keybiz",
      company: "KeyBiz Srl",
      role: "Mid / Senior Unity Developer",
      period: "2019 - 2021",
      tasks: [
        "Sviluppo Digital Twin e DSS per Trenitalia, Telecom e Difesa",
        "Applicazioni su Touch Tables",
        "Web application in React"
      ]
    }
  ],
  projects: [
    {
      id: "trenitalia",
      title: "Digital Twin Trenitalia",
      description: "Mappa interattiva e monitoraggio stato vagoni in tempo reale.",
      longDescription: "Un sistema avanzato di Digital Twin sviluppato per Trenitalia, che permette il monitoraggio in tempo reale della flotta. Il sistema integra dati provenienti da sensori IoT per visualizzare lo stato di salute dei vagoni, la posizione GPS e i flussi di passeggeri su una mappa 3D interattiva.",
      images: ["/images/trenitalia_1.png", "/images/trenitalia_2.png"],
      tags: ["Unity", "Digital Twin", "DSS", "IoT"],
      metadata: {
        role: "Lead Unity Developer",
        year: "2020",
        client: "Trenitalia",
        tech: "Unity, C#, SignalR, WebGL"
      }
    },
    {
      id: "real-estate",
      title: "Real Estate PoC",
      description: "Visualizzazione immersiva di interni e dati appartamento.",
      longDescription: "Proof of Concept per un'applicazione di Real Estate immersivo. Gli utenti possono navigare all'interno di appartamenti di lusso non ancora costruiti, cambiare materiali in tempo reale e visualizzare dati tecnici e planimetrie integrate nell'ambiente 3D.",
      images: ["/images/trenitalia_2.png", "/images/trenitalia_1.png"],
      tags: ["Unity", "VR", "Real Estate", "ArchViz"],
      metadata: {
        role: "Unity Developer",
        year: "2023",
        client: "Private Real Estate",
        tech: "Unity, HDRP, Oculus SDK"
      }
    },
    {
      id: "cultural-heritage",
      title: "Cultural Heritage",
      description: "Esperienza VR per il Museo Calcata.",
      longDescription: "Un viaggio virtuale attraverso la storia e l'arte del Museo di Calcata. L'applicazione permette di esplorare reperti archeologici digitalizzati in alta risoluzione e interagire con guide virtuali che raccontano la storia locale.",
      images: ["/images/trenitalia_1.png", "/images/trenitalia_2.png"],
      tags: ["WebGL", "VR", "Cultural Heritage", "Photogrammetry"],
      metadata: {
        role: "Unity Developer",
        year: "2024",
        client: "Digimax / Museo Calcata",
        tech: "Unity, WebGL, Three.js integration"
      }
    }
  ]
};
