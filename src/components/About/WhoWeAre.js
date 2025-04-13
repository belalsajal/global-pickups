import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WhoWeAre.module.css';

const WhoWeAre = () => {
  return (
    <section className={styles.whoWeAre}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
        </div>
        <h2 className={styles.headline}>Who We Are</h2>
      </div>
      
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.subheadline}>
              Global Pickups connects people who travel with people who need items moved across borders.
            </p>
            <p className={styles.bodyText}>
              Born from a real need experienced by our founder - an international student who needed textbooks from home but faced expensive shipping costs. By chance, a fellow traveler offered to bring the books in their luggage, and an idea was sparked. 
            </p>
            <div className={styles.benefitsContainer}>
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.checkIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  <span>Founded by travelers who understand cross-border challenges</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  <span>Built by a diverse team from multiple countries</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  <span>Creating connections that span continents</span>
                </li>
              </ul>
            </div>
            <p className={styles.bodyText}>
              We're a team of diverse individuals who believe in the power of community to solve everyday problems. Our platform transforms unused luggage space into opportunities that benefit both travelers and requesters, while creating meaningful connections across borders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;