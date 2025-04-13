import React, { useState, useEffect } from 'react';
import styles from './Pricing.module.css';
import { Link } from 'react-router-dom';

const Pricing = () => {
  // State for calculator inputs
  const [travelerFee, setTravelerFee] = useState(10);
  const [itemWeight, setItemWeight] = useState(2);
  const [distance, setDistance] = useState(500);

  // Calculated values
  const [requesterCost, setRequesterCost] = useState(0);
  const [travelerEarnings, setTravelerEarnings] = useState(0);
  const [traditionalCost, setTraditionalCost] = useState(0);
  const [savings, setSavings] = useState(0);

  // Commission rate
  const COMMISSION_RATE = 0.05;
  const SPLIT_RATE = 0.025; // 2.5% each
  
  // Traditional shipping rates
  const BASE_KG_RATE = 5; // $5 per kg
  const KM_RATE = 0.02; // $0.02 per km

  // Calculate costs whenever inputs change
  useEffect(() => {
    // Calculate requester cost (traveler fee + 2.5% commission)
    const requesterCommission = travelerFee * SPLIT_RATE;
    const calculatedRequesterCost = travelerFee + requesterCommission;
    setRequesterCost(calculatedRequesterCost);

    // Calculate traveler earnings (traveler fee - 2.5% commission)
    const travelerCommission = travelerFee * SPLIT_RATE;
    const calculatedTravelerEarnings = travelerFee - travelerCommission;
    setTravelerEarnings(calculatedTravelerEarnings);

    // Calculate traditional shipping cost ($5/kg + $0.02/km)
    const calculatedTraditionalCost = (itemWeight * BASE_KG_RATE) + (distance * KM_RATE);
    setTraditionalCost(calculatedTraditionalCost);

    // Calculate savings (traditional cost - requester cost)
    const calculatedSavings = calculatedTraditionalCost - calculatedRequesterCost;
    setSavings(calculatedSavings);
  }, [travelerFee, itemWeight, distance]);

  // Handle input changes
  const handleTravelerFeeChange = (e) => {
    const value = parseFloat(e.target.value);
    setTravelerFee(isNaN(value) ? 0 : value);
  };

  const handleItemWeightChange = (e) => {
    const value = parseFloat(e.target.value);
    setItemWeight(isNaN(value) ? 0 : value);
  };

  const handleDistanceChange = (e) => {
    const value = parseFloat(e.target.value);
    setDistance(isNaN(value) ? 0 : value);
  };

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.heroSection}>
        <h1>Simple & Transparent Pricing</h1>
        <p>Global Pickups takes a small commission to keep our platform running smoothly</p>
      </div>

      {/* How It Works Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How Our Pricing Works</h2>
        <div className={styles.pricingExplanation}>
          <div className={styles.card}>
            <h3>5% Commission Split Equally</h3>
            <p>
              We take a 5% commission on the traveler's fee, split equally between travelers and requesters (2.5% each).
            </p>
            
            <div className={styles.exampleBox}>
              <h4>Example Transaction</h4>
              <div className={styles.exampleContent}>
                <div className={styles.exampleItem}>
                  <strong>Traveler charges:</strong> $10.00
                </div>
                <div className={styles.exampleItem}>
                  <strong>Commission:</strong> $0.50 ($0.25 each)
                </div>
                <div className={styles.exampleItem}>
                  <strong>Traveler earns:</strong> $9.75
                </div>
                <div className={styles.exampleItem}>
                  <strong>Requester pays:</strong> $10.25
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.card}>
            <h3>Incentives & Bonuses</h3>
            <div className={styles.incentiveItem}>
              <div className={styles.incentiveIcon}>🎁</div>
              <div>
                <h4>First Transaction Free</h4>
                <p>Your first transaction has 0% commission - try our service risk-free!</p>
              </div>
            </div>
            
            <div className={styles.incentiveItem}>
              <div className={styles.incentiveIcon}>👨‍👩‍👧‍👦</div>
              <div>
                <h4>Referral Bonus</h4>
                <p>Earn $2 credit for each new user you refer after they complete their first transaction.</p>
              </div>
            </div>
            
            <div className={styles.ctaButton}>
              <Link to="/signup" className={styles.button}>Join Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className={`${styles.section} ${styles.calculatorSection}`}>
        <h2 className={styles.sectionTitle}>Savings Calculator</h2>
        <p className={styles.sectionSubtitle}>
          See how much you can save compared to traditional shipping methods.
        </p>
        
        <div className={styles.calculatorContainer}>
          <div className={styles.inputsContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="travelerFee">Traveler's Fee ($)</label>
              <input
                type="number"
                id="travelerFee"
                value={travelerFee}
                onChange={handleTravelerFeeChange}
                min="1"
                step="1"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="itemWeight">Item Weight (kg)</label>
              <input
                type="number"
                id="itemWeight"
                value={itemWeight}
                onChange={handleItemWeightChange}
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="distance">Distance (km)</label>
              <input
                type="number"
                id="distance"
                value={distance}
                onChange={handleDistanceChange}
                min="1"
                step="1"
              />
            </div>
          </div>
          
          <div className={styles.resultsContainer}>
            <div className={styles.resultGroup}>
              <h3>Global Pickups</h3>
              <div className={styles.resultItem}>
                <span>Requester pays:</span>
                <span className={styles.resultValue}>${requesterCost.toFixed(2)}</span>
              </div>
              <div className={styles.resultItem}>
                <span>Traveler earns:</span>
                <span className={styles.resultValue}>${travelerEarnings.toFixed(2)}</span>
              </div>
            </div>
            
            <div className={styles.resultGroup}>
              <h3>Traditional Shipping</h3>
              <div className={styles.resultItem}>
                <span>Estimated cost:</span>
                <span className={styles.resultValue}>${traditionalCost.toFixed(2)}</span>
              </div>
              <div className={styles.savingsResult}>
                <span>Your savings:</span>
                <span className={`${styles.resultValue} ${styles.savingsValue}`}>
                  ${savings.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.calculatorNote}>
          <p>
            <strong>Note:</strong> Traditional shipping costs are estimated at $5/kg + $0.02/km.
            Actual savings may vary based on shipping providers and special circumstances.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        
        <div className={styles.faqContainer}>
          <div className={styles.faqItem}>
            <h3>How is the commission calculated?</h3>
            <p>
              Our platform takes a 5% commission on the traveler's fee, which is split equally between the traveler and requester. 
              For example, if a traveler charges $100, we take $5 commission total, with the traveler paying $2.50 and the requester paying $2.50.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>Are there any hidden fees?</h3>
            <p>
              No hidden fees! We believe in complete transparency. The only fee is our 5% commission, split equally between travelers and requesters.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>How do I receive my referral bonus?</h3>
            <p>
              When someone signs up using your unique referral link and completes their first transaction, 
              you'll automatically receive a $2 credit in your account. This credit can be applied to future transactions.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>Can I set my own price as a traveler?</h3>
            <p>
              Absolutely! As a traveler, you have complete freedom to set your own rates based on the items, 
              your travel plans, and other factors. Our platform only takes the small commission from whatever price you set.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to start saving?</h2>
          <p>Join our global community of travelers and requesters today!</p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={`${styles.button} ${styles.primaryButton}`}>
              Sign Up Now
            </Link>
            <Link to="/how-it-works" className={`${styles.button} ${styles.secondaryButton}`}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;