export function scoreCentering(detection, imgElement) {
  const box = detection.detection.box
  const imgW = imgElement.naturalWidth
  const imgH = imgElement.naturalHeight

  const faceCenterX = box.x + box.width / 2
  const faceCenterY = box.y + box.height / 2

  const imgCenterX = imgW / 2
  const imgCenterY = imgH / 2

  const maxOffset = Math.sqrt(imgW ** 2 + imgH ** 2) / 2
  const offset = Math.sqrt(
    (faceCenterX - imgCenterX) ** 2 + (faceCenterY - imgCenterY) ** 2
  )

  return Math.round((1 - offset / maxOffset) * 100)
}

export function scoreSize(detection, imgElement) {
  const box = detection.detection.box
  const imgW = imgElement.naturalWidth
  const imgH = imgElement.naturalHeight
  const faceRatio = (box.width * box.height) / (imgW * imgH)
  if (faceRatio < 0.05) return Math.round((faceRatio / 0.05) * 50)
  if (faceRatio > 0.6) return Math.round((1 - (faceRatio - 0.6) / 0.4) * 100)
  return Math.round(50 + ((faceRatio - 0.05) / 0.55 ) * 50)
}

export function scoreBrightness(detection, imgElement) {
  const box = detection.detection.box
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = imgElement.naturalWidth
  canvas.height = imgElement.naturalHeight
  ctx.drawImage(imgElement, 0, 0)
  
  const x = Math.max(0, Math.round(box.x))
  const y = Math.max(0, Math.round(box.y))
  const w = Math.min(Math.round(box.width), canvas.width - x)
  const h = Math.min(Math.round(box.height), canvas.height - y)

  const data = ctx.getImageData(x, y, w, h).data
  let total = 0
  for (let i = 0; i < data.length; i += 4) {
    total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
  }
  const avg = total / (data.length / 4)
  const distance = Math.abs(avg - 128)
  return Math.round(Math.max(0, 100 - (distance / 128) * 100))
}

export function scoreSharpness(detection, imgElement) {
  const box = detection.detection.box
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = imgElement.naturalWidth
  canvas.height = imgElement.naturalHeight
  ctx.drawImage(imgElement, 0, 0)

  const x = Math.max(0, Math.round(box.x))
  const y = Math.max(0, Math.round(box.y))
  const w = Math.min(Math.round(box.width), canvas.width - x)
  const h = Math.min(Math.round(box.height), canvas.height - y)

  const data = ctx.getImageData(x, y, w, h).data
  let total = 0
  let count = 0
  for (let row = 1; row < h - 1; row++) {
    for (let col = 1; col < w - 1; col++) {
      const i = (row * w + col) * 4
      const iRight = (row * w + col + 1) * 4
      const iDown = ((row + 1) * w + col) * 4
      const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      const brightnessR = 0.299 * data[iRight] + 0.587 * data[iRight + 1] + 0.114 * data[iRight + 2]
      const brightnessD = 0.299 * data[iDown] + 0.587 * data[iDown + 1] + 0.114 * data[iDown + 2]
      total += Math.abs(brightness - brightnessR) + Math.abs(brightness - brightnessD)
      count++
    }
  }
  const avgEdge = total / count
  return Math.round(Math.min(100, (avgEdge / 15) * 100))
}

export function scoreTotal(detection, imgElement) {
  const centering = scoreCentering(detection, imgElement)
  const size = scoreSize(detection, imgElement)
  const brightness = scoreBrightness(detection, imgElement)
  const sharpness = scoreSharpness(detection, imgElement)
  const total = Math.round(
  centering * 0.30 +
  size * 0.25 +
  brightness * 0.20 +
  sharpness * 0.25
  )
  return { total, centering, size, brightness, sharpness }

}

export function explainWinner(scores) {
  const axes = [ 
    { name: 'centering', value: scores.centering, text: 'the face is well-centered in the frame' },
    { name: 'size', value: scores.size, text: 'the face fills a good portion of the frame' },
    { name: 'brightness', value: scores.brightness, text: 'the lighting is well balanced' },
    { name: 'sharpness', value: scores.sharpness, text: 'the photo is sharp and in focus' }
  ]
  const best = axes.reduce((a,b) => (a.value > b.value ? a : b))
  return `This photo is the best because ${best.text}.`
}
