const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOG() {
  const logoPath = path.join(__dirname, '../download/logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Gradients -->
      <radialGradient id="radialGlow" cx="50%" cy="22%" r="60%">
        <stop offset="0%" stop-color="#2D2112" stop-opacity="0.95" />
        <stop offset="45%" stop-color="#140E08" stop-opacity="0.98" />
        <stop offset="100%" stop-color="#050403" stop-opacity="1" />
      </radialGradient>

      <radialGradient id="logoHalo" cx="50%" cy="18%" r="35%">
        <stop offset="0%" stop-color="#DCAA61" stop-opacity="0.32" />
        <stop offset="50%" stop-color="#DCAA61" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#DCAA61" stop-opacity="0" />
      </radialGradient>

      <!-- Gold Gradients -->
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FAF0DE" />
        <stop offset="30%" stop-color="#E8C685" />
        <stop offset="60%" stop-color="#FAF0DE" />
        <stop offset="100%" stop-color="#C2943A" />
      </linearGradient>

      <linearGradient id="goldIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FAF0DE" />
        <stop offset="50%" stop-color="#DCAA61" />
        <stop offset="100%" stop-color="#A17424" />
      </linearGradient>

      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5E6C8" stop-opacity="0.6" />
        <stop offset="30%" stop-color="#DCAA61" stop-opacity="0.35" />
        <stop offset="70%" stop-color="#6E4D15" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#E2BD73" stop-opacity="0.5" />
      </linearGradient>

      <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1B150F" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#0E0A07" stop-opacity="0.96" />
      </linearGradient>

      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${width}" height="${height}" fill="#050403" />
    <rect width="${width}" height="${height}" fill="url(#radialGlow)" />
    <circle cx="600" cy="140" r="320" fill="url(#logoHalo)" />

    <!-- Luxury Double Border Frame -->
    <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="18" fill="none" stroke="url(#goldBorder)" stroke-width="1.5" />
    <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="12" fill="none" stroke="#DCAA61" stroke-width="0.75" stroke-opacity="0.25" stroke-dasharray="8 6" />

    <!-- Corner Accents -->
    <path d="M 28 58 L 28 28 L 58 28" fill="none" stroke="#DCAA61" stroke-width="2.5" />
    <path d="M ${width - 58} 28 L ${width - 28} 28 L ${width - 28} 58" fill="none" stroke="#DCAA61" stroke-width="2.5" />
    <path d="M 28 ${height - 58} L 28 ${height - 28} L 58 ${height - 28}" fill="none" stroke="#DCAA61" stroke-width="2.5" />
    <path d="M ${width - 58} ${height - 28} L ${width - 28} ${height - 28} L ${width - 28} ${height - 58}" fill="none" stroke="#DCAA61" stroke-width="2.5" />

    <!-- Official Fortius Capital Logo (Centered) -->
    <image href="${logoBase64}" x="375" y="52" width="450" height="171" filter="url(#shadow)" />

    <!-- Value Proposition Main Headline -->
    <text x="600" y="266" text-anchor="middle" fill="url(#goldText)" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="29" font-weight="800" letter-spacing="2.5">
      SOLUCIONES FINANCIERAS DE CONFIANZA
    </text>
    <text x="600" y="299" text-anchor="middle" fill="#E8E2D5" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17.5" font-weight="400" letter-spacing="0.5">
      Tu aliado estratégico para préstamos rápidos, seguros y transparentes en Perú
    </text>

    <!-- 3 Pillars Cards Row -->
    <!-- Card 1: Préstamos Personales -->
    <g transform="translate(68, 332)" filter="url(#shadow)">
      <rect width="324" height="158" rx="14" fill="url(#cardBg)" stroke="url(#goldBorder)" stroke-width="1.2" />
      <circle cx="46" cy="46" r="22" fill="#241B10" stroke="#DCAA61" stroke-width="1.2" />
      <!-- Rayo SVG Icon -->
      <path d="M 47 34 L 38 47 L 46 47 L 45 58 L 54 44 L 47 44 Z" fill="url(#goldIconGrad)" />
      
      <text x="80" y="42" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700">Préstamos Personales</text>
      <text x="80" y="61" fill="#DCAA61" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="600">Al instante sin aval</text>
      <line x1="22" y1="84" x2="302" y2="84" stroke="#DCAA61" stroke-width="0.75" stroke-opacity="0.25" />
      <text x="24" y="110" fill="#E2DDD5" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">✓ Desembolso el mismo día</text>
      <text x="24" y="132" fill="#A8A399" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400">Montos de S/ 1,000 hasta S/ 50,000</text>
    </g>

    <!-- Card 2: Garantía Vehicular -->
    <g transform="translate(438, 332)" filter="url(#shadow)">
      <rect width="324" height="158" rx="14" fill="url(#cardBg)" stroke="url(#goldBorder)" stroke-width="1.2" />
      <circle cx="46" cy="46" r="22" fill="#241B10" stroke="#DCAA61" stroke-width="1.2" />
      <!-- Auto SVG Icon -->
      <path d="M 37 49 L 39 42 C 40 39 42 38 46 38 L 46 38 C 50 38 52 39 53 42 L 55 49 M 35 49 L 57 49 C 58 49 59 50 59 51 L 59 54 C 59 55 58 56 57 56 L 35 56 C 34 56 33 55 33 54 L 33 51 C 33 50 34 49 35 49 Z" fill="none" stroke="url(#goldIconGrad)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="39" cy="53" r="1.5" fill="#FAF0DE" />
      <circle cx="53" cy="53" r="1.5" fill="#FAF0DE" />

      <text x="80" y="42" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700">Garantía Vehicular</text>
      <text x="80" y="61" fill="#DCAA61" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="600">Sin dejar tu auto</text>
      <line x1="22" y1="84" x2="302" y2="84" stroke="#DCAA61" stroke-width="0.75" stroke-opacity="0.25" />
      <text x="24" y="110" fill="#E2DDD5" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">✓ Continúas manejando tu auto</text>
      <text x="24" y="132" fill="#A8A399" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400">Hasta el 80% del valor comercial</text>
    </g>

    <!-- Card 3: Seguridad & Confianza -->
    <g transform="translate(808, 332)" filter="url(#shadow)">
      <rect width="324" height="158" rx="14" fill="url(#cardBg)" stroke="url(#goldBorder)" stroke-width="1.2" />
      <circle cx="46" cy="46" r="22" fill="#241B10" stroke="#DCAA61" stroke-width="1.2" />
      <!-- Escudo SVG Icon -->
      <path d="M 46 36 L 54 39 C 54 47 51 53 46 56 C 41 53 38 47 38 39 Z" fill="none" stroke="url(#goldIconGrad)" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 42 46 L 45 49 L 51 43" fill="none" stroke="#FAF0DE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

      <text x="80" y="42" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700">Seguridad Total</text>
      <text x="80" y="61" fill="#DCAA61" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="600">100% Legal &amp; Regulado</text>
      <line x1="22" y1="84" x2="302" y2="84" stroke="#DCAA61" stroke-width="0.75" stroke-opacity="0.25" />
      <text x="24" y="110" fill="#E2DDD5" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500">✓ Custodia notarial garantizada</text>
      <text x="24" y="132" fill="#A8A399" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400">Atención personalizada y rápida</text>
    </g>

    <!-- Bottom Legal & Verification Strip -->
    <line x1="68" y1="532" x2="1132" y2="532" stroke="url(#goldBorder)" stroke-width="1" />

    <text x="88" y="565" fill="#DCAA61" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5">
      FORTIUS CAPITAL S.A.C.
    </text>

    <g transform="translate(510, 550)">
      <rect x="0" y="0" width="180" height="26" rx="6" fill="#18130E" stroke="#DCAA61" stroke-width="1" />
      <text x="90" y="17" text-anchor="middle" fill="#FAF8F5" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1">
        RUC: 20616561082
      </text>
    </g>

    <text x="1112" y="565" text-anchor="end" fill="#E6E0D5" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="1">
      www.fortiuscapital.pe
    </text>
  </svg>
  `;

  // Render to PNG
  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  // Render to JPG (optimal for WhatsApp under 250kb)
  const jpgBuffer = await sharp(Buffer.from(svg))
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const webpBuffer = await sharp(Buffer.from(svg))
    .webp({ quality: 92 })
    .toBuffer();

  // Write to destination files
  const targets = [
    { file: path.join(__dirname, '../public/og-image.jpg'), buf: jpgBuffer },
    { file: path.join(__dirname, '../public/og-image.png'), buf: pngBuffer },
    { file: path.join(__dirname, '../public/og-image.webp'), buf: webpBuffer },
    { file: path.join(__dirname, '../src/app/opengraph-image.png'), buf: pngBuffer },
    { file: path.join(__dirname, '../src/app/opengraph-image.jpg'), buf: jpgBuffer },
  ];

  for (const t of targets) {
    fs.writeFileSync(t.file, t.buf);
    console.log(`Saved: ${t.file} (${Math.round(t.buf.length / 1024)} KB)`);
  }

  // Also save in artifacts for inspection
  const artifactPath = 'C:/Users/fabio/.gemini/antigravity/brain/933334c9-a7a2-4ded-a07b-d2cce4ccaca1/generated_og.png';
  fs.writeFileSync(artifactPath, pngBuffer);
  console.log(`Saved artifact: ${artifactPath}`);
}

generateOG().catch(console.error);
