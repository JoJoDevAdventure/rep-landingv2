export const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 }, // Comes from bottom
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const fadeRightVariants = {
  hidden: { opacity: 0, x: -50 }, // Comes from bottom
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 50 }, // Comes from bottom
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
