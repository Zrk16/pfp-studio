const RINGS = [
  { name: 'front', radius: 145, slots: 5 },
  { name: 'mid', radius: 230, slots: 8 },
  { name: 'back', radius: 312, slots: 11 },
]

const PH = [
  'linear-gradient(135deg, #FFD6C4, #FFB088)',
  'linear-gradient(135deg, #C8EEDD, #9BE0C0)',
  'linear-gradient(135deg, #FDEEC4, #F6D98A)',
  'linear-gradient(135deg, #D8CFFA, #B9A8F0)',
  'linear-gradient(135deg, #C6E8FA, #9AD4F0)',
]

function PhotoOrbs({ photos, onRank, modelsLoaded, isRanking }) {
  const queue = [...photos]
  let phCount = 0

  const buildItems = (ring) => {
    const items = []
    for (let i = 0; i < ring.slots; i++) {
      const angle = (360 / ring.slots) * i
      const rad = (angle * Math.PI) / 180
      const x = Math.round(ring.radius * Math.sin(rad))
      const y = Math.round(-ring.radius * Math.cos(rad))
      // back ring is decorative; front + mid pull real photos until they run out
      const photo = ring.name === 'back' ? null : queue.shift()
      items.push({ photo, x, y, key: `${ring.name}-${i}`, ph: phCount++ })
    }
    return items
  }

  return (
    <div className="orbs-stage">
      <div className={`orbs-rings${isRanking ? ' orbs-rings--ranking' : ''}`}>
        {RINGS.map((ring) => (
          <div key={ring.name} className={`ring ring--${ring.name}`}>
            {buildItems(ring).map((it) => (
              <div
                key={it.key}
                className="ring__item"
                style={{ left: `calc(50% + ${it.x}px)`, top: `calc(50% + ${it.y}px)` }}
              >
                {it.photo ? (
                  <div className="ring__counter">
                    <img src={it.photo.url} alt={it.photo.name} className="ring__img" />
                  </div>
                ) : (
                  <div
                    className="ring__counter ring__counter--ph"
                    style={{ background: PH[it.ph % PH.length] }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="orbs-center">
        <button
          className="rank-btn rank-btn--lg"
          onClick={onRank}
          disabled={!modelsLoaded || isRanking}
        >
          {isRanking ? (
            <>
              <span className="spinner" />
              Ranking...
            </>
          ) : modelsLoaded ? (
            `Rank ${photos.length} photos →`
          ) : (
            'Loading...'
          )}
        </button>
      </div>
    </div>
  )
}

export default PhotoOrbs
