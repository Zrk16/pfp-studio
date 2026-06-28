<div align="center">

<img src="public/favicon-512.png" alt="PFP Studio" width="120" />

# PFP Studio

**stop guessing which photo to post. let the math pick.**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![face-api.js](https://img.shields.io/badge/face--api.js-0.22-ff5500)](https://github.com/justadudewhohacks/face-api.js)
[![100% client-side](https://img.shields.io/badge/100%25-client--side-1e7a52)](#how-it-works)
[![live demo](https://img.shields.io/badge/live-demo-ff5500)](https://pfp-studio-fawn.vercel.app/)

[**try it live →**](https://pfp-studio-fawn.vercel.app/)

<img src="docs/demo.gif" alt="PFP Studio demo" width="760" />

</div>

## what it is

you have 8 photos of your face and no idea which one to use as your profile pic. you stare. you ask a friend. you stall, but still now answer...

PFP Studio takes the staring out of it. drop your photos in, it scores every face on four things, then tells you which one wins and *why* in plain words. 

no account. no upload. your photos never leave the browser.

## how it works

every photo runs through [face-api.js](https://github.com/justadudewhohacks/face-api.js) right in your browser. it finds the face, then scores it on four checks:

- **centering** — is the face in the middle, or shoved to one side
- **size** — does the face fill the frame, or are you a tiny dot
- **brightness** — lit clean, or lost in shadow
- **sharpness** — crisp, or a blurry mess (measured by contrast between neighboring pixels)

each gets a score, they stack into a total, and the highest one wins. the winner card steps to center and drops its one-line reason. the phrasing is randomized per check so it doesn't read like a robot every time.


### why client-side matters

face detection runs in *your* browser. the models load from `/models`, the photos get read straight off your disk into a `<canvas>`, scored, and that's it. nothing hits a server. nothing gets stored. close the tab and it's gone.


## stack

- **React 19** + **Vite 8** — fast dev, tiny build
- **face-api.js** — tinyFaceDetector + 68-point landmarks, all in-browser
- **oxlint** — linting that's actually fast
- fonts: **Fraunces** for display, **DM Sans** for body
- citrus gradient because orange is underrated



---

<div align="center">

built by [Ziyaad](https://github.com/Zrk16) · [live demo](https://pfp-studio-fawn.vercel.app/)

</div>
