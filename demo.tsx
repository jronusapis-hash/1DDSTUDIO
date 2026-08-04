import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";

export default function Demo() {
  return (
    <section className="overflow-hidden bg-neutral-950 text-white" aria-labelledby="one-dd-care-title">
      <div className="mx-auto max-w-6xl px-5 pt-20 text-center">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">1DD Studio Experience</p>
        <h2 id="one-dd-care-title" className="mt-4 text-3xl font-black md:text-5xl">ครบทุกขั้นตอน ตั้งแต่ปรึกษาจนถึงดูแลหลังติดตั้ง</h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-400">บริการส่วนตัว ออกแบบให้เข้ากับรูปหน้า และดูแลต่อเนื่องหลังเปลี่ยนลุค</p>
      </div>
      <div className="flex min-h-[500px] w-full items-end justify-center">
        <OrbitingCirclesGlobe />
      </div>
    </section>
  );
}
