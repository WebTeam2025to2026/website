import React, { useEffect, useState, useRef } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef([]);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate Firebase data
    const mockImages = [
      { id: '1', imgURL: 'https://picsum.photos/400/300?random=1', Event: 'Core Team Meeting', createdAt: { seconds: Date.now() / 1000 } },
      { id: '2', imgURL: 'https://picsum.photos/400/300?random=2', Event: 'QPL Season 1 Finals', createdAt: { seconds: Date.now() / 1000 } },
      { id: '3', imgURL: 'https://picsum.photos/400/300?random=3', Event: 'Team Building', createdAt: { seconds: Date.now() / 1000 } },
      { id: '4', imgURL: 'https://picsum.photos/400/300?random=4', Event: 'QPL Season 2 Opening', createdAt: { seconds: Date.now() / 1000 } },
      { id: '5', imgURL: 'https://picsum.photos/400/300?random=5', Event: 'Core Members Photo', createdAt: { seconds: Date.now() / 1000 } },
      { id: '6', imgURL: 'https://picsum.photos/400/300?random=6', Event: 'Season 1 Awards', createdAt: { seconds: Date.now() / 1000 } },
    ];
    setImages(mockImages);
  }, []);

  // Gallery segments configuration
  const segments = [
    {
      id: 'core-members',
      title: 'Core Members',
      description: 'Meet our dedicated team members who make it all happen',
      icon: '👥',
      color: '#6a0dad',
      gradient: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)'
    },
    {
      id: 'qpl-season1',
      title: 'QPL Season 1',
      description: 'Highlights from our first Quiz Premier League season',
      icon: '🏆',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'qpl-season2',
      title: 'QPL Season 2',
      description: 'Epic moments from the second season of competitions',
      icon: '🎯',
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.1, rootMargin: '-50px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  // Function to categorize images based on Event field
  const categorizeImages = () => {
    const categorized = {
      'core-members': [],
      'qpl-season1': [],
      'qpl-season2': []
    };

    images.forEach(img => {
      const event = (img.Event || '').toLowerCase();
      
      if (event.includes('core') || event.includes('member') || event.includes('team')) {
        categorized['core-members'].push(img);
      } else if (event.includes('qpl') || event.includes('season 1') || event.includes('s1')) {
        categorized['qpl-season1'].push(img);
      } else if (event.includes('season 2') || event.includes('s2')) {
        categorized['qpl-season2'].push(img);
      } else {
        // Default assignment - distribute evenly
        const keys = Object.keys(categorized);
        const minKey = keys.reduce((a, b) => 
          categorized[a].length < categorized[b].length ? a : b
        );
        categorized[minKey].push(img);
      }
    });

    // Limit each category to 6 images
    Object.keys(categorized).forEach(key => {
      categorized[key] = categorized[key].slice(0, 6);
    });

    return categorized;
  };

  const categorizedImages = categorizeImages();

  const filteredImages = activeCategory === 'all' 
    ? images 
    : categorizedImages[activeCategory] || [];

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentImages = activeCategory === 'all' ? images : filteredImages;
    const currentIndex = currentImages.findIndex(img => img.id === selectedImage.id);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % currentImages.length;
      setSelectedImage(currentImages[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      setSelectedImage(currentImages[prevIndex]);
    }
  };

  return (
    <div style={styles.galleryPage}>
      {/* Hero Header */}
      <div style={isMobile ? styles.heroSectionMobile : styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <h1 style={isMobile ? styles.heroTitleMobile : styles.heroTitle}>
              <span style={styles.titleIcon}>📸</span>
              Our Gallery
            </h1>
            <p style={isMobile ? styles.heroSubtitleMobile : styles.heroSubtitle}>
              Capturing moments, creating memories, and celebrating our journey together
            </p>
            <div style={isMobile ? styles.heroStatsMobile : styles.heroStats}>
              <div style={styles.statItem}>
                <span style={isMobile ? styles.statNumberMobile : styles.statNumber}>{images.length}</span>
                <span style={isMobile ? styles.statLabelMobile : styles.statLabel}>Total Photos</span>
              </div>
              <div style={styles.statItem}>
                <span style={isMobile ? styles.statNumberMobile : styles.statNumber}>{segments.length}</span>
                <span style={isMobile ? styles.statLabelMobile : styles.statLabel}>Categories</span>
              </div>
              <div style={styles.statItem}>
                <span style={isMobile ? styles.statNumberMobile : styles.statNumber}>2024</span>
                <span style={isMobile ? styles.statLabelMobile : styles.statLabel}>Latest Year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={isMobile ? styles.filterSectionMobile : styles.filterSection}>
        <div style={styles.container}>
          <div style={isMobile ? styles.filterButtonsMobile : styles.filterButtons}>
            <button
              style={{
                ...(isMobile ? styles.filterButtonMobile : styles.filterButton),
                ...(activeCategory === 'all' ? (isMobile ? styles.activeFilterMobile : styles.activeFilter) : {})
              }}
              onClick={() => setActiveCategory('all')}
              className="filter-btn"
            >
              <span style={styles.filterIcon}>🖼️</span>
              <span>{isMobile ? 'All' : 'All Photos'} ({images.length})</span>
            </button>
            {segments.map((segment) => (
              <button
                key={segment.id}
                style={{
                  ...(isMobile ? styles.filterButtonMobile : styles.filterButton),
                  ...(activeCategory === segment.id ? {
                    ...(isMobile ? styles.activeFilterMobile : styles.activeFilter),
                    background: segment.gradient,
                    color: 'white'
                  } : {})
                }}
                onClick={() => setActiveCategory(segment.id)}
                className="filter-btn"
              >
                <span style={styles.filterIcon}>{segment.icon}</span>
                <span>{isMobile ? segment.title.replace('QPL ', '') : segment.title} ({categorizedImages[segment.id]?.length || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div style={isMobile ? styles.galleryContentMobile : styles.galleryContent}>
        <div style={styles.container}>
          {activeCategory === 'all' ? (
            // Show all segments when 'all' is selected
            segments.map((segment, segmentIndex) => (
              <div 
                key={segment.id}
                ref={el => sectionRefs.current[segmentIndex] = el}
                style={{
                  ...(isMobile ? styles.segmentSectionMobile : styles.segmentSection),
                  ...(visibleSections.has(segmentIndex) ? styles.fadeInUp : styles.fadeOut)
                }}
              >
                <div style={isMobile ? styles.segmentHeaderMobile : styles.segmentHeader}>
                  <div style={isMobile ? styles.segmentTitleContainerMobile : styles.segmentTitleContainer}>
                    <div 
                      style={{
                        ...(isMobile ? styles.segmentIconMobile : styles.segmentIcon),
                        background: segment.gradient
                      }}
                    >
                      {segment.icon}
                    </div>
                    <div style={styles.segmentTextContainer}>
                      <h2 style={isMobile ? styles.segmentTitleMobile : styles.segmentTitle}>{segment.title}</h2>
                      <p style={isMobile ? styles.segmentDescriptionMobile : styles.segmentDescription}>{segment.description}</p>
                    </div>
                  </div>
                  <div style={isMobile ? styles.segmentCountMobile : styles.segmentCount}>
                    {categorizedImages[segment.id]?.length || 0} Photos
                  </div>
                </div>

                <div style={isMobile ? styles.imageGridMobile : styles.imageGrid}>
                  {categorizedImages[segment.id]?.map((img, index) => (
                    <div
                      key={img.id}
                      style={{
                        ...(isMobile ? styles.imageCardMobile : styles.imageCard),
                        animationDelay: `${index * 0.1}s`
                      }}
                      className="image-card"
                      onClick={() => openLightbox(img)}
                    >
                      <div style={isMobile ? styles.imageContainerMobile : styles.imageContainer}>
                        <img
                          src={img.imgURL?.trim()}
                          alt={img.Event || "Gallery Image"}
                          style={styles.image}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDEwMEwxMDAgMTI1TDc1IDEwMEwxMDAgNzVaIiBmaWxsPSIjY2NjY2NjIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjEyIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
                          }}
                        />
                        <div style={styles.imageOverlay} className="image-overlay">
                          <div style={styles.overlayContent}>
                            <div style={isMobile ? styles.zoomIconMobile : styles.zoomIcon}>🔍</div>
                            <div style={isMobile ? styles.imageTitleMobile : styles.imageTitle}>{img.Event || "View Image"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty slots if less than 6 images - only show on desktop or when there are few images */}
                  {(!isMobile || categorizedImages[segment.id]?.length < 2) && 
                    Array.from({ length: Math.max(0, (isMobile ? 2 : 6) - (categorizedImages[segment.id]?.length || 0)) }).map((_, index) => (
                      <div key={`empty-${index}`} style={isMobile ? styles.emptySlotMobile : styles.emptySlot} className="empty-slot">
                        <div style={styles.emptyContent}>
                          <div style={isMobile ? styles.emptyIconMobile : styles.emptyIcon}>📷</div>
                          <div style={isMobile ? styles.emptyTextMobile : styles.emptyText}>Coming Soon</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          ) : (
            // Show single category
            <div style={isMobile ? styles.singleCategoryGridMobile : styles.singleCategoryGrid}>
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  style={{
                    ...(isMobile ? styles.imageCardMobile : styles.imageCard),
                    animationDelay: `${index * 0.1}s`
                  }}
                  className="image-card"
                  onClick={() => openLightbox(img)}
                >
                  <div style={isMobile ? styles.imageContainerMobile : styles.imageContainer}>
                    <img
                      src={img.imgURL?.trim()}
                      alt={img.Event || "Gallery Image"}
                      style={styles.image}
                      loading="lazy"
                    />
                    <div style={styles.imageOverlay} className="image-overlay">
                      <div style={styles.overlayContent}>
                        <div style={isMobile ? styles.zoomIconMobile : styles.zoomIcon}>🔍</div>
                        <div style={isMobile ? styles.imageTitleMobile : styles.imageTitle}>{img.Event || "View Image"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.lightbox} className="lightbox" onClick={closeLightbox}>
          <div style={isMobile ? styles.lightboxContentMobile : styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button style={isMobile ? styles.closeButtonMobile : styles.closeButton} onClick={closeLightbox}>×</button>
            
            {!isMobile && (
              <>
                <button 
                  style={{...styles.navButton, ...styles.prevButton}} 
                  onClick={() => navigateImage('prev')}
                  className="nav-button"
                >
                  ‹
                </button>
                
                <button 
                  style={{...styles.navButton, ...styles.nextButton}} 
                  onClick={() => navigateImage('next')}
                  className="nav-button"
                >
                  ›
                </button>
              </>
            )}
            
            <img
              src={selectedImage.imgURL?.trim()}
              alt={selectedImage.Event || "Gallery Image"}
              style={isMobile ? styles.lightboxImageMobile : styles.lightboxImage}
            />
            
            <div style={isMobile ? styles.lightboxInfoMobile : styles.lightboxInfo}>
              <h3 style={isMobile ? styles.lightboxTitleMobile : styles.lightboxTitle}>{selectedImage.Event || "Gallery Image"}</h3>
              <p style={isMobile ? styles.lightboxDateMobile : styles.lightboxDate}>
                {selectedImage.createdAt ? 
                  new Date(selectedImage.createdAt.seconds * 1000).toLocaleDateString() : 
                  "Date not available"
                }
              </p>
              {isMobile && (
                <div style={styles.mobileNavButtons}>
                  <button 
                    style={styles.mobileNavButton}
                    onClick={() => navigateImage('prev')}
                  >
                    ← Previous
                  </button>
                  <button 
                    style={styles.mobileNavButton}
                    onClick={() => navigateImage('next')}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div style={isMobile ? styles.emptyStateMobile : styles.emptyState}>
          <div style={isMobile ? styles.emptyStateIconMobile : styles.emptyStateIcon}>📸</div>
          <h3 style={isMobile ? styles.emptyStateTitleMobile : styles.emptyStateTitle}>No Images Yet</h3>
          <p style={isMobile ? styles.emptyStateTextMobile : styles.emptyStateText}>
            Our gallery is being prepared. Check back soon for amazing photos!
          </p>
        </div>
      )}

      {/* Enhanced CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .filter-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .filter-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(106, 13, 173, 0.2);
          }

          .image-card {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
            transition: all 0.3s ease;
          }

          .image-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          }

          .image-overlay {
            opacity: 0;
            transition: all 0.3s ease;
          }

          .image-card:hover .image-overlay {
            opacity: 1;
          }

          .empty-slot {
            transition: all 0.3s ease;
            animation: fadeInUp 0.6s ease forwards;
          }

          .empty-slot:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .lightbox {
            animation: fadeInUp 0.3s ease;
          }

          .nav-button {
            transition: all 0.3s ease;
          }

          .nav-button:hover {
            background: rgba(255, 255, 255, 0.9) !important;
            transform: scale(1.1);
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .image-card:hover {
              transform: none;
            }
            
            .image-overlay {
              opacity: 0;
            }
            
            .filter-btn:hover {
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  galleryPage: {
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },

  // Hero Section
  heroSection: {
    background:"white",
    color: '#a020f0',
    padding: '80px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroSectionMobile: {
    background:"white",
    color: '#a020f0',
    padding: '50px 0 40px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  heroTitleMobile: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    lineHeight: '1.2',
  },
  titleIcon: {
    fontSize: '3rem',
    animation: 'scaleIn 1s ease',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.9,
    lineHeight: '1.6',
    fontWeight: '300',
    marginBottom: '40px',
  },
  heroSubtitleMobile: {
    fontSize: '1rem',
    opacity: 0.9,
    lineHeight: '1.5',
    fontWeight: '300',
    marginBottom: '30px',
    padding: '0 10px',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap',
    marginTop: '40px',
  },
  heroStatsMobile: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '25px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    display: 'block',
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#ffd700',
    marginBottom: '5px',
  },
  statNumberMobile: {
    display: 'block',
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#ffd700',
    marginBottom: '3px',
  },
  statLabel: {
    fontSize: '1rem',
    opacity: 0.8,
    fontWeight: '500',
  },
  statLabelMobile: {
    fontSize: '0.8rem',
    opacity: 0.8,
    fontWeight: '500',
    lineHeight: '1.2',
  },

  // Filter Section
  filterSection: {
    padding: '40px 0',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  filterSectionMobile: {
    padding: '25px 0',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  filterButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  filterButtonsMobile: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 25px',
    background: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#5a6c7d',
    whiteSpace: 'nowrap',
  },
  filterButtonMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 6px',
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '15px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#5a6c7d',
    flex: 1,
    minWidth: 0,
    textAlign: 'center',
  },
  activeFilter: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 8px 25px rgba(106, 13, 173, 0.3)',
  },
  activeFilterMobile: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 4px 15px rgba(106, 13, 173, 0.3)',
  },
  filterIcon: {
    fontSize: '16px',
  },

  // Gallery Content
  galleryContent: {
    padding: '60px 0',
  },
  galleryContentMobile: {
    padding: '30px 0',
  },

  // Segment Styles
  segmentSection: {
    marginBottom: '80px',
    transition: 'all 0.6s ease',
  },
  segmentSectionMobile: {
    marginBottom: '50px',
    transition: 'all 0.6s ease',
  },
  segmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  segmentHeaderMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '25px',
    gap: '15px',
  },
  segmentTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  segmentTitleContainerMobile: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
  },
  segmentTextContainer: {
    flex: 1,
  },
  segmentIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    flexShrink: 0,
  },
  segmentIconMobile: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'white',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    flexShrink: 0,
  },
  segmentTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  segmentTitleMobile: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '5px',
    lineHeight: '1.3',
  },
  segmentDescription: {
    fontSize: '1.1rem',
    color: '#5a6c7d',
    fontWeight: '300',
  },
  segmentDescriptionMobile: {
    fontSize: '0.9rem',
    color: '#5a6c7d',
    fontWeight: '300',
    lineHeight: '1.4',
  },
  segmentCount: {
    background: 'rgba(106, 13, 173, 0.1)',
    color: '#6a0dad',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  segmentCountMobile: {
    background: 'rgba(106, 13, 173, 0.1)',
    color: '#6a0dad',
    padding: '8px 15px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },

  // Image Grid
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
  },
  imageGridMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  singleCategoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
  },
  singleCategoryGridMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },

  // Image Card
  imageCard: {
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'white',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
  },
  imageCardMobile: {
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'white',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '75%', // 4:3 aspect ratio
    overflow: 'hidden',
  },
  imageContainerMobile: {
    position: 'relative',
    width: '100%',
    paddingBottom: '75%', // 4:3 aspect ratio
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    textAlign: 'center',
    color: 'white',
  },
  zoomIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  zoomIconMobile: {
    fontSize: '1.5rem',
    marginBottom: '8px',
  },
  imageTitle: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  imageTitleMobile: {
    fontSize: '0.8rem',
    fontWeight: '600',
    lineHeight: '1.2',
  },

  // Empty Slot
  emptySlot: {
    borderRadius: '20px',
    border: '2px dashed #dee2e6',
    background: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    opacity: 0,
  },
  emptySlotMobile: {
    borderRadius: '15px',
    border: '2px dashed #dee2e6',
    background: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
    opacity: 0,
  },
  emptyContent: {
    textAlign: 'center',
    color: '#adb5bd',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  emptyIconMobile: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  emptyTextMobile: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },

  // Lightbox
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    background: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
  },
  lightboxContentMobile: {
    position: 'relative',
    maxWidth: '95vw',
    maxHeight: '90vh',
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    margin: '10px',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonMobile: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: { left: '15px' },
  nextButton: { right: '15px' },
  lightboxImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 'calc(90vh - 100px)',
    objectFit: 'contain',
  },
  lightboxImageMobile: {
    width: '100%',
    height: 'auto',
    maxHeight: 'calc(90vh - 120px)',
    objectFit: 'contain',
  },
  lightboxInfo: {
    padding: '20px',
    background: 'white',
  },
  lightboxInfoMobile: {
    padding: '15px',
    background: 'white',
  },
  lightboxTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#2c3e50',
  },
  lightboxTitleMobile: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  lightboxDate: {
    fontSize: '1rem',
    color: '#5a6c7d',
    margin: 0,
  },
  lightboxDateMobile: {
    fontSize: '0.9rem',
    color: '#5a6c7d',
    margin: '0 0 15px 0',
  },
  mobileNavButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  mobileNavButton: {
    flex: 1,
    padding: '10px 15px',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Animation States
  fadeInUp: {
    animation: 'fadeInUp 0.8s ease forwards',
  },
  fadeOut: {
    opacity: 0,
    transform: 'translateY(30px)',
  },

  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#5a6c7d',
  },
  emptyStateMobile: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#5a6c7d',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '30px',
  },
  emptyStateIconMobile: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  emptyStateTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  emptyStateTitleMobile: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  emptyStateText: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto',
  },
  emptyStateTextMobile: {
    fontSize: '1rem',
    lineHeight: '1.5',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '0 10px',
  },
};