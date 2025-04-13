import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WhatWeDo.module.css';

const WhatWeDo = () => {
  return (
    <section className={styles.whatWeDo}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faPlane} className={styles.icon} />
        </div>
        <h2 className={styles.headline}>What We Do</h2>
      </div>
      
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.subheadline}>
              We make international item delivery personal, affordable, and sustainable.
            </p>
            <p className={styles.bodyText}>
              Our platform is simple: travelers post their upcoming trips and available luggage space, while requesters list items they need transported. Global Pickups matches them and facilitates the exchange.
            </p>
            <div className={styles.processContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Post Your Travel</h3>
                  <p>Travelers share their journey details and available space</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Request an Item</h3>
                  <p>Requesters specify what they need and where</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Connect & Agree</h3>
                  <p>Match, agree on terms, and secure payment through our platform</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Delivery & Review</h3>
                  <p>Complete the delivery and share your experience</p>
                </div>
              </div>
            </div>
            <p className={styles.bodyText}>
              Whether it's bringing specialty foods from home, educational materials, cultural items, or gifts for loved ones, we enable person-to-person delivery that traditional shipping companies can't match in price or personal touch. Plus, by utilizing existing travel plans, we reduce the environmental impact of international shipping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;