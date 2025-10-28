const fs = require('fs');
const path = require('path');

const base64Icon = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/Pqug6QAAAABJRU5ErkJggg==';
const outputPath = path.join(__dirname, '..', 'assets', 'icon.png');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, Buffer.from(base64Icon, 'base64'));

console.log(`Generated Expo icon at ${outputPath}`);
