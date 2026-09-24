Parfait, on passe sur du sérieux. Voici une **application React + TypeScript + TailwindCSS** structurée comme un vrai projet pro, avec une banque de questions externe en JSON, un moteur de quiz typé, et une UI soignée pour la page questionnaire.

## 📁 Structure du projet

```
cyberquiz/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types.ts
    ├── data/
    │   └── questions.json
    ├── lib/
    │   ├── utils.ts
    │   └── storage.ts
    ├── hooks/
    │   ├── useQuiz.ts
    │   └── useCountdown.ts
    └── components/
        ├── ui/
        │   ├── Button.tsx
        │   ├── Card.tsx
        │   ├── Badge.tsx
        │   ├── ProgressBar.tsx
        │   └── ScoreRing.tsx
        ├── Header.tsx
        ├── HomeScreen.tsx
        ├── QuizScreen.tsx
        ├── QuestionCard.tsx
        ├── ChoiceButton.tsx
        ├── QuestionPalette.tsx
        ├── ExplanationBox.tsx
        ├── ResultsScreen.tsx
        └── HistoryScreen.tsx
```

---

## ⚙️ Configuration

### `package.json`

```json
{
  "name": "cyberquiz",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  }
}
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": "/src" } },
});
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#0f172a",
          soft: "#111c34",
          elevated: "#16233d",
          border: "#22304d",
        },
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(56,189,248,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: { "50%": { opacity: ".5" } },
      },
      animation: {
        "fade-in": "fade-in .25s ease-out",
        "slide-up": "slide-up .35s cubic-bezier(.2,.7,.3,1)",
        "pulse-fast": "pulse 1s cubic-bezier(.4,0,.6,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### `postcss.config.js`

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

### `index.html`

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CyberQuiz — Préparation CSCU & CST</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    color-scheme: dark;
  }
  body {
    @apply bg-slate-950 text-slate-100 antialiased;
    background-image:
      radial-gradient(
        1200px 600px at 50% -10%,
        rgba(56, 189, 248, 0.1),
        transparent 60%
      ),
      radial-gradient(
        900px 500px at 100% 0%,
        rgba(99, 102, 241, 0.1),
        transparent 55%
      );
    background-attachment: fixed;
  }
  ::selection {
    @apply bg-sky-400/30;
  }
}

@layer utilities {
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-slate-700 rounded-full;
  }
}
```

---

## 🧩 Types

### `src/types.ts`

```ts
export type Difficulty = "intermediate" | "advanced";

export interface Question {
  id: string;
  domain: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  /** Index de la bonne réponse dans `options` (avant mélange) */
  answer: number;
  explanation: string;
  reference?: string;
}

/** Question telle qu'utilisée dans une session (options mélangées) */
export interface SessionQuestion {
  source: Question;
  options: string[];
  /** Index de la bonne réponse dans `options` mélangées */
  correctIndex: number;
}

export type QuizMode = "exam" | "training";

export interface QuizConfig {
  mode: QuizMode;
  count: number;
  /** 0 = automatique (1min15 / question) */
  durationMinutes: number;
  /** Vide = tous les domaines */
  domains: string[];
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: SessionQuestion[];
  answers: (number | null)[];
  flags: boolean[];
  /** En mode training : question déjà validée */
  revealed: boolean[];
  currentIndex: number;
  startedAt: number;
  /** 0 si pas de chrono */
  endsAt: number;
  finishedAt: number | null;
  autoSubmitted: boolean;
}

export interface DomainScore {
  domain: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  timeSeconds: number;
  byDomain: DomainScore[];
}

export interface HistoryEntry {
  id: string;
  date: number;
  mode: QuizMode;
  score: number;
  total: number;
  timeSeconds: number;
  domains: string[];
}
```

---

## 📚 Banque de questions JSON

### `src/data/questions.json`

Voici un échantillon représentatif (**remplacez / complétez** — la structure est normalisée, chaque question a un `id`, un `difficulty`, et une `reference` quand pertinent) :

