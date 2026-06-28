# devlog

## 📸 PFP Studio Devlog #3 (the robot finally shut up)

TL;DR
- the winner explanation sounds like a person now, not a form letter
- photos with no face get a card instead of silently vanishing
- rebuilt the whole upload screen into orbiting rings of your photos
- shipped to vercel, after one line of css put up a fight

---

### The Justification

before, the winner card said the exact same thing every single time. "this photo is the best because the face is well-centered in the frame." every photo. every run. it read like a robot filling out a form.

so i gave each check its own pool of phrasings, picked at random, and made it call out two strengths instead of one. now it says stuff like "easy top pick. face sits right in the middle, plus crisp, every detail holds up."

reads like a person wrote it. which was the whole point.

---

### No Face? Still Get a Card

what's the point of ranking photos if half of them disappear? exactly, there's none.

face-api returns nothing when it can't find a face, and i was quietly dropping those photos. drop a landscape or a logo and it just vanished from the results. now every photo gets a card. no face means it says "no face detected" and sinks to the bottom. nothing disappears anymore.

---

### The Ring Thing

the old upload screen was a plain button. boring. the new one is your photos, cropped into circles, orbiting in concentric rings on a tilted plane with a citrus glow behind them, the rank button sitting dead center.

---

### What I Learned

here's the problem nobody warns you about. if you spin a ring, everything pinned to it spins too. so your face would slowly tumble upside down as it goes around. not a good look.

the fix is a counter-spin. the photo sits inside a wrapper that rotates the opposite direction at the exact same speed as its ring. the two cancel out. the ring carries the photo around the circle, the wrapper holds the face perfectly level the entire way.

i also learned the hard way that your local dev server lies to you. i had a busted line of css, var(var(--accent-soft)), sitting in the code for days. local never said a word. the second Vercel ran the real production build, it rejected it instantly and killed the whole deploy. one line. fixed it, pushed again, live.

---

### 🍊 Tip of the Day

shoot at eye level, not from below.

a low angle points the lens up your nose and widens your jaw. eye level flatters basically everyone. bonus, the app rewards it too, since a centered well-framed face scores higher.

---

## PFP Studio Devlog #2

the scoring system is done.

four checks per photo: centering, size, brightness, sharpness. each one reads the actual pixel data from the face region and turns it into a number. combine them with weights, sort the results, and the best photo rises to the top.

the sharpness one was the most interesting to build. it loops through every pixel and compares it to the pixels directly to its right and below. blurry photos have smooth transitions. sharp photos have high contrast between neighbors. the bigger the average difference, the sharper the photo.

the ui got a full revamp too.

went from raw unstyled html to something that actually looks like a product. warm cream background, Syne for the headings, orange accent for the winner card. each result staggered in with a fade. the #1 card gets an orange ring and shows the "why it won" explanation underneath.

it works.

uploaded 5 photos, hit rank, and the results actually make sense. the best-lit, well-centered shot came out on top. the blurry one ranked last.

what's next: loading states so it doesn't feel frozen while processing, and filling out the empty state so the page doesn't look bare on load.

then it ships.
