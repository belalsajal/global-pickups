import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JoinCommunity.module.css';

const JoinCommunity = () => {
  return (
    <section className={styles.joinCommunity}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Join Our Global Community</h2>
        <p className={styles.bodyText}>
          Every day, our platform connects hundreds of travelers and requesters across borders. From students getting educational materials to families sharing cultural foods, Global Pickups makes meaningful connections happen.
        </p>
        <p className={styles.bodyText}>
          Ready to be part of a movement that's reimagining international item transport? Whether you're traveling soon or need something delivered, your journey with Global Pickups starts here.
        </p>
        <div className={styles.buttonsContainer}>
          <Link to="/signup" className={styles.createAccountButton}>
            Start Your Journey
          </Link>
          <Link to="/travel-plans" className={styles.exploreOptionsButton}>
            Browse Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;