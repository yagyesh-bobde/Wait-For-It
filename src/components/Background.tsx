const Grid = () => (
  <div className="fixed inset-0 z-0 h-screen w-screen bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:45px_45px]"></div>
);

const MovingGradient = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    {/* Primary gradients */}
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.4),rgba(255,0,0,0)_43.89%)]
      animate-[gradient-fade_8s_ease-in-out_infinite] opacity-60"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,163,255,0.4),rgba(0,0,255,0)_43.89%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_2s] opacity-50"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.3),rgba(128,0,255,0)_43.89%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_4s] opacity-40"
    />

    {/* Secondary gradients */}
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.3),rgba(0,0,255,0)_50%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_6s] opacity-30"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.3),rgba(0,0,255,0)_50%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_1s] opacity-40"
    />

    {/* Accent gradients */}
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_40%_10%,rgba(56,189,248,0.2),rgba(0,0,255,0)_40%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_3s] opacity-50"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_60%_90%,rgba(192,132,252,0.2),rgba(0,0,255,0)_40%)]
      animate-[gradient-fade_8s_ease-in-out_infinite_5s] opacity-40"
    />
  </div>
);

const Background = () => (
  <>
    <Grid />
    <MovingGradient />
  </>
);

export default Background;
