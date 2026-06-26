import { useState, useEffect, useRef } from 'react'
import UploadZone from './UploadZone'
import { loadModels, detectFace } from './faceDetection'
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const imgRefs = useRef({})

  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true))
  }, [])

  async function handlePhotosSelected(newPhotos) {
    setPhotos(newPhotos)
  }

  async function runDetection() {
    for (const photo of photos) {
      const imgEl = imgRefs.current[photo.name]
      if (!imgEl) continue
      const result = await detectFace(imgEl)
      console.log(photo.name, result)
    }
  }

  return (
    <div>
      <h1>PFP Studio</h1>
      {!modelsLoaded && <p>Loading models...</p>}
      <UploadZone onPhotosSelected={handlePhotosSelected} />
      <div>
        {photos.map((photo) => (
          <img
            key={photo.name}
            src={photo.url}
            width="150"
            alt={photo.name}
            ref={(el) => (imgRefs.current[photo.name] = el)}
          />
        ))}
      </div>
      {photos.length > 0 && modelsLoaded && (
        <button onClick={runDetection}>Detect Faces</button>
      )}
    </div>
  )
}

export default App