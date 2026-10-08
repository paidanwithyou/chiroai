const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function clean(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function buildPromptSet(payload) {
  const character = clean(payload.character, 'young woman portrait');
  const scene = clean(payload.scene, 'rainy city alley with cinematic lighting');
  const mood = clean(payload.mood, 'dramatic, cinematic, elegant');
  const style = clean(payload.style, 'realistic digital painting, professional Ibis Paint coloring, ultra detailed');
  const format = clean(payload.format, 'portrait');
  const lighting = clean(payload.lighting, 'soft neon cinematic lighting');

  const author = `Story concept: ${character} stands in ${scene}. Focus on emotion, character identity, and visual storytelling. Mood: ${mood}. Goal: create a compelling ${format} composition with elegant line work, layered narrative depth, and believable expression.`;

  const colorist = `Color palette: use realistic skin tones, soft highlights, dramatic shadows, balanced warm and cool tones, rich contrast, and polished digital painting transitions. Style: ${style}. Lighting: ${lighting}. Render like a professional illustration with smooth gradient shading and clean color refinement.`;

  const background = `Environment: ${scene}, atmospheric depth, realistic materials, subtle reflections, layered foreground and background separation, cinematic composition, believable weather effects, strong depth cues, rich environmental details, and a polished urban mood.`;

  const editor = `Composition direction: balance the subject and setting in a strong cinematic frame, isolate the focal point, apply elegant perspective, maintain clarity and realism, refine silhouette, emphasize mood transitions, and preserve a premium illustration finish.`;

  const narrator = `Narrative mood: ${character} feels introspective, confident, and emotionally vivid in a stylized real-world setting. The scene conveys quiet intensity and beauty through sophisticated visual storytelling, weather, urban ambiance, and a cinematic atmosphere.`;

  const final = `(${format}) ${character}, ${scene}, ${mood}, ${style}, ${lighting}, realistic facial structure, detailed eyes, natural skin texture, layered shading, cinematic composition, refined line art, realistic fabric details, dramatic yet elegant mood, atmospheric depth, professional digital painting, ultra detailed, polished final render, high contrast, photorealistic realism, masterpiece quality, Ibis Paint style color treatment, high resolution.`;

  return {
    authorPrompt: author,
    coloristPrompt: colorist,
    backgroundPrompt: background,
    editorPrompt: editor,
    narratorPrompt: narrator,
    finalPrompt: final
  };
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'ChiroAI API is running.' });
});

app.post('/api/generate', (req, res) => {
  const payload = req.body || {};
  const rolePrompts = buildPromptSet(payload);

  res.json({
    ok: true,
    ...rolePrompts,
    summary: {
      character: clean(payload.character, 'young woman portrait'),
      scene: clean(payload.scene, 'rainy city alley with cinematic lighting'),
      mood: clean(payload.mood, 'dramatic, cinematic, elegant'),
      style: clean(payload.style, 'realistic digital painting, Ibis Paint style'),
      format: clean(payload.format, 'portrait')
    }
  });
});

app.post('/api/generate-image', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(400).json({
      ok: false,
      message: 'OPENAI_API_KEY is not configured. Add it to .env to generate real images.'
    });
  }

  try {
    const payload = req.body || {};
    const finalPrompt = buildPromptSet(payload).finalPrompt;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: finalPrompt,
        size: '1024x1024'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: data?.error?.message || 'Image generation failed.'
      });
    }

    const imageUrl = data?.data?.[0]?.url || null;

    if (!imageUrl) {
      return res.status(500).json({
        ok: false,
        message: 'No image URL returned by the provider.'
      });
    }

    res.json({ ok: true, provider: 'openai', imageUrl });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || 'Unexpected error while generating image.'
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ChiroAI server running at http://localhost:${PORT}`);
});