```json
[
  {
    "id": "auth-001",
    "domain": "Authentification & mots de passe",
    "difficulty": "intermediate",
    "question": "Quelles sont les trois catégories de facteurs d'authentification reconnues ?",
    "options": [
      "Login, mot de passe et PIN",
      "Ce que l'on sait, ce que l'on possède, ce que l'on est",
      "Chiffrement symétrique, asymétrique et hybride",
      "Lecture, écriture et exécution"
    ],
    "answer": 1,
    "explanation": "Le MFA combine au moins deux catégories différentes : connaissance (mot de passe, PIN), possession (token, smartphone, carte à puce) et inhérence (empreinte, visage, iris). Deux mots de passe ne constituent donc jamais un MFA.",
    "reference": "NIST SP 800-63B"
  },
  {
    "id": "auth-002",
    "domain": "Authentification & mots de passe",
    "difficulty": "intermediate",
    "question": "Quel standard d'authentification est considéré comme le plus résistant au phishing ?",
    "options": [
      "SMS avec code à 6 chiffres",
      "Application TOTP (Google Authenticator)",
      "FIDO2 / WebAuthn avec clé de sécurité",
      "Questions secrètes de récupération"
    ],
    "answer": 2,
    "explanation": "FIDO2/WebAuthn repose sur un défi cryptographique lié au domaine du site : un site de phishing sur un domaine différent ne peut pas obtenir de signature valide.",
    "reference": "W3C WebAuthn Level 2"
  },
  {
    "id": "auth-003",
    "domain": "Authentification & mots de passe",
    "difficulty": "intermediate",
    "question": "Le « credential stuffing » consiste à…",
    "options": [
      "Deviner un mot de passe par force brute sur un seul compte",
      "Réutiliser des couples identifiant/mot de passe fuités sur de nombreux services",
      "Saturer un serveur d'authentification pour le rendre indisponible",
      "Intercepter le hash du mot de passe sur le réseau"
    ],
    "answer": 1,
    "explanation": "L'attaquant rejoue massivement des identifiants issus de fuites de données sur d'autres sites. La défense principale est de ne jamais réutiliser un mot de passe."
  },
  {
    "id": "auth-004",
    "domain": "Authentification & mots de passe",
    "difficulty": "intermediate",
    "question": "Comment un serveur doit-il stocker les mots de passe de ses utilisateurs ?",
    "options": [
      "En clair, mais dans une base chiffrée",
      "Avec un chiffrement réversible AES-256",
      "Avec une fonction de hachage rapide type MD5",
      "Avec une fonction de dérivation lente et salée (bcrypt, scrypt, Argon2)"
    ],
    "answer": 3,
    "explanation": "Le hachage doit être irréversible, salé (sel unique par utilisateur) et lent (Argon2id, bcrypt, scrypt). MD5 et SHA-1 sont trop rapides et cassés."
  },
  {
    "id": "auth-005",
    "domain": "Authentification & mots de passe",
    "difficulty": "intermediate",
    "question": "Une attaque par « pulvérisation » (password spraying) se caractérise par…",
    "options": [
      "Tester un mot de passe très courant sur un grand nombre de comptes",
      "Tester des milliers de mots de passe sur un seul compte",
      "Envoyer des SMS frauduleux pour récupérer un code OTP",
      "Voler la base de hachages pour la casser hors ligne"
    ],
    "answer": 0,
    "explanation": "Le spraying teste peu de mots de passe très probables sur beaucoup de comptes afin d'éviter le verrouillage de compte."
  },
  {
    "id": "mal-001",
    "domain": "Malwares & menaces",
    "difficulty": "intermediate",
    "question": "Face à un rançongiciel, quelle mesure réduit le plus efficacement l'impact ?",
    "options": [
      "Un antivirus à jour avec signatures récentes",
      "Des sauvegardes régulières, déconnectées et testées par restauration",
      "Le chiffrement intégral du disque",
      "La désactivation du partage de fichiers Windows"
    ],
    "answer": 1,
    "explanation": "La règle 3-2-1 et surtout le caractère hors ligne / immuable des sauvegardes est déterminant. Une sauvegarde non testée n'est pas une sauvegarde.",
    "reference": "ANSSI — Guide de lutte contre les rançongiciels"
  },
  {
    "id": "mal-002",
    "domain": "Malwares & menaces",
    "difficulty": "intermediate",
    "question": "Quelle affirmation distingue correctement un ver d'un cheval de Troie ?",
    "options": [
      "Le ver se propage seul sur le réseau ; le cheval de Troie se fait passer pour un logiciel légitime",
      "Le ver chiffre les fichiers ; le cheval de Troie les exfiltre",
      "Le ver cible les mobiles ; le cheval de Troie cible les serveurs",
      "Le ver est toujours inoffensif ; le cheval de Troie est toujours destructeur"
    ],
    "answer": 0,
    "explanation": "Le ver (worm) possède un mécanisme d'auto-propagation. Le cheval de Troie est un programme malveillant déguisé en logiciel utile, qui nécessite une action de la victime."
  },
  {
    "id": "mal-003",
    "domain": "Malwares & menaces",
    "difficulty": "advanced",
    "question": "Quel est l'apport principal d'un EDR par rapport à un antivirus à signatures ?",
    "options": [
      "Il bloque les pièces jointes dangereuses dans la messagerie",
      "Il analyse les comportements et permet la détection, l'investigation et la réponse",
      "Il chiffre automatiquement le disque dur",
      "Il remplace le pare-feu périmétrique"
    ],
    "answer": 1,
    "explanation": "L'EDR surveille en continu les processus, commandes et connexions, détecte des comportements anormaux et permet d'isoler la machine et de reconstituer la chronologie de l'incident."
  },
  {
    "id": "mal-004",
    "domain": "Malwares & menaces",
    "difficulty": "advanced",
    "question": "Qu'appelle-t-on une vulnérabilité « zero-day » ?",
    "options": [
      "Une faille corrigée depuis moins de 24 heures",
      "Une faille inconnue de l'éditeur et sans correctif disponible au moment de l'exploitation",
      "Une faille présente uniquement le premier jour d'installation",
      "Une faille qui ne peut être exploitée qu'à distance"
    ],
    "answer": 1,
    "explanation": "Aucun correctif n'existe encore : la détection comportementale, la limitation de surface d'attaque et la segmentation réseau deviennent critiques."
  },
  {
    "id": "soc-001",
    "domain": "Ingénierie sociale",
    "difficulty": "intermediate",
    "question": "Le « spear phishing » se distingue du phishing classique parce qu'il…",
    "options": [
      "Utilise uniquement le téléphone",
      "Est ciblé et personnalisé grâce à des informations sur la victime",
      "Nécessite un accès physique aux locaux",
      "Vise exclusivement les dirigeants"
    ],
    "answer": 1,
    "explanation": "Le spear phishing cible une personne ou un petit groupe avec un message sur mesure, ce qui le rend bien plus crédible qu'un message générique massif."
  },
  {
    "id": "soc-002",
    "domain": "Ingénierie sociale",
    "difficulty": "intermediate",
    "question": "Un e-mail du « directeur général » demande un virement urgent et confidentiel. Quelle est la bonne réaction ?",
    "options": [
      "Exécuter la demande rapidement car elle vient de la direction",
      "Répondre à l'e-mail pour demander confirmation écrite",
      "Vérifier par un appel téléphonique au numéro officiel connu de l'entreprise",
      "Transférer la demande au service informatique"
    ],
    "answer": 2,
    "explanation": "C'est une fraude au président (BEC). Répondre à l'e-mail ne sert à rien : l'attaquant contrôle la boîte ou usurpe le domaine. Seule une vérification par un canal indépendant est fiable."
  },
  {
    "id": "soc-003",
    "domain": "Ingénierie sociale",
    "difficulty": "intermediate",
    "question": "Une clé USB inconnue trouvée sur le parking relève de quelle technique ?",
    "options": ["Tailgating", "Baiting", "Whaling", "Smishing"],
    "answer": 1,
    "explanation": "Le baiting exploite la curiosité : la clé USB « appât » contient souvent un script qui s'exécute à l'ouverture."
  },
  {
    "id": "mail-001",
    "domain": "Sécurité des e-mails",
    "difficulty": "intermediate",
    "question": "Quel est le rôle de DMARC ?",
    "options": [
      "Remplacer SPF et DKIM",
      "Définir la politique (none/quarantine/reject) et le reporting lorsque SPF/DKIM échouent",
      "Chiffrer les e-mails de bout en bout",
      "Authentifier l'utilisateur final auprès du serveur SMTP"
    ],
    "answer": 1,
    "explanation": "DMARC s'appuie sur SPF et/ou DKIM, exige un alignement avec le domaine du « From », et publie une politique ainsi qu'une adresse de reporting (rua/ruf).",
    "reference": "RFC 7489"
  },
  {
    "id": "mail-002",
    "domain": "Sécurité des e-mails",
    "difficulty": "intermediate",
    "question": "DKIM apporte principalement…",
    "options": [
      "Une signature cryptographique du message, vérifiable par le destinataire",
      "Une liste blanche d'adresses IP émettrices",
      "Le chiffrement du message en transit",
      "Le blocage automatique des pièces jointes exécutables"
    ],
    "answer": 0,
    "explanation": "DKIM signe les en-têtes et le corps avec une clé privée ; la clé publique est publiée en DNS. Cela garantit l'intégrité du message.",
    "reference": "RFC 6376"
  },
  {
    "id": "web-001",
    "domain": "Navigation & Internet",
    "difficulty": "intermediate",
    "question": "Que garantit réellement HTTPS (TLS) ?",
    "options": [
      "Que le site est légitime et digne de confiance",
      "Que la connexion est chiffrée et que le serveur possède un certificat valide pour ce domaine",
      "Que le site ne collecte aucune donnée personnelle",
      "Que le contenu téléchargé est exempt de malware"
    ],
    "answer": 1,
    "explanation": "HTTPS assure confidentialité et intégrité en transit, et authentifie le domaine via le certificat. Il ne dit rien de l'honnêteté du site."
  },
  {
    "id": "web-002",
    "domain": "Navigation & Internet",
    "difficulty": "intermediate",
    "question": "Que fait réellement la navigation privée ?",
    "options": [
      "Elle chiffre le trafic et masque l'adresse IP",
      "Elle empêche l'enregistrement local de l'historique et des cookies, sans anonymiser le trafic",
      "Elle bloque les publicités et les traqueurs",
      "Elle protège contre les malwares"
    ],
    "answer": 1,
    "explanation": "La navigation privée efface les traces locales en fin de session. Le FAI, l'employeur et les sites visités voient toujours l'activité."
  },
  {
    "id": "net-001",
    "domain": "Réseaux & Wi-Fi",
    "difficulty": "advanced",
    "question": "Quel est l'apport principal de WPA3 par rapport à WPA2 ?",
    "options": [
      "Il supprime le besoin de mot de passe",
      "Il protège contre les attaques par dictionnaire hors ligne grâce à SAE, et chiffre les réseaux ouverts",
      "Il augmente le débit maximal du Wi-Fi",
      "Il rend le SSID invisible"
    ],
    "answer": 1,
    "explanation": "SAE (Simultaneous Authentication of Equals) remplace la poignée de main PSK vulnérable aux attaques hors ligne. WPA3 ajoute aussi OWE sur les réseaux publics.",
    "reference": "IEEE 802.11-2020"
  },
  {
    "id": "net-002",
    "domain": "Réseaux & Wi-Fi",
    "difficulty": "advanced",
    "question": "Pourquoi segmenter un réseau (VLAN, DMZ) ?",
    "options": [
      "Pour accélérer les transferts de fichiers",
      "Pour limiter la propagation latérale d'une compromission entre zones de sensibilité différente",
      "Pour réduire le coût des licences logicielles",
      "Pour se conformer uniquement aux obligations légales"
    ],
    "answer": 1,
    "explanation": "La segmentation cloisonne les flux : un poste compromis en zone bureautique ne doit pas pouvoir atteindre directement les serveurs sensibles.",
    "reference": "ANSSI — Recommandations de segmentation"
  },
  {
    "id": "net-003",
    "domain": "Réseaux & Wi-Fi",
    "difficulty": "intermediate",
    "question": "Quel est le rôle d'un pare-feu à états (stateful) ?",
    "options": [
      "Analyser le contenu des pièces jointes",
      "Autoriser ou bloquer le trafic selon des règles et suivre l'état des connexions établies",
      "Chiffrer les communications internes",
      "Authentifier les utilisateurs du domaine"
    ],
    "answer": 1,
    "explanation": "Le pare-feu filtre selon des règles et maintient une table d'états permettant de laisser revenir le trafic des connexions légitimes."
  },
  {
    "id": "dat-001",
    "domain": "Données & chiffrement",
    "difficulty": "intermediate",
    "question": "Quelle est la différence fondamentale entre chiffrement symétrique et asymétrique ?",
    "options": [
      "Le symétrique utilise une clé unique partagée, l'asymétrique une paire clé publique/clé privée",
      "Le symétrique est réservé aux fichiers, l'asymétrique aux mots de passe",
      "Le symétrique est plus lent que l'asymétrique",
      "L'asymétrique ne sert qu'à signer, jamais à chiffrer"
    ],
    "answer": 0,
    "explanation": "Le symétrique (AES) est rapide mais impose de partager la clé. L'asymétrique (RSA, ECC) résout la distribution de clés mais est coûteux."
  },
  {
    "id": "dat-002",
    "domain": "Données & chiffrement",
    "difficulty": "intermediate",
    "question": "Que recommande la règle de sauvegarde 3-2-1 ?",
    "options": [
      "3 sauvegardes, 2 supports différents, 1 copie hors site",
      "3 copies en ligne, 2 chiffrées, 1 quotidienne",
      "3 serveurs, 2 datacenters, 1 administrateur",
      "3 mois d'historique, 2 ans d'archivage, 1 restauration par an"
    ],
    "answer": 0,
    "explanation": "Trois copies des données, sur au moins deux types de supports distincts, dont une externalisée. On y ajoute souvent un « 1 » pour une copie immuable ou hors ligne.",
    "reference": "CISA — Data Backup Options"
  },
  {
    "id": "cld-001",
    "domain": "Mobile & Cloud",
    "difficulty": "advanced",
    "question": "Dans le modèle de responsabilité partagée du cloud, le client reste responsable de…",
    "options": [
      "La sécurité physique des datacenters",
      "La sécurité de ses données, de ses accès et de ses configurations",
      "La maintenance du matériel de virtualisation",
      "La disponibilité des liens réseau opérateur"
    ],
    "answer": 1,
    "explanation": "Le fournisseur sécurise le cloud (infrastructure), le client sécurise ce qu'il met dans le cloud (données, identités, configurations).",
    "reference": "AWS / Azure / GCP Shared Responsibility Model"
  },
  {
    "id": "inc-001",
    "domain": "Incidents & conformité",
    "difficulty": "intermediate",
    "question": "Votre poste est infecté par un rançongiciel. Quelle est la première action ?",
    "options": [
      "Éteindre brutalement la machine en débranchant la prise",
      "Isoler la machine du réseau et alerter immédiatement le service sécurité",
      "Lancer une analyse antivirus complète",
      "Restaurer immédiatement depuis la dernière sauvegarde"
    ],
    "answer": 1,
    "explanation": "On isole pour limiter la propagation, puis on alerte. On ne restaure pas avant d'avoir compris le vecteur d'entrée.",
    "reference": "NIST SP 800-61"
  },
  {
    "id": "inc-002",
    "domain": "Incidents & conformité",
    "difficulty": "intermediate",
    "question": "Selon le RGPD, qu'est-ce qu'une donnée personnelle ?",
    "options": [
      "Uniquement le nom et le prénom d'une personne",
      "Toute information permettant d'identifier directement ou indirectement une personne physique",
      "Uniquement les données bancaires",
      "Toute donnée stockée dans l'Union européenne"
    ],
    "answer": 1,
    "explanation": "La définition est large : nom, e-mail, adresse IP, identifiant de connexion, données de localisation, identifiant de cookie…",
    "reference": "RGPD — Article 4"
  }
]
```

