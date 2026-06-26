import { useState, useEffect, useRef } from 'react'
import UploadZone from './UploadZone'
import { loadModels, detectFace } from './faceDetection'
import './App.css'
import { scoreTotal, explainWinner } from './scoring'


function App() {
  const [photos, setPhotos] = useState([])
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const imgRefs = useRef({})
  const [results, setResults] = useState([])

  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true))
  }, [])

  async function handlePhotosSelected(newPhotos) {
    setPhotos(newPhotos)
  }

  async function runDetection() {
    const scored = []
    for (const photo of photos) {
      const imgEl = imgRefs.current[photo.name]
      const detection = await detectFace(imgEl)
      if (!detection) continue
      const scores = scoreTotal(detection, imgEl)
      scored.push({ name: photo.name, url: photo.url, scores })
    }
    scored.sort((a, b) => b.scores.total - a.scores.total)
    scored[0].why = explainWinner(scored[0].scores)  
    setResults(scored)                                 

  }

  return (
    <div>
      <h1>PFP Studio</h1>
      {!modelsLoaded && <p>Loading models...</p>}
      <UploadZone onPhotosSelected={handlePhotosSelected} />
      {photos.length > 0 && modelsLoaded && (
        <button onClick={runDetection}>Rank Photos</button>
      )}
      <div>
        {results.map((r, i) => (
          <div key={r.name}>
            <img src={r.url} width="150" alt={r.name} />
            <p>#{i + 1} — Score: {r.scores.total}</p>
            {i === 0 && r.why && <p>{r.why}</p>}
            <p>Centering: {r.scores.centering} | Size: {r.scores.size} | Brightness: {r.scores.brightness} | Sharpness: {r.scores.sharpness}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'none' }}>
        {photos.map((photo) => (
          <img
            key={photo.name}
            src={photo.url}
            alt={photo.name}
            ref={(el) => (imgRefs.current[photo.name] = el)}
            onLoad={() => { }}
          />
        ))}
      </div>
    </div>
  )
}

export default App 