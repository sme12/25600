export function HeroCopy() {
  return (
    <>
      {/* Desktop leadings are 8px multiples and the blocks are baseline-trimmed,
          so every box edge and every baseline sits on the loupe's canvas grid.
          Box tops: h1 at 40 (the hero's pt-10), p at 192 + mt-4. */}
      <h1 className="text-[48px] leading-[1.20] font-[650] tracking-[-0.045em] text-pretty text-strong desktop:max-w-[640px] desktop:trim-display desktop:text-[64px] desktop:leading-[72px]">
        Craft, studied at 25,600<span className="text-accent">%</span>
      </h1>
      <p className="mt-8 text-base leading-6 text-pretty text-muted desktop:mt-4 desktop:max-w-[560px] desktop:trim-body desktop:text-[15.5px]">
        25,600% is Figma’s maximum zoom. This is a collection of practical
        studies by Vitalii Sazanov: take exceptional UI from people known for
        uncommon care, put it under the loupe, and rebuild it from scratch —
        every detail, note for note.
      </p>
    </>
  );
}