---

## 🔧 Utilitaires & hooks

### `src/lib/utils.ts`

```ts
import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function shuffle<T>(arr: readonly T[]): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function percent(score: number, total: number): number {
  return total === 0 ? 0 : Math.round((score / total) * 100);
}

export function scoreColor(p: number): string {
  if (p >= 80) return "text-emerald-400";
  if (p >= 60) return "text-amber-400";
  return "text-rose-400";
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
```

### `src/lib/storage.ts`

```ts
import type { HistoryEntry } from "@/types";

const KEY = "cyberquiz:history:v1";

export const loadHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as HistoryEntry[];
  } catch {
    return [];
  }
};

export const saveHistory = (entries: HistoryEntry[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 60)));
  } catch {
    /* quota */
  }
};

export const clearHistory = (): void => localStorage.removeItem(KEY);
```

### `src/hooks/useCountdown.ts`

```ts
import { useEffect, useRef, useState } from "react";

export function useCountdown(endsAt: number | null, onExpire: () => void) {
  const cbRef = useRef(onExpire);
  cbRef.current = onExpire;

  const [remaining, setRemaining] = useState(() =>
    endsAt ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)) : 0,
  );

  useEffect(() => {
    if (!endsAt) {
      setRemaining(0);
      return;
    }

    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) cbRef.current();
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [endsAt]);

  return remaining;
}
```

