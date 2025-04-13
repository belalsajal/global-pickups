// filepath: /home/belalsajal/projects/global-pickups/src/components/shared/MotionComponents.js
import { Box, Typography, Card, Button, IconButton } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring, useAnimationControls } from 'framer-motion';

// Re-export motion and hooks from framer-motion
export { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useAnimationControls 
};

// Motion variants for common animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const slideDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 }
};

export const slideLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
};

export const slideRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export const scale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

// Motion components using Material-UI components
export const MotionBox = motion(Box);
export const MotionTypography = motion(Typography);
export const MotionCard = motion(Card);
export const MotionButton = motion(Button);
export const MotionIconButton = motion(IconButton);

// Adding a SlideUpBox component for convenience
export const SlideUpBox = ({ children, delay = 0, ...props }) => (
  <MotionBox 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    {...props}
  >
    {children}
  </MotionBox>
);

// Animation defaults
export const defaultTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Advanced Spring Animations
export const bounceSpring = {
  type: "spring",
  stiffness: 400,
  damping: 10,
  mass: 1
};

export const gentleSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1.2
};

export const elasticSpring = {
  type: "spring",
  stiffness: 300,
  damping: 15,
  velocity: 2
};

// Gesture Animation Variants
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const tapShrink = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

export const dragHighlight = {
  rest: { scale: 1, opacity: 0.8 },
  drag: { scale: 1.05, opacity: 1 }
};

// Drag constraints example
export const createDragConstraints = (ref) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  ref
});

// Card hover effect with tilt
export const cardTiltEffect = {
  rest: { 
    rotateX: 0, 
    rotateY: 0, 
    scale: 1,
    transition: { duration: 0.5, type: "tween", ease: "easeOut" }
  },
  hover: { 
    rotateX: 10, 
    rotateY: 15, 
    scale: 1.05,
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 }
  }
};

// Button hover effect
export const buttonHoverEffect = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

// List item stagger effects
export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.2
    }
  }
};

// Advanced page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  }
};

// Parallax effect helper
export const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

// Draggable component with spring return
export const DraggableComponent = ({ children, dragConstraints, ...props }) => (
  <motion.div
    drag
    dragConstraints={dragConstraints}
    whileDrag={{ scale: 1.05 }}
    {...props}
  >
    {children}
  </motion.div>
);