import { useState, useEffect, useRef } from 'react'
import UploadZone from './UploadZone'
import { loadModels, detectFace } from './faceDetection'
import { scoreTotal, explainWinner } from './scoring'
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [results, setResults] = useState([])
  const imgRefs = useRef({})

  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true))
  }, [])

  async function handlePhotosSelected(newPhotos) {
    setPhotos(newPhotos)
    setResults([])
  }

  async function runDetection() {
    const scored = []
    for (const photo of photos) {
      const imgEl = imgRefs.current[photo.name]
      if (!imgEl) continue
      const detection = await detectFace(imgEl)
      if (!detection) continue
      const scores = scoreTotal(detection, imgEl)
      scored.push({ name: photo.name, url: photo.url, scores })
    }
    scored.sort((a, b) => b.scores.total - a.scores.total)
    if (scored.length > 0) scored[0].why = explainWinner(scored[0].scores)
    setResults(scored)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">PFP <span>Studio</span></h1>
        <p className="app__subtitle">Upload your photos. Find out which one wins.</p>
      </header>

      <div className="upload-area">
        <UploadZone onPhotosSelected={handlePhotosSelected} />
        {!modelsLoaded && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading models...</p>}
        {photos.length > 0 && modelsLoaded && (
          <button className="rank-btn" onClick={runDetection}>
            Rank {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div>
          <p className="results__label">{results.length} photos ranked</p>
          <div className="results__grid">
            {results.map((r, i) => (
              <div key={r.name} className={`photo-card${i === 0 ? ' photo-card--winner' : ''}`}>
                <div className="card__img-wrap">
                  <img className="card__img" src={r.url} alt={r.name} />
                  <span className="card__rank">#{i + 1}</span>
                </div>
                <div className="card__body">
                  <div className="card__score">{r.scores.total}</div>
                  <div className="card__bars">
                    {[
                      { label: 'Centering', val: r.scores.centering },
                      { label: 'Size', val: r.scores.size },
                      { label: 'Brightness', val: r.scores.brightness },
                      { label: 'Sharpness', val: r.scores.sharpness },
                    ].map(({ label, val }) => (
                      <div key={label} className="score-row">
                        <span className="score-row__label">{label}</span>
                        <div className="score-row__track">
                          <div className="score-row__fill" style={{ width: `${val}%` }} />
                        </div>
                        <span className="score-row__num">{val}</span>
                      </div>
                    ))}
                  </div>
                  {i === 0 && r.why && <p className="card__why">{r.why}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="hidden-refs">
        {photos.map((photo) => (
          <img
            key={photo.name}
            src={photo.url}
            alt={photo.name}
            ref={(el) => (imgRefs.current[photo.name] = el)}
          />
        ))}
      </div>
    </div>
  )
}

export default App