import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useTheme } from '@mui/material/styles';

const OnboardingTour = ({ 
  steps, 
  run = false, 
  onClose,
  onSkip,
  showSkipButton = true,
  continuous = true
}) => {
  const theme = useTheme();
  const [tourState, setTourState] = useState({
    run,
    steps: steps || [],
    stepIndex: 0,
  });

  useEffect(() => {
    setTourState(prevState => ({
      ...prevState,
      run,
      steps,
    }));
  }, [run, steps]);

  const handleJoyrideCallback = (data) => {
    const { status, index, type } = data;
    
    if (type === 'step:after') {
      setTourState(prevState => ({
        ...prevState,
        stepIndex: index + 1,
      }));
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTourState(prevState => ({ ...prevState, run: false }));
      
      if (status === STATUS.FINISHED && onClose) {
        onClose();
      } else if (status === STATUS.SKIPPED && onSkip) {
        onSkip();
      } else if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous={continuous}
      run={tourState.run}
      scrollToFirstStep
      showSkipButton={showSkipButton}
      steps={tourState.steps}
      stepIndex={tourState.stepIndex}
      styles={{
        options: {
          primaryColor: theme.palette.primary.main,
          textColor: theme.palette.text.primary,
          zIndex: 10000,
        }
      }}
      disableScrolling={false}
      disableOverlayClose
      locale={{
        last: 'Finish',
        skip: 'Skip tour'
      }}
    />
  );
};

export default OnboardingTour;