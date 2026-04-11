import React from "react";
import { motion } from "framer-motion";

function Reel({ size, top, left, delay = 0, duration = 18 }) {
  return (
    <motion.div
      initial={{ rotateY: 0, rotateX: 20 }}
      animate={{ rotateY: 360, rotateX: 20 }}
      transition={{ repeat: Infinity, duration, ease: "linear", delay }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        borderRadius: "50%",
        border: "10px solid rgba(199, 214, 255, 0.22)",
        boxShadow: "0 0 30px rgba(100, 140, 255, 0.18)",
        transformStyle: "preserve-3d",
        background:
          "radial-gradient(circle at center, rgba(28,48,97,0.45) 0%, rgba(18,30,60,0.2) 55%, rgba(13,24,49,0.1) 100%)"
      }}
    >
      <div style={hole(16, "18%", "18%")}></div>
      <div style={hole(16, "18%", "66%")}></div>
      <div style={hole(16, "66%", "18%")}></div>
      <div style={hole(16, "66%", "66%")}></div>
      <div style={hole(26, "38%", "38%")}></div>
    </motion.div>
  );
}

function FilmStrip() {
  return (
    <motion.div
      initial={{ x: -220, rotate: -14 }}
      animate={{ x: 220, rotate: -14 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "46%",
        left: "18%",
        width: "64%",
        height: 70,
        borderRadius: 10,
        border: "1px solid rgba(173, 191, 245, 0.28)",
        background:
          "linear-gradient(180deg, rgba(82,114,201,0.18), rgba(36,57,109,0.08))",
        overflow: "hidden"
      }}
    >
      <div style={stripHoles} />
      <div style={{ ...stripHoles, bottom: 6, top: "auto" }} />
    </motion.div>
  );
}

function FilmReelBackground() {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        opacity: 0.55
      }}
      aria-hidden="true"
    >
      <Reel size={180} top="16%" left="5%" duration={14} />
      <Reel size={220} top="68%" left="8%" duration={18} delay={0.2} />
      <Reel size={200} top="14%" left="82%" duration={16} delay={0.1} />
      <Reel size={160} top="70%" left="84%" duration={13} delay={0.3} />
      <FilmStrip />
    </div>
  );
}

const hole = (size, top, left) => ({
  position: "absolute",
  top,
  left,
  width: size,
  height: size,
  borderRadius: "50%",
  background: "rgba(9,17,37,0.75)",
  border: "1px solid rgba(184, 204, 255, 0.2)"
});

const stripHoles = {
  position: "absolute",
  left: 8,
  right: 8,
  top: 6,
  height: 8,
  background:
    "repeating-linear-gradient(90deg, rgba(212,224,255,0.42) 0 10px, rgba(0,0,0,0) 10px 22px)",
  borderRadius: 4
};

export default FilmReelBackground;
