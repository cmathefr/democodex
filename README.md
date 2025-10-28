# Chord Learner

Application mobile construite avec Expo / React Native pour apprendre les accords de musique au piano.

## Fonctionnalités

- **Mode Exploration** : sélection de la fondamentale et de la qualité d'accord, visualisation des notes sur une portée, lecture audio en sonorité piano.
- **Mode Exercices** : jeu de type quiz avec écoute d'un accord, quatre propositions et feedback immédiat.
- **Mode Renversements** : travail sur les renversements d'accords, affichage sur portée et écoute de chaque position.

## Prise en main

### Prérequis

- Node.js 18 ou version plus récente
- npm 9+ (installé avec Node) ou Yarn
- Expo Go installé sur votre téléphone **ou** un émulateur iOS/Android configuré

### Installation & lancement

1. Installer les dépendances :
   ```bash
   npm install
   ```
   > Conseil : si vous utilisez un registre privé ou derrière un proxy, configurez les variables d'environnement `npm_config_registry` ou `npm_config_https_proxy` avant de lancer l'installation.
2. Démarrer l'application Expo (par défaut en mode développement Metro) :
   ```bash
   npm start
   ```
   Vous pouvez aussi lancer directement un appareil virtuel :
   ```bash
   npm run android
   # ou
   npm run ios
   ```
3. Dans le terminal Expo, choisissez "Run on Android device/emulator", "Run on iOS simulator" ou scannez le QR code avec Expo Go.

Le bundle de l'application sera mis à jour à chaud lors de vos modifications.

## Structure du projet

- `App.tsx` : point d'entrée avec la navigation par modes.
- `src/components` : composants d'interface (exploration, exercices, renversements, portée, sélecteur d'accords).
- `src/hooks/useSoundPlayer.ts` : lecture audio des notes à partir d'échantillons encodés en base64.
- `src/utils/music.ts` : logique musicale (notes, intervalles, génération d'accords et renversements).
- `src/assets/pianoSamples.ts` : encodage base64 des échantillons mono de piano, évitant les fichiers binaires.

### Ressources audio

Afin d'éviter les problèmes d'extraction liés aux fichiers binaires, les échantillons `.wav` sont encodés en base64 au sein de `src/assets/pianoSamples.ts`. L'application lit directement ces URI `data:` via `expo-av`. Si vous souhaitez recréer les fichiers physiques (par exemple pour une édition audio), vous pouvez utiliser le script suivant :

```bash
node - <<'NODE'
const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'pianoSamples.ts'), 'utf8');
const regex = /'([^']+)': 'data:audio\\/wav;base64,([^']+)'/g;
const outDir = path.join(__dirname, 'assets', 'audio', 'piano');
fs.mkdirSync(outDir, { recursive: true });
let match;
while ((match = regex.exec(file))) {
  const [, name, base64] = match;
  fs.writeFileSync(path.join(outDir, `${name}.wav`), Buffer.from(base64, 'base64'));
}
console.log('Échantillons reconstitués dans', outDir);
NODE
```

Les fichiers régénérés ne sont pas nécessaires pour exécuter l'application, mais restent disponibles si vous avez besoin de manipulations externes.

### Ressources graphiques

L'icône Expo est recréée à partir d'une chaîne base64 lors de l'installation des dépendances. Le script `npm run generate:icon` (exécuté automatiquement via `postinstall`) écrit le fichier `assets/icon.png`, ignoré par Git, afin de satisfaire Expo lors du lancement ou du build. Relancez ce script manuellement si vous supprimez le fichier généré.

## Tests

Les tests automatisés ne sont pas encore configurés. L'application peut être validée en la lançant sur un terminal Expo et en vérifiant l'interaction des trois modes.
