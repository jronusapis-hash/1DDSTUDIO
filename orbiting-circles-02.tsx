"use client";

import React from "react";
import {
  CalendarCheck,
  Clock3,
  Droplets,
  MapPin,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    size: "size-[27.5rem] md:size-[45rem]",
    duration: 18,
    icons: [
      { Icon: MessageCircle, label: "ปรึกษาสเปก", angle: -60 },
      { Icon: Sparkles, label: "ออกแบบลุค", angle: 0 },
      { Icon: CalendarCheck, label: "จองคิว", angle: 60 },
    ],
  },
  {
    size: "size-[37.5rem] md:size-[55rem]",
    duration: 24,
    icons: [
      { Icon: Scissors, label: "ติดตั้งและตัดแต่ง", angle: 0 },
      { Icon: ShieldCheck, label: "ความเป็นส่วนตัว", angle: -90 },
    ],
  },
  {
    size: "size-[45rem] md:size-[66.25rem]",
    duration: 30,
    icons: [
      { Icon: Droplets, label: "บริการดูแล", angle: -60 },
      { Icon: Clock3, label: "เปลี่ยนลุคประมาณ 2 ชั่วโมง", angle: 0 },
      { Icon: MapPin, label: "1DD STUDIO สุราษฎร์ธานี", angle: 60 },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative flex h-[27.5rem] w-full justify-center overflow-hidden md:h-[40rem]">
      <style>{`
        @keyframes orbit-cw { from { transform: rotate(var(--start-angle)) } to { transform: rotate(calc(var(--start-angle) + 360deg)) } }
        @keyframes orbit-ccw { from { transform: rotate(var(--start-angle)) } to { transform: rotate(calc(var(--start-angle) - 360deg)) } }
        @keyframes counter-cw { from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) } }
        @keyframes counter-ccw { from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) } }
        @media (prefers-reduced-motion: reduce) { .orbit-motion { animation-play-state: paused !important; } }
      `}</style>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-[18.75rem] -translate-x-1/2 translate-y-1/2 md:w-[36.25rem]">
        <ParticleSphereAnimation />
        <div className="absolute inset-[33%] grid place-items-center rounded-full border border-amber-300/35 bg-neutral-950/85 text-center shadow-[0_0_80px_rgba(217,169,74,.22)] backdrop-blur-xl">
          <span className="text-sm font-black tracking-[0.14em] text-amber-200 md:text-xl">1DD STUDIO</span>
        </div>
      </div>

      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";
        const allIcons = [...orbit.icons, ...orbit.icons.map((icon) => ({ ...icon, angle: icon.angle + 180, label: `${icon.label} สำรอง` }))];

        return (
          <div key={index} className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-amber-200/20 ${orbit.size}`}>
            {allIcons.map(({ Icon, label, angle }, iconIndex) => (
              <div
                key={`${label}-${iconIndex}`}
                className="orbit-motion absolute left-1/2 top-0 -ml-8 flex h-1/2 origin-bottom flex-col items-center justify-start"
                style={{ "--start-angle": `${angle}deg`, animation: `${orbitAnim} ${orbit.duration}s linear infinite` } as React.CSSProperties}
              >
                <div
                  className="orbit-motion relative z-10 -mt-8 rounded-full border border-amber-200/25 bg-neutral-950/90 p-3 text-amber-200 shadow-xl backdrop-blur md:p-4"
                  style={{ "--counter-offset": `${-angle}deg`, animation: `${counterAnim} ${orbit.duration}s linear infinite` } as React.CSSProperties}
                  title={label}
                  aria-label={label}
                >
                  <Icon className="size-6 md:size-8" strokeWidth={1.7} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
