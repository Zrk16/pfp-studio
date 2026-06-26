function UploadZone({ onPhotosSelected }) {
    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const photos = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        onPhotosSelected(photos);
    }

    return (
        <div>
            <label>
                <input
                    type="file"
                    accept="image/*, .png .jpeg, .jpg"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <span style={{ padding: '10px 20px', background: '#444', color: 'white', borderRadius: '8px' }}>Pick Photos</span>
            </label>
        </div>
    )
}

export default UploadZone;