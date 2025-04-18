import { motion, MotionValue } from "framer-motion";

export default function DiscoverMore({ scrollIndicatorOpacity }: { scrollIndicatorOpacity: MotionValue<number> }) {
  return (
    <motion.div 
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
    style={{ opacity: scrollIndicatorOpacity }}
  >
    <span className="text-xs text-foreground/60 mb-2">Descubra mais</span>
    <motion.div 
      className="w-6 h-10 border border-foreground/20 rounded-full flex justify-center items-start p-1"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <motion.div 
        className="w-1.5 h-1.5 bg-primary rounded-full"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  </motion.div>
  );
}