### `src/hooks/useQuiz.ts`

```ts
import { useCallback, useMemo, useState } from "react";
import type { QuizConfig, QuizSession, SessionQuestion } from "@/types";
import rawQuestions from "@/data/questions.json";
import { shuffle, uid, percent } from "@/lib/utils";

const QUESTIONS = rawQuestions as unknown as import("@/types").Question[];

export const ALL_QUESTIONS = QUESTIONS;
export const ALL_DOMAINS = Array.from(
  new Set(QUESTIONS.map((q) => q.domain)),
).sort();

function buildSession(config: QuizConfig): QuizSession {
  const pool = config.domains.length
    ? QUESTIONS.filter((q) => config.domains.includes(q.domain))
    : QUESTIONS;

  const picked = shuffle(pool).slice(0, Math.min(config.count, pool.length));

  const questions: SessionQuestion[] = picked.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return {
      source: q,
      options: order.map((i) => q.options[i]),
      correctIndex: order.indexOf(q.answer),
    };
  });

  const minutes =
    config.mode === "exam"
      ? config.durationMinutes > 0
        ? config.durationMinutes
        : Math.ceil(questions.length * 1.25)
      : 0;

  return {
    id: uid(),
    config,
    questions,
    answers: Array(questions.length).fill(null),
    flags: Array(questions.length).fill(false),
    revealed: Array(questions.length).fill(false),
    currentIndex: 0,
    startedAt: Date.now(),
    endsAt: minutes > 0 ? Date.now() + minutes * 60_000 : 0,
    finishedAt: null,
    autoSubmitted: false,
  };
}

export function useQuiz() {
  const [session, setSession] = useState<QuizSession | null>(null);

  const start = useCallback((config: QuizConfig) => {
    setSession(buildSession(config));
  }, []);

  const stop = useCallback(() => setSession(null), []);

  const answer = useCallback((idx: number) => {
    setSession((s) => {
      if (!s) return s;
      const isTraining = s.config.mode === "training";
      if (isTraining && s.revealed[s.currentIndex]) return s;
      const answers = [...s.answers];
      answers[s.currentIndex] = idx;
      const revealed = [...s.revealed];
      if (isTraining) revealed[s.currentIndex] = true;
      return { ...s, answers, revealed };
    });
  }, []);

  const goTo = useCallback((idx: number) => {
    setSession((s) => {
      if (!s) return s;
      const clamped = Math.max(0, Math.min(idx, s.questions.length - 1));
      return { ...s, currentIndex: clamped };
    });
  }, []);

  const next = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      return {
        ...s,
        currentIndex: Math.min(s.currentIndex + 1, s.questions.length - 1),
      };
    });
  }, []);

  const prev = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      return { ...s, currentIndex: Math.max(s.currentIndex - 1, 0) };
    });
  }, []);

  const toggleFlag = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      const flags = [...s.flags];
      flags[s.currentIndex] = !flags[s.currentIndex];
      return { ...s, flags };
    });
  }, []);

  const finish = useCallback((auto = false) => {
    setSession((s) =>
      s ? { ...s, finishedAt: Date.now(), autoSubmitted: auto } : s,
    );
  }, []);

  const result = useMemo(() => {
    if (!session || session.finishedAt === null) return null;
    let score = 0;
    const byDomain = new Map<string, { correct: number; total: number }>();

    session.questions.forEach((q, i) => {
      const ok = session.answers[i] === q.correctIndex;
      if (ok) score++;
      const d = q.source.domain;
      const cur = byDomain.get(d) ?? { correct: 0, total: 0 };
      cur.total++;
      if (ok) cur.correct++;
      byDomain.set(d, cur);
    });

    return {
      score,
      total: session.questions.length,
      percentage: percent(score, session.questions.length),
      timeSeconds: Math.round(
        ((session.finishedAt ?? Date.now()) - session.startedAt) / 1000,
      ),
      byDomain: Array.from(byDomain.entries()).map(([domain, v]) => ({
        domain,
        correct: v.correct,
        total: v.total,
        percentage: percent(v.correct, v.total),
      })),
    };
  }, [session]);

  return {
    session,
    result,
    start,
    stop,
    answer,
    goTo,
    next,
    prev,
    toggleFlag,
    finish,
  };
}
```

---

## 🎨 Composants UI

### `src/components/ui/Button.tsx`

```tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-400/40 hover:brightness-110",
  secondary:
    "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700",
  danger: "bg-rose-500/90 text-white hover:bg-rose-500",
  success: "bg-emerald-500/90 text-white hover:bg-emerald-500",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:transform-none",
        "active:scale-[.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
```

### `src/components/ui/Card.tsx`

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm",
        "shadow-card",
        className,
      )}
      {...props}
    />
  );
}
```

### `src/components/ui/Badge.tsx`

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  tone?: "default" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

const tones = {
  default: "bg-slate-800 text-slate-300 border-slate-700",
  accent: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  danger: "bg-rose-500/10 text-rose-300 border-rose-500/30",
};

export function Badge({ children, tone = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

### `src/components/ui/ProgressBar.tsx`

```tsx
import { cn } from "@/lib/utils";

interface Props {
  value: number; // 0..100
  className?: string;
  tone?: "accent" | "success" | "warning" | "danger";
}

const tones = {
  accent: "from-sky-400 to-indigo-500",
  success: "from-emerald-400 to-teal-500",
  warning: "from-amber-400 to-orange-500",
  danger: "from-rose-500 to-pink-500",
};

