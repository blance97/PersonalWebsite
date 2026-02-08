import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import styles from './PhotosPage.module.css';

export default function PhotosPage() {
  const { content } = useContent();
  const photos = content.photos;
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const selectedPhotoData = photos.find((p) => p.id === selectedPhoto);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Photos</h1>
        <p className={styles.subtitle}>Moments captured along the way</p>

        <div className={styles.grid}>
          {photos.map((photo) => (
            <article
              key={photo.id}
              className={styles.card}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className={styles.cardImage}>
                <img src={photo.url} alt={photo.title} loading="lazy" />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.photoTitle}>{photo.title}</h2>
                {photo.caption && (
                  <p className={styles.caption}>{photo.caption}</p>
                )}
                {photo.createdAt && (
                  <span className={styles.date}>{formatDate(photo.createdAt)}</span>
                )}
              </div>
            </article>
          ))}
        </div>

        {photos.length === 0 && (
          <div className={styles.empty}>
            <p>No photos to display.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && selectedPhotoData && (
        <div className={styles.lightbox} onClick={() => setSelectedPhoto(null)}>
          <button
            className={styles.closeButton}
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhotoData.url}
              alt={selectedPhotoData.title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxInfo}>
              <h3 className={styles.lightboxTitle}>{selectedPhotoData.title}</h3>
              {selectedPhotoData.caption && (
                <p className={styles.lightboxCaption}>{selectedPhotoData.caption}</p>
              )}
              {selectedPhotoData.createdAt && (
                <span className={styles.lightboxDate}>
                  {formatDate(selectedPhotoData.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
