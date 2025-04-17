import { motion } from "framer-motion";

export default function PagePreview() {
  return (
    <motion.div
    className="lg:col-span-5 px-4 md:px-8 lg:px-0"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.7 }}
  >
    <div className="relative">
      <motion.div
        className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-xl"
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="relative bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <span className="text-xs text-white">🤍</span>
            </div>
            <span className="text-sm font-medium text-foreground/90">Nossa História</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[1, 2, 3].map((photoIndex) => (
            <motion.div 
              key={photoIndex}
              className="aspect-square rounded-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + (photoIndex * 0.1) }}
            >
              <div className="bg-gradient-to-tr from-primary/20 to-secondary/20 h-full"></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="aspect-video w-full rounded-lg overflow-hidden mb-5 border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="bg-gradient-to-tr from-secondary/30 to-primary/30 h-full relative">
            <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-xs px-2 py-1 rounded-md border border-white/10">
              Nosso lugar especial
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-white/80">Nosso aniversário</h3>
              <p className="text-xs text-white/60">15 de outubro</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">120 dias</p>
              <div className="flex gap-1 text-xs text-white/80">
                <span>14</span>:<span>30</span>:<span>22</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <motion.div 
              className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-[8px] text-white">▶</span>
            </motion.div>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-medium">Nossa Música</h4>
            <p className="text-[10px] text-white/60">Perfect - Ed Sheeran</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[8px] text-white/60">1:24</span>
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: "30%" }}
              />
            </div>
            <span className="text-[8px] text-white/60">3:42</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none"
          animate={{ 
            boxShadow: ['0 0 0 rgba(236, 72, 153, 0)', '0 0 15px rgba(236, 72, 153, 0.3)', '0 0 0 rgba(236, 72, 153, 0)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  </motion.div>
  );
}