export function ProgressBar({ value, className, tone = "accent" }: Props) {
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-slate-800",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-[width] duration-300 ease-out",
          tones[tone],
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
```

### `src/components/ui/ScoreRing.tsx`

```tsx
import { useEffect, useState } from "react";
import { cn, scoreColor } from "@/lib/utils";

interface Props {
  percentage: number;
  score: number;
  total: number;
}

export function ScoreRing({ percentage, score, total }: Props) {
  const [animated, setAnimated] = useState(0);
  const radius = 66;
  const circ = 2 * Math.PI * radius;

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(percentage));
    return () => cancelAnimationFrame(id);
  }, [percentage]);

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 160 160" className="-rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgb(30,41,59)"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (circ * animated) / 100}
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(.2,.7,.3,1)",
          }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div
            className={cn(
              "text-4xl font-bold tabular-nums",
              scoreColor(percentage),
            )}
          >
            {percentage}%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {score} / {total}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🏗️ Composants de quiz (le cœur du design)

### `src/components/Header.tsx`

```tsx
import type { ReactNode } from "react";

interface Props {
  right?: ReactNode;
}

export function Header({ right }: Props) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-[0_0_16px_rgba(56,189,248,0.6)]" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide">CyberQuiz</div>
          <div className="text-[11px] text-slate-500">
            Préparation CSCU &amp; CST
          </div>
        </div>
      </div>
      <div>{right}</div>
    </header>
  );
}
```

### `src/components/ChoiceButton.tsx`

```tsx
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface Props {
  index: number;
  label: string;
  selected: boolean;
  disabled: boolean;
  /** état en mode entraînement après révélation */
  state?: "idle" | "correct" | "wrong" | "revealed-correct";
  onClick: () => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function ChoiceButton({
  index,
  label,
  selected,
  disabled,
  state = "idle",
  onClick,
}: Props) {
  const isCorrect = state === "correct" || state === "revealed-correct";
  const isWrong = state === "wrong";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        !disabled &&
          "hover:border-sky-500/60 hover:bg-slate-800/60 active:scale-[.995]",
        selected &&
          !isCorrect &&
          !isWrong &&
          "border-sky-500 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,.4)]",
        isCorrect && "border-emerald-500/70 bg-emerald-500/10",
        isWrong && "border-rose-500/70 bg-rose-500/10",
        !selected &&
          !isCorrect &&
          !isWrong &&
          "border-slate-800 bg-slate-900/40",
        disabled && "cursor-default",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border text-[11px] font-bold transition-colors",
          selected &&
            !isCorrect &&
            !isWrong &&
            "border-sky-400 bg-sky-400 text-slate-950",
          isCorrect && "border-emerald-400 bg-emerald-400 text-slate-950",
          isWrong && "border-rose-400 bg-rose-400 text-slate-950",
          !selected &&
            !isCorrect &&
            !isWrong &&
            "border-slate-700 bg-slate-800 text-slate-400 group-hover:border-sky-500/60 group-hover:text-sky-300",
        )}
      >
        {isCorrect ? (
          <Check size={14} strokeWidth={3} />
        ) : isWrong ? (
          <X size={14} strokeWidth={3} />
        ) : (
          LETTERS[index]
        )}
      </span>
      <span className="flex-1 leading-relaxed text-slate-200">{label}</span>
    </button>
  );
}
```

### `src/components/ExplanationBox.tsx`

```tsx
import { Lightbulb } from "lucide-react";

interface Props {
  explanation: string;
  reference?: string;
}

export function ExplanationBox({ explanation, reference }: Props) {
  return (
    <div className="animate-slide-up mt-5 overflow-hidden rounded-xl border border-sky-500/20 bg-sky-500/[0.04]">
      <div className="flex items-start gap-3 p-4">
        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-sky-500/15 text-sky-400">
          <Lightbulb size={15} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
            Explication
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {explanation}
          </p>
          {reference && (
            <p className="text-[11px] italic text-slate-500">
              Source : {reference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### `src/components/QuestionCard.tsx`

```tsx
import { Badge } from "@/components/ui/Badge";
import { ChoiceButton } from "@/components/ChoiceButton";
import { ExplanationBox } from "@/components/ExplanationBox";
import type { QuizMode, SessionQuestion } from "@/types";

interface Props {
  question: SessionQuestion;
  index: number;
  total: number;
  mode: QuizMode;
  selected: number | null;
  revealed: boolean;
  onSelect: (idx: number) => void;
}

