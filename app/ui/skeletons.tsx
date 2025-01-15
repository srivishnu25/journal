import clsx from "clsx";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-500/60 before:to-transparent";

export function SkeletonCard() {
  return (
    <div
      className={`w-full md:w-60 md:aspect-square flex flex-col items-center justify-center gap-4 p-6 bg-gray-950 shadow-xl shadow-slate-200/10 rounded-md`}
    >
      {/* First Row */}
      <div
        className={clsx(shimmer, "w-full h-5 md:h-8 bg-gray-800 rounded-md")}
      ></div>
      {/* Second Row */}
      <div
        className={clsx(shimmer, "w-4/5 h-5 md:h-7 bg-gray-800 rounded-md")}
      ></div>
      {/* Third Row */}
      <div
        className={clsx(shimmer, "w-3/4 h-5 md:h-6 bg-gray-800 rounded-md")}
      ></div>
    </div>
  );
}

export function SkeletonCards() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
}
