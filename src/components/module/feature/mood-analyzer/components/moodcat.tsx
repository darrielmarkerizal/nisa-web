import React from "react";

interface MoodCatProps {
  mood: "veryHappy" | "happy" | "neutral" | "sad" | "stressed" | "verySad";
}

const MoodCat: React.FC<MoodCatProps> = ({ mood }) => {
  const animations = {
    veryHappy: `
            @keyframes bounce {
              0%, 100% { transform: translateY(0) rotate(0); }
              25% { transform: translateY(-15px) rotate(-3deg); }
              75% { transform: translateY(-15px) rotate(3deg); }
            }
            @keyframes tailWag {
              0%, 100% { transform: rotate(-15deg); }
              50% { transform: rotate(15deg); }
            }
            @keyframes blush {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 1; }
            }
          `,
    happy: `
            @keyframes gentleBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px) rotate(2deg); }
            }
          `,
    neutral: `
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `,
    sad: `
            @keyframes slowSway {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
          `,
    stressed: `
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-5px) rotate(-2deg); }
              75% { transform: translateX(5px) rotate(2deg); }
            }
          `,
    verySad: `
            @keyframes droop {
              0%, 100% { transform: translateY(0) rotate(0); }
              50% { transform: translateY(8px) rotate(-5deg); }
            }
          `,
  };

  // Get the appropriate animation based on mood
  const getAnimation = () => {
    switch (mood) {
      case "veryHappy":
        return "bounce 2s ease-in-out infinite";
      case "happy":
        return "gentleBounce 2s ease-in-out infinite";
      case "neutral":
        return "breathe 4s ease-in-out infinite";
      case "sad":
        return "slowSway 4s ease-in-out infinite";
      case "stressed":
        return "shake 0.5s ease-in-out infinite";
      case "verySad":
        return "droop 3s ease-in-out infinite";
      default:
        return "none";
    }
  };

  // Get eye shape based on mood
  const getEyes = () => {
    switch (mood) {
      case "veryHappy":
        return (
          <>
            {/* Larger sparkly eyes */}
            <path d="M85 110 Q95 105, 105 110 Q95 115, 85 110" fill="#000" />
            <path
              d="M135 110 Q145 105, 155 110 Q145 115, 135 110"
              fill="#000"
            />
            <circle cx="92" cy="108" r="2" fill="#FFF" />
            <circle cx="142" cy="108" r="2" fill="#FFF" />
            {/* Blush marks */}
            <circle
              cx="75"
              cy="125"
              r="10"
              fill="#FFB6C1"
              opacity="0.7"
              className="animate-blush"
            />
            <circle
              cx="165"
              cy="125"
              r="10"
              fill="#FFB6C1"
              opacity="0.7"
              className="animate-blush"
            />
          </>
        );

      case "happy":
        return (
          <>
            {/* Cute upward crescents */}
            <path
              d="M85 110 Q95 105, 105 110"
              stroke="#000"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M135 110 Q145 105, 155 110"
              stroke="#000"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="75" cy="125" r="8" fill="#FFB6C1" opacity="0.6" />
            <circle cx="165" cy="125" r="8" fill="#FFB6C1" opacity="0.6" />
          </>
        );
      case "neutral":
        return (
          <>
            <circle cx="95" cy="115" r="4" fill="#000" />
            <circle cx="145" cy="115" r="4" fill="#000" />
          </>
        );
      case "sad":
        return (
          <>
            <path
              d="M90 118 Q95 115, 100 118"
              stroke="#000"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M140 118 Q145 115, 150 118"
              stroke="#000"
              fill="none"
              strokeWidth="2"
            />
          </>
        );
      case "stressed":
        return (
          <>
            <path d="M90 113 L100 117" stroke="#000" strokeWidth="2" />
            <path d="M140 113 L150 117" stroke="#000" strokeWidth="2" />
          </>
        );
      case "verySad":
        return (
          <>
            <path
              d="M90 120 Q95 115, 100 120"
              stroke="#000"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M140 120 Q145 115, 150 120"
              stroke="#000"
              fill="none"
              strokeWidth="2"
            />
          </>
        );
    }
  };

  // Get mouth shape based on mood
  const getMouth = () => {
    switch (mood) {
      case "veryHappy":
        return (
          <path
            d="M110 135 Q120 145, 130 135"
            stroke="#000"
            fill="none"
            strokeWidth="2"
          />
        );
      case "happy":
        return (
          <path
            d="M110 135 Q120 142, 130 135"
            stroke="#000"
            fill="none"
            strokeWidth="2"
          />
        );
      case "neutral":
        return <path d="M110 138 L130 138" stroke="#000" strokeWidth="2" />;
      case "sad":
        return (
          <path
            d="M110 140 Q120 135, 130 140"
            stroke="#000"
            fill="none"
            strokeWidth="2"
          />
        );
      case "stressed":
        return (
          <path
            d="M110 140 Q120 132, 130 140"
            stroke="#000"
            fill="none"
            strokeWidth="2"
          />
        );
      case "verySad":
        return (
          <path
            d="M110 142 Q120 135, 130 142"
            stroke="#000"
            fill="none"
            strokeWidth="2"
          />
        );
    }
  };

  return (
    <div className="w-72 h-72 mx-auto">
      <style>{animations[mood]}</style>
      <svg
        viewBox="0 0 240 240"
        style={{ animation: getAnimation() }}
        className="w-full h-full drop-shadow-lg"
      >
        {/* Enhanced base cat shape */}
        <g id="cat-body">
          {/* Rounder body */}
          <ellipse cx="120" cy="150" rx="85" ry="75" fill="#FFF5EE" />

          {/* Rounder head */}
          <circle cx="120" cy="120" r="65" fill="#FFF5EE" />

          {/* Cuter ears */}
          <path d="M65 75 Q85 45, 105 75" fill="#FFF5EE" />
          <path d="M175 75 Q155 45, 135 75" fill="#FFF5EE" />

          {/* Pink inner ears */}
          <path d="M70 70 Q85 50, 100 70" fill="#FFB6C1" />
          <path d="M170 70 Q155 50, 140 70" fill="#FFB6C1" />

          {/* Fluffier cheeks */}
          <circle cx="80" cy="125" r="30" fill="#FFE4E1" />
          <circle cx="160" cy="125" r="30" fill="#FFE4E1" />

          {/* Cute pink nose */}
          <path d="M115 125 Q120 128, 125 125 T135 125" fill="#FFB6C1" />
          <circle cx="120" cy="127" r="5" fill="#FF9BB3" />
        </g>

        {getEyes()}
        {getMouth()}

        {/* Cuter whiskers */}
        <g stroke="#D3D3D3" strokeWidth="2">
          <path d="M80 130 L45 125">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="M80 130 L45 125; M80 130 L45 127; M80 130 L45 125"
            />
          </path>
          {/* ... more animated whiskers ... */}
        </g>

        {/* Animated tail */}
        <path
          d="M190 170 Q220 180, 210 200"
          fill="#FFF5EE"
          stroke="#FFE4E1"
          strokeWidth="15"
          strokeLinecap="round"
          style={{
            animation:
              mood === "veryHappy"
                ? "tailWag 0.5s ease-in-out infinite"
                : "none",
            transformOrigin: "190px 170px",
          }}
        />
      </svg>
    </div>
  );
};

export default MoodCat;