export function QuestionCard({
  question,
  index,
  total,
  mode,
  selected,
  revealed,
  onSelect,
}: Props) {
  const isTraining = mode === "training";
  const showSolution = isTraining && revealed;

  const stateFor = (
    i: number,
  ): "idle" | "correct" | "wrong" | "revealed-correct" => {
    if (!showSolution) return "idle";
    if (i === question.correctIndex)
      return selected === i ? "correct" : "revealed-correct";
    if (i === selected) return "wrong";
    return "idle";
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge tone="accent">{question.source.domain}</Badge>
        <span className="font-mono text-xs text-slate-500">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <h2 className="mb-6 text-lg font-semibold leading-snug tracking-tight text-slate-100 sm:text-xl">
        {question.source.question}
      </h2>

      <div className="space-y-2.5">
        {question.options.map((opt, i) => (
          <ChoiceButton
            key={i}
            index={i}
            label={opt}
            selected={selected === i}
            disabled={showSolution}
            state={stateFor(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {showSolution && (
        <ExplanationBox
          explanation={question.source.explanation}
          reference={question.source.reference}
        />
      )}
    </div>
  );
}
```

### `src/components/QuestionPalette.tsx`

```tsx
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";

interface Props {
  total: number;
  current: number;
  answers: (number | null)[];
  flags: boolean[];
  onJump: (i: number) => void;
}

export function QuestionPalette({
  total,
  current,
  answers,
  flags,
  onJump,
}: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const answered = answers[i] !== null;
        const flagged = flags[i];
        const isCurrent = i === current;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={cn(
              "relative grid h-8 w-8 place-items-center rounded-lg border text-[11px] font-semibold transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
              isCurrent
                ? "border-sky-400 bg-sky-400 text-slate-950"
                : answered
                  ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
                  : "border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700 hover:text-slate-300",
            )}
            title={`Question ${i + 1}${flagged ? " (marquée)" : ""}`}
          >
            {i + 1}
            {flagged && (
              <Flag
                size={9}
                className="absolute -right-0.5 -top-0.5 text-amber-400"
                fill="currentColor"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
```

---

## 📺 Écrans

### `src/components/HomeScreen.tsx`

```tsx
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ALL_DOMAINS, ALL_QUESTIONS } from "@/hooks/useQuiz";
import type { QuizConfig, QuizMode } from "@/types";
import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, Check } from "lucide-react";

interface Props {
  onStart: (cfg: QuizConfig) => void;
  onShowHistory: () => void;
  lastScore?: { score: number; total: number; date: number } | null;
}

export function HomeScreen({ onStart, onShowHistory, lastScore }: Props) {
  const [mode, setMode] = useState<QuizMode>("exam");
  const [count, setCount] = useState(20);
  const [duration, setDuration] = useState(0);
  const [domains, setDomains] = useState<string[]>([]);

  const totalAvailable = useMemo(
    () =>
      domains.length
        ? ALL_QUESTIONS.filter((q) => domains.includes(q.domain)).length
        : ALL_QUESTIONS.length,
    [domains],
  );

  const toggleDomain = (d: string) =>
    setDomains((cur) =>
      cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d],
    );

  const handleStart = () =>
    onStart({
      mode,
      count: Math.min(count, totalAvailable),
      durationMinutes: duration,
      domains,
    });

  return (
    <div className="space-y-5">
      <Card className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Prêt pour l'examen ?
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {ALL_QUESTIONS.length} questions · {ALL_DOMAINS.length} domaines ·
          modes entraînement et examen chronométré
        </p>

        {lastScore && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Dernière session
              </div>
              <div className="mt-0.5 text-sm">
                <span className="font-semibold text-slate-100">
                  {lastScore.score}/{lastScore.total}
                </span>{" "}
                <span className="text-slate-500">
                  · {new Date(lastScore.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onShowHistory}>
              Historique
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <SectionTitle>Mode</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            active={mode === "exam"}
            icon={<GraduationCap size={18} />}
            title="Examen blanc"
            desc="Chronométré, correction à la fin"
            onClick={() => setMode("exam")}
          />
          <ModeCard
            active={mode === "training"}
            icon={<BookOpen size={18} />}
            title="Entraînement"
            desc="Correction immédiate + explication"
            onClick={() => setMode("training")}
          />
        </div>

        <SectionTitle className="mt-6">Nombre de questions</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 40, 60].map((n) => (
            <Pill
              key={n}
              active={count === n}
              onClick={() => setCount(n)}
              disabled={n > totalAvailable}
            >
              {n}
            </Pill>
          ))}
          <Pill active={count === 999} onClick={() => setCount(999)}>
            Tout ({totalAvailable})
          </Pill>
        </div>

        {mode === "exam" && (
          <>
            <SectionTitle className="mt-6">Durée</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {[
                { v: 0, l: "Auto" },
                { v: 10, l: "10 min" },
                { v: 15, l: "15 min" },
                { v: 20, l: "20 min" },
                { v: 30, l: "30 min" },
                { v: 45, l: "45 min" },
                { v: 60, l: "60 min" },
              ].map((o) => (
                <Pill
                  key={o.v}
                  active={duration === o.v}
                  onClick={() => setDuration(o.v)}
                >
                  {o.l}
                </Pill>
              ))}
            </div>
          </>
        )}

        <SectionTitle className="mt-6">
          Domaines
          <span className="ml-2 text-xs font-normal text-slate-500">
            {domains.length === 0
              ? "(tous)"
              : `(${domains.length} sélectionné${domains.length > 1 ? "s" : ""})`}
          </span>
        </SectionTitle>
        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDomains([...ALL_DOMAINS])}
          >
            Tout
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDomains([])}>
            Aucun
          </Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {ALL_DOMAINS.map((d) => {
            const active = domains.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDomain(d)}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                  active
                    ? "border-sky-500/50 bg-sky-500/10 text-sky-100"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50",
                )}
              >
                <span className="flex-1 truncate">{d}</span>
                <span
                  className={cn(
                    "grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border transition-colors",
                    active
                      ? "border-sky-400 bg-sky-400 text-slate-950"
                      : "border-slate-700",
                  )}
                >
                  {active && <Check size={12} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>

        <Button size="lg" className="mt-7 w-full" onClick={handleStart}>
          Démarrer la session ·{" "}
          {Math.min(count === 999 ? totalAvailable : count, totalAvailable)}{" "}
          questions
        </Button>
      </Card>
    </div>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function ModeCard({
  active,
  icon,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-sky-500/60 bg-sky-500/[0.08] shadow-[0_0_0_1px_rgba(56,189,248,.3)]"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700",
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg",
          active ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-400",
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {active && <Badge tone="accent">Actif</Badge>}
        </div>
        <div className="mt-0.5 text-xs text-slate-500">{desc}</div>
      </div>
    </button>
  );
}

function Pill({
  children,
  active,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
        disabled && "cursor-not-allowed opacity-30",
        active
          ? "border-sky-400 bg-sky-400 text-slate-950"
          : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700",
      )}
    >
      {children}
    </button>
  );
}
```

### `src/components/QuizScreen.tsx`

```tsx
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionPalette } from "@/components/QuestionPalette";
import { Flag, ChevronLeft, ChevronRight, Clock, LogOut } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import { useCountdown } from "@/hooks/useCountdown";
import type { QuizSession } from "@/types";

interface Props {
  session: QuizSession;
  onAnswer: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  onToggleFlag: () => void;
  onQuit: () => void;
  onFinish: (auto?: boolean) => void;
}

export function QuizScreen({
  session,
  onAnswer,
  onPrev,
  onNext,
  onJump,
  onToggleFlag,
  onQuit,
  onFinish,
}: Props) {
  const i = session.currentIndex;
  const q = session.questions[i];
  const total = session.questions.length;
  const progress = ((i + 1) / total) * 100;
  const isLast = i === total - 1;

  const remaining = useCountdown(session.endsAt || null, () => onFinish(true));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < q.options.length) {
          e.preventDefault();
          onAnswer(idx);
        }
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        onToggleFlag();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, q.options.length]);

  const handleNext = () => {
    if (isLast) onFinish(false);
    else onNext();
  };

  const timeTone =
    remaining > 300 ? "default" : remaining > 60 ? "warning" : "danger";

  return (
    <div className="space-y-4">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onQuit}>
            <LogOut size={14} />
            <span className="hidden sm:inline">Quitter</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={session.flags[i] ? "secondary" : "ghost"}
            size="sm"
            onClick={onToggleFlag}
            title="Marquer (F)"
          >
            <Flag
              size={14}
              className={session.flags[i] ? "text-amber-400" : ""}
              fill={session.flags[i] ? "currentColor" : "none"}
            />
            <span className="hidden sm:inline">
              {session.flags[i] ? "Marquée" : "Marquer"}
            </span>
          </Button>

          {session.endsAt > 0 && (
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-sm tabular-nums",
                timeTone === "danger" &&
                  "animate-pulse-fast border-rose-500/50 bg-rose-500/10 text-rose-300",
                timeTone === "warning" &&
                  "border-amber-500/50 bg-amber-500/10 text-amber-300",
                timeTone === "default" &&
                  "border-slate-800 bg-slate-900/50 text-slate-300",
              )}
            >
              <Clock size={13} />
              {formatTime(remaining)}
            </div>
          )}
        </div>
      </div>

      <ProgressBar value={progress} />

      {/* Question */}
      <Card className="p-5 sm:p-6">
        <QuestionCard
          question={q}
          index={i}
          total={total}
          mode={session.config.mode}
          selected={session.answers[i]}
          revealed={session.revealed[i]}
          onSelect={onAnswer}
        />
      </Card>

      {/* Palette */}
      <Card className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </span>
          <span className="text-xs text-slate-500">
            {session.answers.filter((a) => a !== null).length}/{total} répondues
          </span>
        </div>
        <QuestionPalette
          total={total}
          current={i}
          answers={session.answers}
          flags={session.flags}
          onJump={onJump}
        />
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onPrev} disabled={i === 0}>
          <ChevronLeft size={16} />
          Précédent
        </Button>

        <Button onClick={handleNext}>
          {isLast ? "Terminer" : "Suivante"}
          {!isLast && <ChevronRight size={16} />}
        </Button>
      </div>

      <p className="text-center text-[11px] text-slate-600">
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          1-4
        </kbd>{" "}
        répondre ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          Entrée
        </kbd>{" "}
        suivante ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          ←
        </kbd>{" "}
        précédent ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          F
        </kbd>{" "}
        marquer
      </p>
    </div>
  );
}
```

### `src/components/ResultsScreen.tsx`

```tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScoreRing } from "@/components/ui/ScoreRing";
import type { QuizResult, QuizSession } from "@/types";
import { cn, formatTime, percent, scoreColor } from "@/lib/utils";
import { Check, X, RotateCw, Home } from "lucide-react";

