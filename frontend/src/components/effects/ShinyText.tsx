import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean; // Tidak dipakai lagi karena alurnya sekarang linear teratur
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 1.5, // 1.5 detik per satu kali lintasan kilat
  className = '',
  color = '#38184A',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
}) => {
  const progress = useMotionValue(0);
  const startTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const animationDuration = speed * 1000;

  // Jalankan kalkulasi frame animasi linier (0 hingga 100)
  useAnimationFrame(time => {
    // Jika status komponen dinonaktifkan (disabled), reset progress ke awal & matikan perhitungan frame
    if (disabled) {
      startTimeRef.current = null;
      progress.set(directionRef.current === 1 ? 0 : 100);
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;
    
    // Hitung persentase jalan linear (0 sampai 1)
    const linearProgress = Math.min(elapsed / animationDuration, 1);
    const p = linearProgress * 100;

    // Set posisi kilatan berdasarkan arah gerak
    progress.set(directionRef.current === 1 ? p : 100 - p);
  });

  // Reset posisi awal secara instan setiap kali status disabled berubah dari TRUE ke FALSE (Mouse masuk kembali)
  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    if (!disabled) {
      startTimeRef.current = null; // Memaksa useAnimationFrame mencatat waktu baru dari 0
      progress.set(directionRef.current === 1 ? 0 : 100);
    }
  }, [disabled, direction, progress]);

  // Transform: p=0 -> 150% (cahaya di luar kanan), p=100 -> -50% (cahaya di luar kiri)
  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  // Sembunyikan kilatan secara total dengan meleburnya ke warna dasar teks jika dinonaktifkan
  const activeColor = color;
  const activeShineColor = disabled ? color : shineColor;

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${activeColor} 0%, ${activeColor} 35%, ${activeShineColor} 50%, ${activeColor} 65%, ${activeColor} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // Transisi cepat 0.2 detik agar efek langsung bersih tanpa goresan noda saat mouse leave
    transition: 'background-image 0.2s ease-in-out'
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
