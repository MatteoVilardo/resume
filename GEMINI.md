# 🚀 Project: Matteo Vilardo Portfolio (Aceternity Edition)

Genera un sito resume high-end basato su react.js, Tailwind CSS e Framer Motion.
Il design deve riflettere l'estetica di Aceternity UI: scuro, cinematico e interattivo.

## 1. Data Schema (Source-Grounded)
{
"profile": {
"name": "Matteo Vilardo", [cite: 3]
"title": "Game Developer / Backend Developer", [cite: 4]
"description": "Sviluppatore Unity con una grande passione per i videogiochi. Esperto nel risolvere problemi e lavorare in team.", [cite: 2]
"contacts": {
"email": "matteovilar@hotmail.it", [cite: 5]
"phone": "+39 3342230958", [cite: 6]
"linkedin": "https://www.linkedin.com/in/matteo-vilardo-8a1db0/"
}
},
"stack": {
"languages": ["C#", "Asp Net Core", "Javascript (React/Angular)"], [cite: 25, 41, 67]
"engines": ["Unity"], [cite: 24]
"technologies": ["WebGL", "VR/AR (Oculus, HTC, Mobile)", "PostgreSQL"], [cite: 34, 35, 48, 66, 67]
"specialties": ["Digital Twin", "DSS", "Serious Gaming"] [cite: 15, 22, 39]
},
"experience": [
{
"id": "movie-logic",
"company": "Movie Logic", [cite: 20, 61]
"role": "Freelance Unity e Backend Developer", [cite: 62]
"period": "2021 - Attuale", [cite: 65]
"tasks": [
"Sviluppo Edu Learning games (iOS/Android)", [cite: 66]
"Sviluppo Itinero: App mobile + Backend (Asp Net Core/PostgreSQL)",
"Sviluppo CMS in Angular"
]
},
{
"id": "digimax",
"company": "Digimax", [cite: 16, 42]
"role": "Freelance Unity Developer", [cite: 43]
"period": "2023 - 2025", [cite: 17]
"tasks": [
"Diorama WebGL e VR per la Reggia di Caserta", [cite: 48, 49]
"Sviluppo Mobile Game promozionale" [cite: 45]
]
},
{
"id": "keybiz",
"company": "KeyBiz Srl", [cite: 13, 36]
"role": "Mid / Senior Unity Developer", [cite: 37]
"period": "2019 - 2021", [cite: 14, 38]
"tasks": [
"Sviluppo Digital Twin e DSS per Trenitalia, Telecom e Difesa",
"Applicazioni su Touch Tables", [cite: 40]
"Web application in React" [cite: 41]
]
}
]
}

## 2. Visual & UI Logic
- [cite_start]**Hero Section**: Titolo con 'Text Generate Effect' e 'Background Beams'. [cite: 2, 4]
- [cite_start]**Bento Grid Skills**: Una griglia asimmetrica che evidenzia Unity e .NET. [cite: 24, 25]
- **Project Showcase**:
    - [cite_start]Card 1: 'Digital Twin Trenitalia' usando trenitalia_1.jpg (Mappa) e trenitalia_2.jpg (Stato vagoni). [cite: 15, 39]
    - [cite_start]Card 2: 'Real Estate PoC' usando luxury_1.jpg (Interni) e luxury_2.jpg (Dati appartamento). [cite: 19]
    - [cite_start]Card 3: 'Cultural Heritage' usando gallery_1.jpg (Museo Calcata). [cite: 48]

## 3. Deployment Docker Info
- Base Image: `node:20-alpine`.
- Port: `3000`.
- Environment: `react.js Production`.