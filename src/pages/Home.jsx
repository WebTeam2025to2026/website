import React, { useState, useEffect } from 'react';

// Enhanced Quiz Component
function QuizGame({ isMobile }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [score, setScore] = useState({ technical: 0, social: 0, competitive: 0, service: 0 });

  const questions = [
    {
      question: "What's your ideal weekend activity?",
      options: [
        { text: "Learning a new skill or technology", type: "technical", icon: "💻" },
        { text: "Hanging out with friends and networking", type: "social", icon: "🎉" },
        { text: "Competing in a tournament or challenge", type: "competitive", icon: "🏆" },
        { text: "Volunteering for a meaningful cause", type: "service", icon: "🤝" }
      ]
    },
    {
      question: "Which environment energizes you most?",
      options: [
        { text: "Quiet library or focused workspace", type: "technical", icon: "📚" },
        { text: "Lively party or social gathering", type: "social", icon: "🎊" },
        { text: "Sports arena or competition venue", type: "competitive", icon: "⚡" },
        { text: "Community center or charity event", type: "service", icon: "🌟" }
      ]
    },
    {
      question: "What motivates you the most?",
      options: [
        { text: "Personal growth and mastering expertise", type: "technical", icon: "📈" },
        { text: "Building meaningful connections", type: "social", icon: "💝" },
        { text: "Winning and achieving ambitious goals", type: "competitive", icon: "🎯" },
        { text: "Making a positive impact on others", type: "service", icon: "🌍" }
      ]
    },
    {
      question: "How do you prefer to spend your time?",
      options: [
        { text: "Working on projects and coding", type: "technical", icon: "⚙️" },
        { text: "Attending social events and meetups", type: "social", icon: "🎭" },
        { text: "Training and improving my skills", type: "competitive", icon: "💪" },
        { text: "Helping others and giving back", type: "service", icon: "❤️" }
      ]
    },
    {
      question: "What's your dream achievement?",
      options: [
        { text: "Creating an innovative solution", type: "technical", icon: "💡" },
        { text: "Building a large network of friends", type: "social", icon: "🌐" },
        { text: "Winning a prestigious competition", type: "competitive", icon: "🥇" },
        { text: "Leading a successful social initiative", type: "service", icon: "🎗️" }
      ]
    }
  ];

  const results = {
    technical: {
      title: "🎯 Technical Innovator",
      description: "You're perfect for our workshops, hackathons, and skill-building seminars! Your analytical mind and passion for learning make you ideal for technical projects.",
      activities: ["Weekly Coding Workshops", "Tech Talks & Seminars", "Hackathons", "Project Collaborations"],
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    social: {
      title: "🎉 Social Butterfly",
      description: "Our networking events, cultural celebrations, and social gatherings are calling your name! You thrive in connecting people and creating vibrant communities.",
      activities: ["Networking Mixers", "Cultural Festivals", "Game Nights", "Social Meetups"],
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    competitive: {
      title: "🏆 Champion Spirit",
      description: "Competitions, sports tournaments, and challenges are where you'll thrive! Your drive to excel and competitive nature will shine in our events.",
      activities: ["Sports Tournaments", "Case Competitions", "Debate Contests", "Gaming Championships"],
      color: "#ffd700",
      gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)"
    },
    service: {
      title: "🌍 Community Hero",
      description: "Volunteering programs and social impact projects are your ideal activities! Your compassion and desire to help others will make a real difference.",
      activities: ["Community Service", "Charity Drives", "Environmental Projects", "Mentorship Programs"],
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  };

  const handleAnswer = (type) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    const newAnswers = [...selectedAnswers, type];
    setSelectedAnswers(newAnswers);

    // Update score
    setScore(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswering(false);
      } else {
        // Calculate result
        const newScore = { ...score, [type]: score[type] + 1 };
        const maxType = Object.keys(newScore).reduce((a, b) => 
          newScore[a] > newScore[b] ? a : b
        );
        setResult(results[maxType]);
        setShowResult(true);
      }
    }, 400);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setResult(null);
    setIsAnswering(false);
    setScore({ technical: 0, social: 0, competitive: 0, service: 0 });
  };

  const quizStyles = {
    quizContainer: {
      maxWidth: '700px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '25px',
      padding: isMobile ? '35px 25px' : '50px 40px',
      boxShadow: '0 25px 70px rgba(106, 13, 173, 0.2)',
      border: '3px solid rgba(106, 13, 173, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    },
    decorativeBg: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '200px',
      height: '200px',
      background: 'linear-gradient(135deg, #6a0dad15, #9d4edd15)',
      borderRadius: '50%',
      zIndex: 0,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
    },
    progressBar: {
      width: '100%',
      height: '10px',
      background: '#e9ecef',
      borderRadius: '15px',
      marginBottom: '35px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #6a0dad, #9d4edd, #c77dff)',
      borderRadius: '15px',
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
      boxShadow: '0 2px 8px rgba(106, 13, 173, 0.4)',
    },
    questionText: {
      fontSize: isMobile ? '1.4rem' : '1.7rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '35px',
      textAlign: 'center',
      lineHeight: '1.4',
    },
    optionsContainer: {
      display: 'grid',
      gap: '18px',
    },
    optionButton: {
      padding: isMobile ? '18px 22px' : '22px 28px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '2px solid rgba(106, 13, 173, 0.2)',
      borderRadius: '18px',
      fontSize: isMobile ? '1.05rem' : '1.15rem',
      color: '#2c3e50',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'left',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    optionIcon: {
      fontSize: '1.8rem',
      flexShrink: 0,
    },
    resultContainer: {
      textAlign: 'center',
    },
    resultIcon: {
      fontSize: '5rem',
      marginBottom: '25px',
      animation: 'bounce 1s ease',
    },
    resultTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: '800',
      marginBottom: '20px',
      background: result?.gradient || 'linear-gradient(45deg, #6a0dad, #9d4edd)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    resultDesc: {
      fontSize: isMobile ? '1.15rem' : '1.25rem',
      color: '#5a6c7d',
      lineHeight: '1.8',
      marginBottom: '30px',
      padding: '0 10px',
    },
    activitiesList: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      padding: isMobile ? '20px' : '25px',
      borderRadius: '15px',
      marginBottom: '35px',
      border: '2px solid rgba(106, 13, 173, 0.1)',
    },
    activitiesTitle: {
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '15px',
      textAlign: 'center',
    },
    activityItem: {
      padding: '10px 15px',
      background: 'white',
      borderRadius: '10px',
      marginBottom: '10px',
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: '#5a6c7d',
      border: '1px solid rgba(106, 13, 173, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    activityBullet: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: result?.gradient || 'linear-gradient(45deg, #6a0dad, #9d4edd)',
      flexShrink: 0,
    },
    resetButton: {
      padding: isMobile ? '14px 35px' : '18px 50px',
      background: 'linear-gradient(135deg, #6a0dad, #9d4edd)',
      color: 'white',
      border: 'none',
      borderRadius: '35px',
      fontSize: isMobile ? '1.05rem' : '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(106, 13, 173, 0.3)',
    },
    questionCounter: {
      textAlign: 'center',
      color: '#6a0dad',
      fontSize: isMobile ? '1rem' : '1.05rem',
      fontWeight: '700',
      marginBottom: '25px',
      letterSpacing: '0.5px',
    }
  };

  if (showResult && result) {
    return (
      <div style={quizStyles.quizContainer}>
        <div style={quizStyles.decorativeBg}></div>
        <div style={quizStyles.contentWrapper}>
          <div style={quizStyles.resultContainer}>
            <div style={quizStyles.resultIcon}>{result.title.split(' ')[0]}</div>
            <h3 style={quizStyles.resultTitle}>{result.title}</h3>
            <p style={quizStyles.resultDesc}>{result.description}</p>
            
            <div style={quizStyles.activitiesList}>
              <div style={quizStyles.activitiesTitle}>Recommended Activities:</div>
              {result.activities.map((activity, index) => (
                <div key={index} style={quizStyles.activityItem}>
                  <div style={quizStyles.activityBullet}></div>
                  {activity}
                </div>
              ))}
            </div>

            <button 
              style={quizStyles.resetButton} 
              onClick={resetQuiz}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(106, 13, 173, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(106, 13, 173, 0.3)';
              }}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={quizStyles.quizContainer}>
      <div style={quizStyles.decorativeBg}></div>
      <div style={quizStyles.contentWrapper}>
        <div style={quizStyles.questionCounter}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div style={quizStyles.progressBar}>
          <div style={quizStyles.progressFill}></div>
        </div>
        <h3 style={quizStyles.questionText}>{questions[currentQuestion].question}</h3>
        <div style={quizStyles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              style={quizStyles.optionButton}
              onClick={() => handleAnswer(option.type)}
              disabled={isAnswering}
              onMouseEnter={(e) => {
                if (!isAnswering) {
                  e.target.style.background = 'linear-gradient(135deg, #6a0dad, #9d4edd)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateX(12px) scale(1.02)';
                  e.target.style.borderColor = '#6a0dad';
                  e.target.style.boxShadow = '0 8px 25px rgba(106, 13, 173, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isAnswering) {
                  e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                  e.target.style.color = '#2c3e50';
                  e.target.style.transform = 'translateX(0) scale(1)';
                  e.target.style.borderColor = 'rgba(106, 13, 173, 0.2)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }
              }}
            >
              <span style={quizStyles.optionIcon}>{option.icon}</span>
              {option.text}
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const bannerImages = [
    {
      src: '/banner1.jpg',
      alt: 'Quizzards Community',
      title: 'Welcome to Quizzards',
      subtitle: 'The Quiz Club of Rajalakshmi Engineering College'
    },
    {
      src: '/banner2.jpg',
      alt: 'Quiz Premier League',
      title: 'Quiz Premier League',
      subtitle: 'Fast-paced Kahoot rounds and analytical written quizzes'
    },
    {
      src: '/banner3.jpg',
      alt: 'Quizocalypse',
      title: 'Quizocalypse',
      subtitle: 'Inter-college competition attracting talent across Tamil Nadu'
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const featureInterval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % 3);
      }, 5000);

      return () => clearInterval(featureInterval);
    }
  }, [isMobile]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <div style={styles.homePage}>
      {/* Hero Banner Slider */}
      <section style={isMobile ? styles.bannerSectionMobile : styles.bannerSection}>
        <div style={styles.sliderContainer}>
          {bannerImages.map((image, index) => (
            <div 
              key={index} 
              style={{
                ...styles.slide,
                transform: `translateX(${(index - currentSlide) * 100}%)`,
                opacity: index === currentSlide ? 1 : 0,
              }}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  style={styles.bannerImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 
                      `linear-gradient(135deg, 
                        ${index === 0 ? '#667eea, #764ba2' : 
                          index === 1 ? '#f093fb, #f5576c' : 
                          '#4facfe, #00f2fe'})`;
                  }}
                />
                <div style={styles.slideOverlay}>
                  <div style={isMobile ? styles.slideContentMobile : styles.slideContent}>
                    <h1 style={isMobile ? styles.slideTitleMobile : styles.slideTitle}>{image.title}</h1>
                    <p style={isMobile ? styles.slideSubtitleMobile : styles.slideSubtitle}>{image.subtitle}</p>
                    <button style={isMobile ? styles.ctaButtonMobile : styles.ctaButton} className="cta-button">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!isMobile && (
            <>
              <button 
                style={{...styles.navArrow, ...styles.prevArrow}} 
                onClick={prevSlide}
                className="nav-arrow"
              >
                ‹
              </button>
              <button 
                style={{...styles.navArrow, ...styles.nextArrow}} 
                onClick={nextSlide}
                className="nav-arrow"
              >
                ›
              </button>
            </>
          )}

          <div style={isMobile ? styles.indicatorsMobile : styles.indicators}>
            {bannerImages.map((_, index) => (
              <button
                key={index}
                style={{
                  ...(isMobile ? styles.indicatorMobile : styles.indicator),
                  ...(currentSlide === index ? styles.activeIndicator : {})
                }}
                onClick={() => goToSlide(index)}
                className="slide-indicator"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section style={isMobile ? styles.welcomeSectionMobile : styles.welcomeSection}>
        <div style={styles.container}>
          <div style={styles.welcomeContent}>
            <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>QUIZZARDS</h2>
            <p style={isMobile ? styles.welcomeTextMobile : styles.welcomeText}>
              Quizzards – The Quiz Club of Rajalakshmi Engineering College is a vibrant platform for inquisitive minds, fostering curiosity, quick thinking, and teamwork.
            </p>
            
            {isMobile ? (
              <div style={styles.featuresAutoContainer}>
                {[0, 1, 2].map((index) => (
                  <div 
                    key={index}
                    style={{
                      ...styles.featureCardMobile,
                      transform: `translateX(${(index - currentFeature) * 100}%)`,
                      opacity: index === currentFeature ? 1 : 0,
                    }} 
                    className="feature-card"
                  >
                    <div style={styles.featureIcon}>
                      {index === 0 ? '🧠' : index === 1 ? '🏆' : '🤝'}
                    </div>
                    <h3 style={styles.featureTitleMobile}>
                      {index === 0 ? 'Curiosity Driven' : index === 1 ? 'Competitive Spirit' : 'Teamwork & Fun'}
                    </h3>
                    <p style={styles.featureDescMobile}>
                      {index === 0 ? 'Fostering inquisitive minds through engaging quiz formats and knowledge challenges.' :
                       index === 1 ? 'From QPL to Quizocalypse, bringing together the best talent across Tamil Nadu.' :
                       'Making learning collaborative and enjoyable through quick thinking and teamwork.'}
                    </p>
                  </div>
                ))}
                
                <div style={styles.featureIndicators}>
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      style={{
                        ...styles.featureIndicator,
                        ...(currentFeature === index ? styles.activeFeatureIndicator : {})
                      }}
                      onClick={() => setCurrentFeature(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div style={styles.featuresGrid}>
                <div style={styles.featureCard} className="feature-card">
                  <div style={styles.featureIcon}>🧠</div>
                  <h3 style={styles.featureTitle}>Curiosity Driven</h3>
                  <p style={styles.featureDesc}>Fostering inquisitive minds through engaging quiz formats and knowledge challenges.</p>
                </div>
                <div style={styles.featureCard} className="feature-card">
                  <div style={styles.featureIcon}>🏆</div>
                  <h3 style={styles.featureTitle}>Competitive Spirit</h3>
                  <p style={styles.featureDesc}>From QPL to Quizocalypse, bringing together the best talent across Tamil Nadu.</p>
                </div>
                <div style={styles.featureCard} className="feature-card">
                  <div style={styles.featureIcon}>🤝</div>
                  <h3 style={styles.featureTitle}>Teamwork & Fun</h3>
                  <p style={styles.featureDesc}>Making learning collaborative and enjoyable through quick thinking and teamwork.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section style={isMobile ? styles.statsSectionMobile : styles.statsSection}>
        <div style={styles.container}>
          <div style={isMobile ? styles.statsGridMobile : styles.statsGrid}>
            <div style={isMobile ? styles.statCardMobile : styles.statCard} className="stat-card">
              <div style={isMobile ? styles.statNumberMobile : styles.statNumber}>500+</div>
              <div style={isMobile ? styles.statLabelMobile : styles.statLabel}>Active Quizzers</div>
            </div>
            <div style={isMobile ? styles.statCardMobile : styles.statCard} className="stat-card">
              <div style={isMobile ? styles.statNumberMobile : styles.statNumber}>50+</div>
              <div style={isMobile ? styles.statLabelMobile : styles.statLabel}>Quiz Events</div>
            </div>
            <div style={isMobile ? styles.statCardMobile : styles.statCard} className="stat-card">
              <div style={isMobile ? styles.statNumberMobile : styles.statNumber}>10+</div>
              <div style={isMobile ? styles.statLabelMobile : styles.statLabel}>Colleges Participated</div>
            </div>
            <div style={isMobile ? styles.statCardMobile : styles.statCard} className="stat-card">
              <div style={isMobile ? styles.statNumberMobile : styles.statNumber}>95%</div>
              <div style={isMobile ? styles.statLabelMobile : styles.statLabel}>Engagement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section style={isMobile ? styles.quizSectionMobile : styles.quizSection}>
        <div style={styles.container}>
          <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Find Your Perfect Quiz Style!</h2>
          <p style={isMobile ? styles.quizSubtitleMobile : styles.quizSubtitle}>
            Take this quick quiz to discover which Quizzards activities match your personality and interests
          </p>
          
          <QuizGame isMobile={isMobile} />
        </div>
      </section>

      {/* CSS Styles for animations */}
      <style>
        {`
          .cta-button {
            transition: all 0.3s ease;
          }
          
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
          }

          .nav-arrow {
            transition: all 0.3s ease;
          }

          .nav-arrow:hover {
            background: rgba(255, 255, 255, 0.9) !important;
            transform: scale(1.1);
          }

          .slide-indicator {
            transition: all 0.3s ease;
          }

          .slide-indicator:hover {
            transform: scale(1.2);
          }

          .feature-card {
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .stat-card {
            transition: all 0.3s ease;
          }

          .stat-card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 35px rgba(106, 13, 173, 0.2);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  homePage: {
    fontFamily: "'Inter', sans-serif",
  },
  
  bannerSection: {
    marginTop: '20px',
    position: 'relative',
    height: '70vh',
    minHeight: '500px',
    maxHeight: '800px',
    overflow: 'hidden',
    width: '100%',
  },
  bannerSectionMobile: {
    marginTop: '5px',
    position: 'relative',
    height: '50vh',
    minHeight: '350px',
    maxHeight: '600px',
    overflow: 'hidden',
    width: '100%',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  slideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContent: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '600px',
    padding: '0 20px',
  },
  slideContentMobile: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '90%',
    padding: '0 15px',
  },
  slideTitle: {
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: '700',
    marginBottom: '20px',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  },
  slideTitleMobile: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '15px',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    lineHeight: '1.3',
  },
  slideSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: '30px',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  slideSubtitleMobile: {
    fontSize: '1rem',
    marginBottom: '20px',
    opacity: 0.9,
    lineHeight: '1.5',
  },
  ctaButton: {
    padding: '15px 35px',
    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
    color: '#333',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
  },
  ctaButtonMobile: {
    padding: '12px 25px',
    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
    color: '#333',
    border: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.3)',
  },

  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevArrow: {
    left: '20px',
  },
  nextArrow: {
    right: '20px',
  },

  indicators: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 10,
  },
  indicatorsMobile: {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
  },
  indicatorMobile: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
  },
  activeIndicator: {
    background: '#ffd700',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },

  welcomeSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  welcomeSectionMobile: {
    padding: '50px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  welcomeContent: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    marginBottom: '30px',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sectionTitleMobile: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2',
  },
  welcomeText: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#5a6c7d',
    marginBottom: '50px',
    maxWidth: '800px',
    margin: '0 auto 50px auto',
  },
  welcomeTextMobile: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#5a6c7d',
    marginBottom: '30px',
    padding: '0 10px',
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '50px',
  },
  
  featuresAutoContainer: {
    marginTop: '30px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '350px',
    margin: '30px auto 0 auto',
    minHeight: '200px',
  },
  
  featureCard: {
    background: 'white',
    padding: '40px 30px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(106, 13, 173, 0.1)',
  },
  featureCardMobile: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'white',
    padding: '25px 20px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(106, 13, 173, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '180px',
    transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  featureTitleMobile: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2c3e50',
  },
  featureDesc: {
    color: '#5a6c7d',
    lineHeight: '1.6',
  },
  featureDescMobile: {
    color: '#5a6c7d',
    lineHeight: '1.5',
    fontSize: '0.9rem',
  },

  featureIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '220px',
  },
  featureIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(106, 13, 173, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeFeatureIndicator: {
    background: '#6a0dad',
    transform: 'scale(1.2)',
  },

  statsSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)',
  },
  statsSectionMobile: {
    padding: '50px 0',
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
  },
  statsGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  statCard: {
    textAlign: 'center',
    color: 'white',
    padding: '30px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  statCardMobile: {
    textAlign: 'center',
    color: 'white',
    padding: '20px 15px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#ffd700',
  },
  statNumberMobile: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#ffd700',
  },
  statLabel: {
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  statLabelMobile: {
    fontSize: '0.9rem',
    opacity: 0.9,
    lineHeight: '1.3',
  },

  quizSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  quizSectionMobile: {
    padding: '50px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
  quizSubtitle: {
    fontSize: '1.2rem',
    color: '#5a6c7d',
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '700px',
    margin: '0 auto 50px auto',
  },
  quizSubtitleMobile: {
    fontSize: '1rem',
    color: '#5a6c7d',
    textAlign: 'center',
    marginBottom: '30px',
    padding: '0 20px',
  },
};