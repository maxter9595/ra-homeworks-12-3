import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  fetchNewsRequest,
  fetchMoreNewsRequest
} from '../store/actions/newsActions';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { items, loading, loadingMore, hasMore } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchNewsRequest());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchMoreNewsRequest());
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return format(date, 'd MMMM HH:mm', { locale: ru });
  };

  const getBestImage = (sizes) => {
    if (!sizes) return null;
    
    const sorted = [...sizes].sort((a, b) => b.width - a.width);
    return sorted[0]?.url;
  };

  const renderAttachments = (attachments) => {
    if (!attachments) return null;
    
    return attachments.map((attachment, index) => {
      switch (attachment.type) {
        case 'photo':
          const photoUrl = getBestImage(attachment.photo.sizes);
          return photoUrl && (
            <div key={`photo-${index}`} className="attachment photo">
              <img src={photoUrl} alt="Post" className="post-image" />
            </div>
          );
        
        case 'video':
          const videoThumb = getBestImage(attachment.video.image);
          return videoThumb && (
            <div key={`video-${index}`} className="attachment video">
              <img src={videoThumb} alt="Video" className="post-image" />
              <div className="video-overlay">
                <svg viewBox="0 0 24 24" className="play-icon">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          );
        
        case 'link':
          const linkPhoto = attachment.link.photo && getBestImage(attachment.link.photo.sizes);
          return (
            <div key={`link-${index}`} className="attachment link">
              {linkPhoto && <img src={linkPhoto} alt="Link" className="link-image" />}
              <div className="link-content">
                <div className="link-title">{attachment.link.title}</div>
                <div className="link-description">{attachment.link.description}</div>
                <div className="link-domain">{attachment.link.caption || new URL(attachment.link.url).hostname}</div>
              </div>
            </div>
          );
        
        default:
          return null;
      }
    });
  };

  return (
    <div className="news-feed">
      <div className="header">
        <h1>Новости</h1>
      </div>
      
      <div className="news-list">
        {items.map((item) => (
          <div key={item.id} className="news-card">
            <div className="card-header">
              <div className="avatar">
                <img 
                  src="https://mir-s3-cdn-cf.behance.net/user/276/b552f127726926.5f59d52a5fbca.png" 
                  alt="Avatar" 
                  className="avatar-image"
                />
              </div>
              <div className="header-content">
                <div className="group-name">Нетология</div>
                <div className="post-date">{formatDate(item.date)}</div>
              </div>
            </div>
            
            <div className="post-content">
              <p>{item.text}</p>
              {item.attachments && (
                <div className="attachments">
                  {renderAttachments(item.attachments)}
                </div>
              )}
            </div>
            
            <div className="post-stats">
              <div className="stat-item">
                <svg viewBox="0 0 24 24" className="stat-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{item.likes?.count || 0}</span>
              </div>
              
              <div className="stat-item">
                <svg viewBox="0 0 24 24" className="stat-icon">
                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                </svg>
                <span>{item.comments?.count || 0}</span>
              </div>
              
              <div className="stat-item">
                <svg viewBox="0 0 24 24" className="stat-icon">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                <span>{item.reposts?.count || 0}</span>
              </div>
              
              <div className="stat-item">
                <svg viewBox="0 0 24 24" className="stat-icon">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
                <span>{item.views?.count || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      )}
      
      {!loading && hasMore && !loadingMore && (
        <button 
          onClick={handleLoadMore}
          className="load-more-btn"
        >
          Показать ещё
        </button>
      )}
      
      {loadingMore && (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
