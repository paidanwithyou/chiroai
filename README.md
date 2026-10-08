const form = document.getElementById('promptForm');
const authorPrompt = document.getElementById('authorPrompt');
const coloristPrompt = document.getElementById('coloristPrompt');
const backgroundPrompt = document.getElementById('backgroundPrompt');
const editorPrompt = document.getElementById('editorPrompt');
const narratorPrompt = document.getElementById('narratorPrompt');
const finalPrompt = document.getElementById('finalPrompt');
const imagePreviewBox = document.getElementById('imagePreviewBox');
const imagePreview = document.getElementById('imagePreview');

function setPromptFields(data) {
  authorPrompt.value = data.authorPrompt || '';
  coloristPrompt.value = data.coloristPrompt || '';
  backgroundPrompt.value = data.backgroundPrompt || '';
  editorPrompt.value = data.editorPrompt || '';
  narratorPrompt.value = data.narratorPrompt || '';
  finalPrompt.value = data.finalPrompt || '';
}

async function fetchGeneratedPrompt(payload) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'Prompt generation failed.');
  }

  setPromptFields(data);
}

async function generateImage() {
  const payload = Object.fromEntries(new FormData(form).entries());
  imagePreviewBox.classList.add('hidden');

  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || 'Image generation failed.');
    }

    imagePreview.src = data.imageUrl;
    imagePreviewBox.classList.remove('hidden');
  } catch (error) {
    alert(error.message || 'Tidak dapat menghasilkan image.');
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    await fetchGeneratedPrompt(payload);
  } catch (error) {
    alert(error.message || 'Gagal membuat prompt.');
  }
}

async function checkApiHealth() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    alert(data.message || 'API ready.');
  } catch (error) {
    alert('API is offline. Start the server with: npm start');
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

form.addEventListener('submit', handleSubmit);
document.getElementById('generateImageBtn').addEventListener('click', generateImage);
document.getElementById('healthCheckBtn').addEventListener('click', checkApiHealth);
document.getElementById('copyAllBtn').addEventListener('click', async () => {
  const allText = [
    authorPrompt.value,
    coloristPrompt.value,
    backgroundPrompt.value,
    editorPrompt.value,
    narratorPrompt.value,
    finalPrompt.value
  ].join('\n\n---\n\n');

  const success = await copyText(allText);
  alert(success ? 'Semua prompt berhasil disalin.' : 'Gagal menyalin. Salin manual.');
});

document.querySelectorAll('.mini-copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.target);
    const success = await copyText(target.value);
    alert(success ? 'Prompt berhasil disalin.' : 'Gagal menyalin.');
  });
});

fetchGeneratedPrompt(Object.fromEntries(new FormData(form).entries()));