interface Props {
  session: QuizSession;
  result: QuizResult;
  onRestart: () => void;
  onRetryWrong: () => void;
  onHome: () => void;
}

export function ResultsScreen({
  session,
  result,
  onRestart,
  onRetryWrong,
  onHome,
}: Props) {
  const wrongIndices = session.questions
    .map((_, i) => i)
    .filter((i) => session.answers[i] !== session.questions[i].correctIndex);

  const verdict =
    result.percentage >= 80
      ? { label: "Solide — niveau examen atteint", tone: "success" as const }
      : result.percentage >= 60
        ? {
            label: "Passable — quelques domaines à consolider",
            tone: "warning" as const,
          }
        : {
            label: "Insuffisant — reprenez les fondamentaux",
            tone: "danger" as const,
          };

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        {session.autoSubmitted && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
            ⏱ Temps écoulé — remise automatique
          </div>
        )}
        <ScoreRing
          percentage={result.percentage}
          score={result.score}
          total={result.total}
        />
        <div className="mt-4">
          <Badge tone={verdict.tone}>{verdict.label}</Badge>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Temps : {formatTime(result.timeSeconds)} ·{" "}
          {session.config.mode === "exam" ? "Examen blanc" : "Entraînement"}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button onClick={onRestart}>
            <RotateCw size={15} />
            Nouvelle session
          </Button>
          {wrongIndices.length > 0 && (
            <Button variant="secondary" onClick={onRetryWrong}>
              Rejouer mes {wrongIndices.length} erreur
              {wrongIndices.length > 1 ? "s" : ""}
            </Button>
          )}
          <Button variant="ghost" onClick={onHome}>
            <Home size={15} />
            Accueil
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Résultats par domaine
        </h2>
        <div className="space-y-3">
          {result.byDomain.map((d) => (
            <div key={d.domain}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="truncate text-slate-300">{d.domain}</span>
                <span
                  className={cn(
                    "font-mono tabular-nums",
                    scoreColor(d.percentage),
                  )}
                >
                  {d.correct}/{d.total} · {d.percentage}%
                </span>
              </div>
              <ProgressBar
                value={d.percentage}
                tone={
                  d.percentage >= 80
                    ? "success"
                    : d.percentage >= 60
                      ? "warning"
                      : "danger"
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Correction détaillée
        </h2>
        <div className="space-y-4">
          {session.questions.map((q, i) => {
            const userAnswer = session.answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.source.id}
                className={cn(
                  "rounded-xl border p-4",
                  isCorrect
                    ? "border-slate-800 bg-slate-900/40"
                    : "border-rose-500/20 bg-rose-500/[0.03]",
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Badge tone="accent" className="mb-2">
                      {q.source.domain}
                    </Badge>
                    <p className="text-sm font-medium leading-snug text-slate-200">
                      {i + 1}. {q.source.question}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "grid h-6 w-6 flex-shrink-0 place-items-center rounded-md",
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400",
                    )}
                  >
                    {isCorrect ? (
                      <Check size={14} strokeWidth={3} />
                    ) : (
                      <X size={14} strokeWidth={3} />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  {q.options.map((opt, idx) => {
                    const isRight = idx === q.correctIndex;
                    const isUserWrong = idx === userAnswer && !isRight;
                    if (!isRight && !isUserWrong) return null;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-start gap-2 rounded-lg px-2.5 py-1.5",
                          isRight && "bg-emerald-500/10 text-emerald-300",
                          isUserWrong && "bg-rose-500/10 text-rose-300",
                        )}
                      >
                        <span className="mt-0.5 font-mono text-[10px] font-bold">
                          {isRight ? "✓" : "✗"}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 border-t border-slate-800 pt-3">
                  <p className="text-xs leading-relaxed text-slate-400">
                    <span className="font-semibold text-sky-400">
                      Explication —{" "}
                    </span>
                    {q.source.explanation}
                  </p>
                  {q.source.reference && (
                    <p className="mt-1.5 text-[11px] italic text-slate-600">
                      Source : {q.source.reference}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
```

### `src/components/HistoryScreen.tsx`

```tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { HistoryEntry } from "@/types";
import { cn, formatTime, percent, scoreColor } from "@/lib/utils";
import { ArrowLeft, Trash2 } from "lucide-react";

interface Props {
  entries: HistoryEntry[];
  onBack: () => void;
  onClear: () => void;
}

export function HistoryScreen({ entries, onBack, onClear }: Props) {
  const avg = entries.length
    ? Math.round(
        entries.reduce((a, e) => a + percent(e.score, e.total), 0) /
          entries.length,
      )
    : 0;

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Historique</h1>
          <p className="text-xs text-slate-500">
            {entries.length} session{entries.length > 1 ? "s" : ""} · moyenne{" "}
            <span className={cn("font-semibold", scoreColor(avg))}>{avg}%</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={14} />
          Retour
        </Button>
      </div>

      {entries.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Aucune session enregistrée.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Date</th>
                <th className="px-4 py-2.5 text-left font-medium">Mode</th>
                <th className="px-4 py-2.5 text-right font-medium">Score</th>
                <th className="px-4 py-2.5 text-right font-medium">%</th>
                <th className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">
                  Temps
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const p = percent(e.score, e.total);
                return (
                  <tr key={e.id} className="border-t border-slate-800/70">
                    <td className="px-4 py-3 text-slate-300">
                      {new Date(e.date).toLocaleDateString("fr-FR")}
                      <span className="ml-2 text-xs text-slate-600">
                        {new Date(e.date).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {e.mode === "exam" ? "Examen" : "Entraîn."}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-300">
                      {e.score}/{e.total}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3 text-right font-semibold tabular-nums",
                        scoreColor(p),
                      )}
                    >
                      {p}%
                    </td>
                    <td className="hidden px-4 py-3 text-right font-mono text-xs text-slate-500 sm:table-cell">
                      {formatTime(e.timeSeconds)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-5 text-right">
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Trash2 size={14} />
            Effacer l'historique
          </Button>
        </div>
      )}
    </Card>
  );
}
```

---

## 🚀 App & bootstrap

### `src/App.tsx`

```tsx
import { useState } from "react";
import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/HomeScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { HistoryScreen } from "@/components/HistoryScreen";
import { useQuiz } from "@/hooks/useQuiz";
import { loadHistory, saveHistory, clearHistory } from "@/lib/storage";
import type { HistoryEntry, QuizConfig } from "@/types";
import { uid, percent } from "@/lib/utils";

type Screen = "home" | "quiz" | "results" | "history";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const {
    session,
    result,
    start,
    stop,
    answer,
    goTo,
    next,
    prev,
    toggleFlag,
    finish,
  } = useQuiz();

  const handleStart = (cfg: QuizConfig) => {
    start(cfg);
    setScreen("quiz");
  };

  const handleFinish = (auto = false) => {
    finish(auto);
    // On bascule sur l'écran résultats dès que result est prêt (useEffect côté session)
    setScreen("results");
  };

  // Persister la session à la fin
  if (screen === "results" && session && result) {
    const existing = history.find((h) => h.id === session.id);
    if (!existing) {
      const entry: HistoryEntry = {
        id: session.id,
        date: session.finishedAt ?? Date.now(),
        mode: session.config.mode,
        score: result.score,
        total: result.total,
        timeSeconds: result.timeSeconds,
        domains: Array.from(
          new Set(session.questions.map((q) => q.source.domain)),
        ),
      };
      const next = [entry, ...history].slice(0, 60);
      setHistory(next);
      saveHistory(next);
    }
  }

  const handleRestart = () => {
    stop();
    setScreen("home");
  };

  const handleRetryWrong = () => {
    if (!session) return;
    const wrongQuestions = session.questions.filter(
      (q, i) => session.answers[i] !== q.correctIndex,
    );
    if (wrongQuestions.length === 0) return;

    start({
      mode: "training",
      count: wrongQuestions.length,
      durationMinutes: 0,
      domains: [],
    });
    setScreen("quiz");
  };

  const handleClear = () => {
    if (!confirm("Effacer tout l'historique ?")) return;
    clearHistory();
    setHistory([]);
  };

  const lastScore = history[0]
    ? {
        score: history[0].score,
        total: history[0].total,
        date: history[0].date,
      }
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <Header
        right={
          screen === "quiz" && session ? (
            <span className="hidden rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 sm:inline-block">
              {session.config.mode === "exam"
                ? "Mode examen"
                : "Mode entraînement"}
            </span>
          ) : null
        }
      />

      {screen === "home" && (
        <HomeScreen
          onStart={handleStart}
          onShowHistory={() => setScreen("history")}
          lastScore={lastScore}
        />
      )}

      {screen === "quiz" && session && (
        <QuizScreen
          session={session}
          onAnswer={answer}
          onPrev={prev}
          onNext={next}
          onJump={goTo}
          onToggleFlag={toggleFlag}
          onQuit={handleRestart}
          onFinish={handleFinish}
        />
      )}

      {screen === "results" && session && result && (
        <ResultsScreen
          session={session}
          result={result}
          onRestart={handleRestart}
          onRetryWrong={handleRetryWrong}
          onHome={() => {
            stop();
            setScreen("home");
          }}
        />
      )}

      {screen === "history" && (
        <HistoryScreen
          entries={history}
          onBack={() => setScreen("home")}
          onClear={handleClear}
        />
      )}

      <footer className="mt-10 text-center text-[11px] text-slate-600">
        Banque de questions locale · aucune donnée envoyée sur Internet
      </footer>
    </div>
  );
}
```

### `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## 🧠 Points clés du design (page questionnaire)

- **Hiérarchie claire** : badge domaine → compteur `01 / 20` en mono → énoncé large et aéré → choix.
- **Choix A/B/C/D** : lettre dans un carré, hover cyan, sélection avec ring interne, feedback vert/rouge en mode entraînement (icônes `Check` / `X`).
- **Barre de progression** dégradée sous le header, qui avance à chaque question.
- **Timer** coloré : neutre > 5 min, ambre < 5 min, rouge pulsant < 1 min (classe `animate-pulse-fast`).
- **Palette de navigation** : grille de pastilles compacte avec drapeau ambre si marquée, couleur cyan si répondue, outline si courante.
- **Raccourcis clavier** : `1-4` répondre, `Entrée`/`→` suivante, `←` précédente, `F` marquer.
- **Explication** en mode entraînement : encart cyan avec icône ampoule, glisse depuis le bas (`animate-slide-up`), avec la source (ANSSI, NIST, RFC…).
- **Résultats** : anneau SVG animé, verdict par palier, breakdown par domaine avec barres colorées, correction détaillée qui ne montre **que la bonne réponse et la mauvaise donnée** (pas les leurres).
- **Historique** persisté en localStorage, moyenne globale, suppression à la demande.

## ▶️ Lancer

```bash
npm install
npm run dev
```

## 🔧 Pour aller plus loin

- **Ajouter des questions** : éditez `src/data/questions.json` en respectant le type `Question`. Les domaines se recalculent automatiquement dans l'UI.
- **Nouvelles catégories** : la sélection par domaine est générique — aucun code à toucher.
- **Déploiement** : `npm run build` puis hébergement du dossier `dist/` (Vercel, Netlify, GitHub Pages…).
- **i18n** : la structure typée permet d'extraire facilement les libellés si besoin.

Si tu veux, je peux ajouter **un mode "examen réel CSCU"** avec un tirage pondéré par domaine (proportion identique à l'examen officiel), ou un **écran d'analyse de progression dans le temps** (courbe par domaine sur plusieurs sessions).
