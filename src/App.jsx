import { useState } from 'react';
import UploadZone from './UploadZone';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  return (
    <div>
      <h1>PFP-Studio</h1>
      <UploadZone onPhotosSelected={setPhotos} />
      <div>
        {photos.map((photo) => (
          <img key={photo.name} src={photo.url} width="150" alt={photo.name} />
        ))}
      </div>
    </div>
  );
}

export default App;