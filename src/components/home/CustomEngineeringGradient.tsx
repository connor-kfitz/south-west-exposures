interface CustomEngineeringGradientProps {
  className?: string;
}

export default function CustomEngineeringGradient({ className = "hidden sm:block absolute inset-x-0 bottom-0 h-[895px]" }: CustomEngineeringGradientProps) {
  return (
    <div
      aria-hidden
      className={`${className} pointer-events-none opacity-10 bg-[length:cover] bg-[position:50%] bg-no-repeat z-0`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 14.24%), url('/images/about/custom-engineering-gradient.png') lightgray 50% / cover no-repeat"
      }}
    />
  );
}
