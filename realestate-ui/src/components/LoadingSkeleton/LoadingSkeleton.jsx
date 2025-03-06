import './loadingSkeleton.scss';

function LoadingSkeleton() {
  return (
    <div className='skeleton-list'>
      {Array(6).fill().map((_, index) => (
        <div className='card-skeleton' key={index}>
          <div className='imageContainer'></div>
          <div className='textContainer'>
            <div className='skeleton-title'></div>
            <div className='skeleton-address'>
              <div className='skeleton-icon'></div>
              <div className='skeleton-text'></div>
            </div>
            <div className='skeleton-price'></div>
            <div className='bottom'>
              <div className='features'>
                <div className='skeleton-feature'></div>
                <div className='skeleton-feature'></div>
              </div>
              <div className='icons'>
                <div className='skeleton-icon'></div>
                <div className='skeleton-icon'></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
