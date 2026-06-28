
function UploadZone({ onPhotosSelected }) {
  function handleFileChange(e) {
    const files = Array.from(e.target.files)
    const photos = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    onPhotosSelected(photos)
  }
  return (
    <label className="upload-label">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      Pick Photos
    </label>
  )
}
export default UploadZone