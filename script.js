const defaultState = {
  character: "artis perempuan muda dengan ekspresi tenang",
  scene: "jalan kota hujan malam dengan lampu neon dan angin lembut",
  mood: "dramatic, cinematic, melancholic, elegant",
  style: "realistic digital painting, professional Ibis Paint coloring, ultra detailed"
};

const fields = {
  character: document.getElementById("character"),
  scene: document.getElementById("scene"),
  mood: document.getElementById("mood"),
  style: document.getElementById("style")
};

const prompts = {
  authorPrompt: document.getElementById("authorPrompt"),
  coloristPrompt: document.getElementById("coloristPrompt"),
  backgroundPrompt: document.getElementById("backgroundPrompt"),
  editorPrompt: document.getElementById("editorPrompt"),
  narratorPrompt: document.getElementById("narratorPrompt"),
  finalPrompt: document.getElementById("finalPrompt")
};

function buildPromptSet() {
  const character = fields.character.value || defaultState.character;
  const scene = fields.scene.value || defaultState.scene;
  const mood = fields.mood.value || defaultState.mood;
  const style = fields.style.value || defaultState.style;

  const author = `Story concept: ${character} berada di ${scene}. Focus pada emosi, identity, dan pose yang kuat. Mood: ${mood}. Tujuan visual adalah menggambarkan karakter yang berkarakter, elegant, penuh cerita, dan memikat secara cinematic.`;

  const colorist = `Color grading: gunakan palette realistis yang menyeimbangkan warm dan cool tones. Skin tones natural, lighting soft but dramatic, depth pada bayangan, highlights halus, final rendering seperti digital painting profesional dan stylized realism. Style: ${style}.`;

  const background = `Background environment: ${scene}, detail urban setting, atmospheric fog, subtle reflections, layered depth, realistic material surfaces, cinematic environment composition, soft lighting from neon and ambient light, believable perspective, detailed architecture and weather mood.`;

  const editor = `Composition direction: focus on face and silhouette, maintain clean negative space, cinematic framing, balance between character and environment, crisp detail, strong subject isolation, layered depth, rich contrast, polished final shot with professional editorial balance.`;

  const narrator = `Narrative description: a quiet and expressive moment in a rainy neon city. The character feels introspective yet confident, with a sense of resilience and elegance. Atmosphere is moody but luminous, merging realism and emotional storytelling in a polished digital illustration.`;

  const final = `Portrait of ${character}, ${scene}, ${mood}, ${style}, cinematic composition, realistic facial features, natural skin texture, detailed hair, expressive eyes, refined eyeliner and subtle makeup, rich lighting contrast, layered color shading, realistic fabric wrinkles, atmospheric depth, professional digital illustration, ultra detailed final render, sharp focus, clean line art under painting, polished color blending, high quality masterpiece, photorealistic, cinematic realism, award-winning illustration, Ibis Paint style coloring, high resolution.`;

  prompts.authorPrompt.value = author;
  prompts.coloristPrompt.value = colorist;
  prompts.backgroundPrompt.value = background;
  prompts.editorPrompt.value = editor;
  prompts.narratorPrompt.value = narrator;
  prompts.finalPrompt.value = final;
}

function copyText(value) {
  if (!value) return;
  navigator.clipboard.writeText(value).then(() => {
    const original = event?.target?.textContent || "Copy";
    if (event && event.target) {
      event.target.textContent = "Copied";
      setTimeout(() => {
        event.target.textContent = original;
      }, 900);
    }
  }).catch(() => {
    alert("Gagal menyalin. Silakan copy manual.");
  });
}

function bindGenerate() {
  const button = document.getElementById("generateBtn");
  button.addEventListener("click", buildPromptSet);
}

function bindCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.dataset.copy;
      const text = document.getElementById(targetId)?.value || "";
      navigator.clipboard.writeText(text).then(() => {
        const oldText = this.textContent;
        this.textContent = "Copied";
        setTimeout(() => {
          this.textContent = oldText;
        }, 900);
      }).catch(() => {
        alert("Gagal menyalin. Silakan salin manual.");
      });
    });
  });
}

function bindCopyAll() {
  const button = document.getElementById("copyAllBtn");
  button.addEventListener("click", () => {
    const allText = Object.values(prompts)
      .map((field) => field.value)
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(allText).then(() => {
      button.textContent = "Copied All";
      setTimeout(() => {
        button.textContent = "Copy All";
      }, 900);
    }).catch(() => {
      alert("Gagal menyalin seluruh prompt.");
    });
  });
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", buildPromptSet);
});

document.getElementById("mainPrompt").addEventListener("input", () => {
  const prompt = document.getElementById("mainPrompt").value;
  prompts.finalPrompt.value = `${prompt}, realistic lighting, cinematic composition, professional digital painting, layered color shading, ultra-detailed, polished final render, high resolution, award-winning illustration.`;
});

bindGenerate();
bindCopyButtons();
bindCopyAll();
buildPromptSet();
