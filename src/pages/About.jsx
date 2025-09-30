import React, { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeTab, setActiveTab] = useState('mission');
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

  const teamMembers = [
    {
      name: 'Jeeva Priya',
      role: 'President',
      image: '/team/jeeva.jpg',
      bio: 'AIDS student passionate about organizing quiz events and building inclusive communities in Rajalakshmi Engineering College.',
      skills: ['Leadership', 'Event Planning', 'Quiz Organization'],
      social: { linkedin: '#', instagram: '#' }
    },
    {
      name: 'Vice President',
      role: 'Vice President',
      image: '/team/vp.jpg',
      bio: 'Dedicated team member supporting quiz events and student engagement across departments.',
      skills: ['Marketing', 'Strategy', 'Coordination'],
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Secretary',
      role: 'Secretary',
      image: '/team/secretary.jpg',
      bio: 'Engineering student focused on organizing QPL events and inter-college quiz competitions.',
      skills: ['Organization', 'Communication', 'Documentation'],
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Treasurer',
      role: 'Treasurer',
      image: '/team/treasurer.jpg',
      bio: 'Managing club finances and ensuring sustainable growth for quiz events and competitions.',
      skills: ['Finance', 'Analytics', 'Planning'],
      social: { linkedin: '#', instagram: '#' }
    },
    {
      name: 'Events Coordinator',
      role: 'Events Coordinator',
      image: '/team/events.jpg',
      bio: 'Creative student bringing innovation and excitement to QPL and Quizocalypse events.',
      skills: ['Event Management', 'Creativity', 'Coordination'],
      social: { instagram: '#', twitter: '#' }
    },
    {
      name: 'Tech Lead',
      role: 'Tech Lead',
      image: '/team/tech.jpg',
      bio: 'Managing digital platforms for Kahoot rounds and online quiz competitions.',
      skills: ['Web Development', 'Digital Platforms', 'Technical Support'],
      social: { github: '#', linkedin: '#' }
    }
  ];

  const achievements = [
    {
      year: '2025',
      title: 'QPL Season 2 Success',
      description: 'Successfully organized Quiz Premier League with 485+ participants across multiple phases',
      icon: '🏆'
    },
    {
      year: '2025',
      title: 'Quizocalypse Inter-College Event',
      description: 'Hosted prestigious quiz competition with 75 teams from various parts of Tamil Nadu',
      icon: '🎯'
    },
    {
      year: '2025',
      title: 'IIT Madras Participation',
      description: 'Attracted top-tier institutions with IIT Madras teams winning 1st and 2nd place',
      icon: '🥇'
    },
    {
      year: '2025',
      title: 'Grand Quiz Master Recognition',
      description: 'Events conducted by renowned Grand Quiz Master Mr. Abhishek Bharathkumar',
      icon: '🎪'
    }
  ];

  const values = [
    {
      icon: '🧠',
      title: 'Knowledge Excellence',
      description: 'We foster a culture of continuous learning and intellectual curiosity through engaging quiz competitions and educational events.'
    },
    {
      icon: '🤝',
      title: 'Interdepartmental Unity',
      description: 'We bring together students from all departments of REC, creating mixed teams that promote collaboration across disciplines.'
    },
    {
      icon: '🎯',
      title: 'Competitive Spirit',
      description: 'We maintain healthy competition through structured formats like QPL that challenge participants at multiple levels.'
    },
    {
      icon: '🌟',
      title: 'Event Excellence',
      description: 'We strive for quality in organizing both internal QPL events and inter-college competitions like Quizocalypse.'
    },
    {
      icon: '🚀',
      title: 'Innovation in Quizzing',
      description: 'We embrace modern formats combining Kahoot technology with traditional written rounds for comprehensive evaluation.'
    },
    {
      icon: '🏛️',
      title: 'Institutional Pride',
      description: 'We represent Rajalakshmi Engineering College with excellence, attracting participation from premier institutions across Tamil Nadu.'
    }
  ];

  const milestones = [
    { year: '2024', event: 'Club Established', description: 'Quizzards founded as the official Quiz Club of REC' },
    { year: '2025', event: 'QPL Season 2 Launch', description: 'Launched comprehensive Quiz Premier League format' },
    { year: '2025', event: 'Phase 1 Success', description: '220 students participated in inaugural phase' },
    { year: '2025', event: 'Phase 2 Achievement', description: '163 participants across multiple departments' },
    { year: '2025', event: 'Phase 3 Record', description: 'Record-breaking 485 participants from diverse disciplines' },
    { year: '2025', event: 'Quizocalypse Debut', description: 'First inter-college event with 75 teams statewide' }
  ];

  const tabContent = {
    mission: {
      title: 'Our Mission',
      content: 'To create a vibrant quiz community at Rajalakshmi Engineering College where students from all departments can showcase their knowledge, engage in healthy competition, and develop critical thinking skills through our signature events - Quiz Premier League (QPL) for REC students and Quizocalypse for inter-college participation.'
    },
    vision: {
      title: 'Our Vision',
      content: 'To establish Quizzards as the premier quiz club that brings together brilliant minds from across Tamil Nadu, fostering intellectual excellence and making REC a recognized hub for competitive quizzing, while nurturing the next generation of quiz enthusiasts and knowledge champions.'
    },
    values: {
      title: 'Our Values',
      content: 'We are guided by principles of intellectual curiosity, fair competition, interdepartmental collaboration, and academic excellence. These values shape our events and create an inclusive environment for all quiz enthusiasts.'
    }
  };

  return (
    <div style={styles.aboutPage}>
      {/* Hero Section - Hidden on Mobile */}
      {!isMobile && (
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              <span style={styles.heroIcon}>🧠</span>
              About Quizzards
            </h1>
            <p style={styles.heroSubtitle}>
              The Quiz Club of Rajalakshmi Engineering College - Building minds, creating champions since 2024
            </p>
            <div style={styles.heroStats}>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>485+</span>
                <span style={styles.statLabel}>QPL Participants</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>75</span>
                <span style={styles.statLabel}>Teams in Quizocalypse</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>2</span>
                <span style={styles.statLabel}>Major Events</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>10+</span>
                <span style={styles.statLabel}>Departments</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission, Vision, Values Tabs */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        style={{
          ...(isMobile ? styles.mvvSectionMobile : styles.mvvSection),
          ...(visibleSections.has(0) ? styles.fadeInUp : styles.fadeOut)
        }}
      >
        <div style={styles.container}>
          <div style={isMobile ? styles.tabContainerMobile : styles.tabContainer}>
            <div style={isMobile ? styles.tabButtonsMobile : styles.tabButtons}>
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  style={{
                    ...(isMobile ? styles.tabButtonMobile : styles.tabButton),
                    ...(activeTab === tab ? (isMobile ? styles.activeTabMobile : styles.activeTab) : {})
                  }}
                  onClick={() => setActiveTab(tab)}
                  className="tab-button"
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
            <div style={isMobile ? styles.tabContentContainerMobile : styles.tabContentContainer}>
              <h3 style={isMobile ? styles.tabTitleMobile : styles.tabTitle}>{tabContent[activeTab].title}</h3>
              <p style={isMobile ? styles.tabTextMobile : styles.tabText}>{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        style={{
          ...(isMobile ? styles.storySectionMobile : styles.storySection),
          ...(visibleSections.has(1) ? styles.fadeInUp : styles.fadeOut)
        }}
      >
        <div style={styles.container}>
          <div style={isMobile ? styles.sectionHeaderMobile : styles.sectionHeader}>
            <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Our Story</h2>
            <p style={isMobile ? styles.sectionSubtitleMobile : styles.sectionSubtitle}>
              From a college quiz club to Tamil Nadu's premier quiz community
            </p>
          </div>
          
          <div style={isMobile ? styles.storyContentMobile : styles.storyContent}>
            <div style={styles.storyText}>
              <p style={isMobile ? styles.storyParagraphMobile : styles.storyParagraph}>
                <strong>Quizzards was established in 2024</strong> as the official Quiz Club of Rajalakshmi Engineering College (REC), 
                with a vision to create an engaging platform for knowledge sharing and intellectual competition. We focus on organizing 
                two major quiz events that have become the hallmark of our institution's academic calendar.
              </p>
              <p style={isMobile ? styles.storyParagraphMobile : styles.storyParagraph}>
                <strong>Our flagship event, Quiz Premier League (QPL),</strong> is exclusively designed for REC students, 
                bringing together participants from diverse departments through innovative formats combining Kahoot technology 
                with traditional written rounds. Under the expert guidance of Grand Quiz Master Mr. Abhishek Bharathkumar, 
                QPL has evolved into a comprehensive three-phase competition.
              </p>
              <p style={isMobile ? styles.storyParagraphMobile : styles.storyParagraph}>
                <strong>Our crown jewel, Quizocalypse,</strong> is REC's premier inter-college quiz competition that attracts 
                the brightest minds from across Tamil Nadu. With 75 teams participating from various colleges, including 
                prestigious institutions like IIT Madras (who won 1st and 2nd place) and Loyola College (3rd place), 
                Quizocalypse has established REC as a recognized hub for competitive quizzing in the state.
              </p>
            </div>
            <div style={isMobile ? styles.timelineContainerMobile : styles.timelineContainer}>
              <h4 style={isMobile ? styles.timelineTitleMobile : styles.timelineTitle}>Our Journey</h4>
              <div style={styles.timeline}>
                {milestones.map((milestone, index) => (
                  <div key={index} style={isMobile ? styles.timelineItemMobile : styles.timelineItem} className="timeline-item">
                    <div style={isMobile ? styles.timelineYearMobile : styles.timelineYear}>{milestone.year}</div>
                    <div style={styles.timelineContent}>
                      <h5 style={isMobile ? styles.timelineEventMobile : styles.timelineEvent}>{milestone.event}</h5>
                      <p style={isMobile ? styles.timelineDescMobile : styles.timelineDesc}>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid - Hidden on Mobile */}
      {!isMobile && (
        <section 
          ref={el => sectionRefs.current[2] = el}
          style={{
            ...styles.valuesSection,
            ...(visibleSections.has(2) ? styles.fadeInUp : styles.fadeOut)
          }}
        >
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>What We Stand For</h2>
              <p style={styles.sectionSubtitle}>
                The core values that guide our quiz events and community building
              </p>
            </div>
            <div style={styles.valuesGrid}>
              {values.map((value, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.valueCard,
                    animationDelay: `${index * 0.1}s`
                  }}
                  className="value-card"
                >
                  <div style={styles.valueIcon}>{value.icon}</div>
                  <h4 style={styles.valueTitle}>{value.title}</h4>
                  <p style={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section - Hidden on Mobile */}
      {!isMobile && (
        <section 
          ref={el => sectionRefs.current[3] = el}
          style={{
            ...styles.teamSection,
            ...(visibleSections.has(3) ? styles.fadeInUp : styles.fadeOut)
          }}
        >
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Meet Our Team</h2>
              <p style={styles.sectionSubtitle}>
                The dedicated individuals organizing QPL and Quizocalypse events
              </p>
            </div>
            <div style={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.teamCard,
                    animationDelay: `${index * 0.15}s`
                  }}
                  className="team-card"
                >
                  <div style={styles.memberImageContainer}>
                    <div 
                      style={{
                        ...styles.memberImage,
                        background: `linear-gradient(135deg, 
                          ${index % 2 === 0 ? '#667eea, #764ba2' : '#f093fb, #f5576c'})`
                      }}
                    >
                      <span style={styles.memberInitials}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div style={styles.memberInfo}>
                    <h4 style={styles.memberName}>{member.name}</h4>
                    <p style={styles.memberRole}>{member.role}</p>
                    <p style={styles.memberBio}>{member.bio}</p>
                    <div style={styles.memberSkills}>
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} style={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div style={styles.memberSocial}>
                      {Object.keys(member.social).map((platform) => (
                        <a 
                          key={platform}
                          href={member.social[platform]}
                          style={styles.socialLink}
                          className="social-link"
                        >
                          {platform === 'linkedin' ? '💼' : 
                           platform === 'twitter' ? '🐦' : 
                           platform === 'instagram' ? '📸' : '💻'}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      <section 
        ref={el => sectionRefs.current[4] = el}
        style={{
          ...(isMobile ? styles.achievementsSectionMobile : styles.achievementsSection),
          ...(visibleSections.has(4) ? styles.fadeInUp : styles.fadeOut)
        }}
      >
        <div style={styles.container}>
          <div style={isMobile ? styles.sectionHeaderMobile : styles.sectionHeader}>
            <h2 style={isMobile ? styles.sectionTitleMobile : styles.sectionTitle}>Our Achievements</h2>
            <p style={isMobile ? styles.sectionSubtitleMobile : styles.sectionSubtitle}>
              Milestones that showcase our impact in the quiz community
            </p>
          </div>
          <div style={isMobile ? styles.achievementsGridMobile : styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                style={{
                  ...(isMobile ? styles.achievementCardMobile : styles.achievementCard),
                  animationDelay: `${index * 0.2}s`
                }}
                className="achievement-card"
              >
                {isMobile ? (
                  <>
                    <div style={styles.achievementIconContainerMobile}>
                      <div style={styles.achievementIconMobile}>{achievement.icon}</div>
                      <div style={styles.achievementYearMobile}>{achievement.year}</div>
                    </div>
                    <div style={styles.achievementContentMobile}>
                      <h4 style={styles.achievementTitleMobile}>{achievement.title}</h4>
                      <p style={styles.achievementDescriptionMobile}>{achievement.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={styles.achievementIcon}>{achievement.icon}</div>
                    <div style={styles.achievementYear}>{achievement.year}</div>
                    <h4 style={styles.achievementTitle}>{achievement.title}</h4>
                    <p style={styles.achievementDescription}>{achievement.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          .tab-button {
            transition: all 0.3s ease;
          }

          .tab-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(106, 13, 173, 0.2);
          }

          .timeline-item {
            animation: slideInLeft 0.6s ease forwards;
            opacity: 0;
          }

          .value-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
          }

          .value-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          }

          .team-card {
            transition: all 0.4s ease;
            animation: scaleIn 0.6s ease forwards;
            opacity: 0;
          }

          .team-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
          }

          .achievement-card {
            transition: all 0.3s ease;
            animation: fadeInUp 0.8s ease forwards;
            opacity: 0;
          }

          .achievement-card:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .social-link {
            transition: all 0.3s ease;
          }

          .social-link:hover {
            transform: scale(1.3) rotate(10deg);
          }

          /* Mobile-specific overrides */
          @media (max-width: 768px) {
            .tab-button:hover {
              transform: none;
              box-shadow: none;
            }
            
            .value-card:hover {
              transform: none;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }
            
            .team-card:hover {
              transform: none;
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
            }
            
            .achievement-card:hover {
              transform: none;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .social-link:hover {
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  aboutPage: {
    fontFamily: "'Inter', sans-serif",
    lineHeight: '1.6',
  },

  // Hero Section
  heroSection: {
    background: 'white',
    color: '#2c3e50',
    padding: '100px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  heroSectionMobile: {
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 50%, #764ba2 100%)',
    color: 'white',
    padding: '60px 0 50px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
  },
  heroContentMobile: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 20px',
  },
  heroTitle: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: '800',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  heroTitleMobile: {
    fontSize: '2.2rem',
    fontWeight: '800',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    lineHeight: '1.2',
  },
  heroIcon: {
    fontSize: '4rem',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  },
  heroIconMobile: {
    fontSize: '2.5rem',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '50px',
    opacity: 0.9,
    fontWeight: '300',
    maxWidth: '600px',
    margin: '0 auto 50px auto',
  },
  heroSubtitleMobile: {
    fontSize: '1.1rem',
    marginBottom: '30px',
    opacity: 0.9,
    fontWeight: '300',
    lineHeight: '1.4',
    padding: '0 10px',
  },
  heroStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroStatsMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    maxWidth: '350px',
    margin: '0 auto',
  },
  statCard: {
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)',
    borderRadius: '20px',
    padding: '30px 20px',
    border: '1px solid rgba(106, 13, 173, 0.2)',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 8px 25px rgba(106, 13, 173, 0.2)',
  },
  statCardMobile: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(15px)',
    borderRadius: '15px',
    padding: '20px 15px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
  },
  statNumber: {
    display: 'block',
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#ffd700',
    marginBottom: '8px',
  },
  statNumberMobile: {
    display: 'block',
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#ffd700',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: '500',
    opacity: 0.9,
  },
  statLabelMobile: {
    fontSize: '0.8rem',
    fontWeight: '500',
    opacity: 0.9,
    lineHeight: '1.2',
  },

  // Common Styles
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionHeaderMobile: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sectionTitleMobile: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '15px',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2',
  },
  sectionSubtitle: {
    fontSize: '1.3rem',
    color: '#5a6c7d',
    fontWeight: '300',
    maxWidth: '600px',
    margin: '0 auto',
  },
  sectionSubtitleMobile: {
    fontSize: '1rem',
    color: '#5a6c7d',
    fontWeight: '300',
    lineHeight: '1.5',
    padding: '0 10px',
  },

  // MVV Tab Section
  mvvSection: {
    padding: '100px 0',
    background: 'white',
  },
  mvvSectionMobile: {
    padding: '50px 0',
    background: 'white',
  },
  tabContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  tabContainerMobile: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  tabButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  tabButtonsMobile: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  tabButton: {
    padding: '15px 30px',
    background: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#5a6c7d',
  },
  tabButtonMobile: {
    padding: '10px 18px',
    background: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#5a6c7d',
    flex: 1,
    textAlign: 'center',
  },
  activeTab: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 8px 25px rgba(106, 13, 173, 0.3)',
  },
  activeTabMobile: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 6px 20px rgba(106, 13, 173, 0.3)',
  },
  tabContentContainer: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '25px',
    padding: '50px 40px',
  },
  tabContentContainerMobile: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '20px',
    padding: '30px 20px',
  },
  tabTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  tabTitleMobile: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  tabText: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#5a6c7d',
  },
  tabTextMobile: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#5a6c7d',
  },

  // Story Section
  storySection: {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  },
  storySectionMobile: {
    padding: '50px 0',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  },
  storyContent: {
    display: 'flex',
    gap: '60px',
    alignItems: 'flex-start',
  },
  storyContentMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  storyText: {
    flex: '2',
  },
  storyParagraph: {
    fontSize: '1.2rem',
    marginBottom: '25px',
    color: '#5a6c7d',
    lineHeight: '1.8',
  },
  storyParagraphMobile: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#5a6c7d',
    lineHeight: '1.6',
  },
  timelineContainer: {
    flex: '1',
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
  },
  timelineContainerMobile: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  timelineTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  timelineTitleMobile: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  timeline: {
    position: 'relative',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'flex-start',
    gap: '15px',
  },
  timelineItemMobile: {
    display: 'flex',
    marginBottom: '15px',
    alignItems: 'flex-start',
    gap: '12px',
  },
  timelineYear: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '50px',
    textAlign: 'center',
  },
  timelineYearMobile: {
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    minWidth: '45px',
    textAlign: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineEvent: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#2c3e50',
  },
  timelineEventMobile: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  timelineDesc: {
    fontSize: '0.9rem',
    color: '#5a6c7d',
    margin: 0,
  },
  timelineDescMobile: {
    fontSize: '0.8rem',
    color: '#5a6c7d',
    margin: 0,
    lineHeight: '1.4',
  },

  // Values Section (Desktop only)
  valuesSection: {
    padding: '100px 0',
    background: 'white',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
  },
  valueCard: {
    background: 'white',
    borderRadius: '25px',
    padding: '40px 30px',
    textAlign: 'center',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  valueIcon: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    display: 'block',
  },
  valueTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  valueDescription: {
    fontSize: '1rem',
    color: '#5a6c7d',
    lineHeight: '1.7',
  },

  // Team Section
  teamSection: {
    padding: '100px 0',
    background: 'white',
  },
  teamSectionMobile: {
    padding: '50px 0',
    background: 'white',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  teamGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '25px',
  },
  teamCard: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '25px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  teamCardMobile: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '20px',
    padding: '25px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  memberImageContainer: {
    marginBottom: '25px',
  },
  memberImageContainerMobile: {
    marginBottom: '20px',
  },
  memberImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
  memberImageMobile: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  memberInitials: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  memberInitialsMobile: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  memberInfo: {
    textAlign: 'center',
  },
  memberName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#2c3e50',
  },
  memberNameMobile: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '6px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  memberRole: {
    fontSize: '1rem',
    color: '#6a0dad',
    fontWeight: '600',
    marginBottom: '15px',
  },
  memberRoleMobile: {
    fontSize: '0.9rem',
    color: '#6a0dad',
    fontWeight: '600',
    marginBottom: '12px',
  },
  memberBio: {
    fontSize: '0.95rem',
    color: '#5a6c7d',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  memberBioMobile: {
    fontSize: '0.85rem',
    color: '#5a6c7d',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  memberSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  memberSkillsMobile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '15px',
  },
  skillTag: {
    background: 'rgba(106, 13, 173, 0.1)',
    color: '#6a0dad',
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  skillTagMobile: {
    background: 'rgba(106, 13, 173, 0.1)',
    color: '#6a0dad',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  memberSocial: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  memberSocialMobile: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  socialLink: {
    display: 'inline-block',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(106, 13, 173, 0.3)',
  },
  socialLinkMobile: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #6a0dad, #9d4edd)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(106, 13, 173, 0.3)',
  },

  // Achievements Section
  achievementsSection: {
    padding: '100px 0',
    background: 'white',
    color: '#2c3e50',
  },
  achievementsSectionMobile: {
    padding: '50px 0',
    background: 'white',
    color: '#2c3e50',
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  achievementsGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
  achievementCard: {
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)',
    borderRadius: '25px',
    padding: '40px 30px',
    textAlign: 'center',
    border: '1px solid rgba(106, 13, 173, 0.2)',
    color: 'white',
    boxShadow: '0 15px 40px rgba(106, 13, 173, 0.2)',
  },
  achievementCardMobile: {
    background: 'linear-gradient(135deg, #6a0dad 0%, #9d4edd 100%)',
    borderRadius: '20px',
    padding: '25px 20px',
    textAlign: 'left',
    border: '1px solid rgba(106, 13, 173, 0.2)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(106, 13, 173, 0.2)',
  },
  achievementIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    display: 'block',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  },
  achievementIconMobile: {
    fontSize: '2.5rem',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
    marginBottom: '8px',
  },
  achievementIconContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80px',
    paddingTop: '5px',
  },
  achievementContentMobile: {
    flex: 1,
  },
  achievementYear: {
    background: 'rgba(255, 215, 0, 0.2)',
    color: '#ffd700',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
    display: 'inline-block',
    marginBottom: '20px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
  },
  achievementYearMobile: {
    background: 'rgba(255, 215, 0, 0.2)',
    color: '#ffd700',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'inline-block',
    marginBottom: '15px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
  },
  achievementTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '15px',
    color: 'white',
  },
  achievementTitleMobile: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: 'white',
    lineHeight: '1.3',
  },
  achievementDescription: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
  },
  achievementDescriptionMobile: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.5',
  },

  // Animation States
  fadeInUp: {
    animation: 'fadeInUp 0.8s ease forwards',
  },
  fadeOut: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
};
