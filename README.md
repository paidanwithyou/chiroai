# ChiroAI

ChiroAI adalah project starter untuk studio AI kreatif yang membantu workflow visual seperti:

- Author: merancang konsep cerita dan komposisi
- Colorist: menentukan palette, lighting, warna kulit, dan shading
- Editor: menyusun frame, komposisi, dan keseimbangan visual
- Narrator: menulis mood dan deskripsi cerita
- Background: membangun setting dan atmosphere
- Detail pass: polishing realistis dan kualitas akhir

Tujuan proyek ini adalah menyediakan UI sederhana untuk menghasilkan prompt visual realistis yang cocok untuk AI image generation, dengan gaya profesional seperti digital coloring di Ibis Paint.

## Fitur

- Desain landing page modern
- Form input untuk karakter, adegan, mood, dan style
- Output prompt per role kreatif
- Final image prompt siap copy
- UI responsive untuk desktop dan mobile

## Jalankan di browser

Karena project ini berbasis HTML/CSS/JS statis, Anda bisa langsung membuka file `index.html` di browser.

Atau jalankan server lokal:

```bash
python3 -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Struktur file

```text
chiroai/
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

## Catatan

Project ini adalah starter UI dan prompt workflow. Untuk hasil gambar yang lebih kuat, Anda bisa menghubungkan ke model generatif seperti SDXL, Flux, Midjourney, atau API penyedia gambar lainnya.

## Lisensi

MIT
