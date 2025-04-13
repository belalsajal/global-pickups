import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WhySection.module.css';

const WhySection = () => {
  return (
    <section className={styles.whySection}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faBox} className={styles.icon} />
        </div>
        <h2 className={styles.headline}>Why Global Pickups?</h2>
      </div>
      
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.subheadline}>
              Because getting items from abroad shouldn't cost a fortune or harm the planet.
            </p>
            <p className={styles.bodyText}>
              International shipping is expensive, slow, and often unreliable for personal items. Global Pickups offers a smart alternative that benefits everyone involved:
            </p>
            
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitHeader}>
                  <div className={styles.benefitIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  </div>
                  <h3>For Requesters</h3>
                </div>
                <ul className={styles.benefitList}>
                  <li>Save up to 70% on shipping costs</li>
                  <li>Get items delivered faster</li>
                  <li>Access products unavailable through international shipping</li>
                </ul>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitHeader}>
                  <div className={styles.benefitIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  </div>
                  <h3>For Travelers</h3>
                </div>
                <ul className={styles.benefitList}>
                  <li>Earn extra money using luggage space you already have</li>
                  <li>Make your trips more affordable</li>
                  <li>Help others while you travel</li>
                </ul>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitHeader}>
                  <div className={styles.benefitIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  </div>
                  <h3>For the Planet</h3>
                </div>
                <ul className={styles.benefitList}>
                  <li>Reduce carbon emissions</li>
                  <li>Use travel that's already happening</li>
                  <li>Minimize packaging waste</li>
                </ul>
              </div>
            </div>
            
            <p className={styles.bodyText}>
              Our transparent review system and secure payment handling create trust between parties, making international item transport simple and stress-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;