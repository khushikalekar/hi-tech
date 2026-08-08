import { useEffect, useState } from "react";

interface CleaningPreloaderProps {
  onComplete?: () => void;
}

export default function CleaningPreloader({
  onComplete,
}: CleaningPreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += Math.random() * 4 + 2;

      if (value >= 100) {
        value = 100;
        clearInterval(timer);

        setTimeout(() => {
          onComplete?.();
        }, 600);
      }

      setProgress(Math.min(value, 100));
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .cleaning-preloader {
          position: fixed;
          inset: 0;
          z-index: 999999;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 45%,
              #16384d 0%,
              #091720 35%,
              #03080d 72%,
              #010204 100%
            );

          color: white;
          font-family: Inter, Arial, sans-serif;
        }

        /* =========================
           BACKGROUND GLOW
        ========================= */

        .cleaning-preloader::before {
          content: "";
          position: absolute;

          width: 600px;
          height: 600px;

          border-radius: 50%;

          background: rgba(0, 183, 255, 0.14);

          filter: blur(100px);

          animation: bigGlow 3s ease-in-out infinite;
        }

        @keyframes bigGlow {
          0%, 100% {
            transform: scale(.8);
            opacity: .4;
          }

          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        /* =========================
           PARTICLES
        ========================= */

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: white;

          opacity: 0;

          animation: particleFloat 4s linear infinite;
        }

        .particle:nth-child(1) {
          left: 8%;
          top: 75%;
          animation-delay: .2s;
        }

        .particle:nth-child(2) {
          left: 15%;
          top: 30%;
          animation-delay: 1s;
        }

        .particle:nth-child(3) {
          left: 25%;
          top: 80%;
          animation-delay: 1.8s;
        }

        .particle:nth-child(4) {
          left: 35%;
          top: 20%;
          animation-delay: 2.5s;
        }

        .particle:nth-child(5) {
          left: 45%;
          top: 70%;
          animation-delay: .7s;
        }

        .particle:nth-child(6) {
          left: 55%;
          top: 25%;
          animation-delay: 1.5s;
        }

        .particle:nth-child(7) {
          left: 65%;
          top: 75%;
          animation-delay: 2.2s;
        }

        .particle:nth-child(8) {
          left: 75%;
          top: 35%;
          animation-delay: 2.9s;
        }

        .particle:nth-child(9) {
          left: 85%;
          top: 70%;
          animation-delay: 1.2s;
        }

        .particle:nth-child(10) {
          left: 92%;
          top: 25%;
          animation-delay: 3s;
        }

        .particle:nth-child(11) {
          left: 12%;
          top: 55%;
          animation-delay: 2s;
        }

        .particle:nth-child(12) {
          left: 30%;
          top: 90%;
          animation-delay: 3.1s;
        }

        .particle:nth-child(13) {
          left: 70%;
          top: 15%;
          animation-delay: 1.7s;
        }

        .particle:nth-child(14) {
          left: 82%;
          top: 85%;
          animation-delay: 2.6s;
        }

        .particle:nth-child(15) {
          left: 95%;
          top: 55%;
          animation-delay: .9s;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(30px) scale(0);
            opacity: 0;
          }

          30% {
            opacity: .8;
          }

          70% {
            opacity: .5;
          }

          100% {
            transform: translateY(-180px) scale(1.5);
            opacity: 0;
          }
        }

        /* =========================
           MAIN ANIMATION
        ========================= */

        .cleaning-animation {
          position: relative;

          width: min(520px, 95vw);
          height: 390px;

          display: flex;
          align-items: center;
          justify-content: center;

          animation: animationEntrance 1s
            cubic-bezier(.22,1,.36,1);
        }

        @keyframes animationEntrance {
          from {
            opacity: 0;
            transform:
              translateY(80px)
              scale(.75);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        /* =========================
           ROTATING LOADER
        ========================= */

        .loading-ring {
          position: absolute;

          width: 350px;
          height: 350px;

          border-radius: 50%;

          animation: ringRotate 7s linear infinite;
        }

        .ring-segment {
          position: absolute;

          left: 50%;
          top: 0;

          width: 7px;
          height: 35px;

          margin-left: -3.5px;

          border-radius: 20px;

          background: rgba(255,255,255,.08);

          transform-origin:
            3.5px 175px;

          animation:
            segmentLight 1.8s ease-in-out infinite;
        }

        .ring-segment:nth-child(1) {
          animation-delay: 0s;
        }

        .ring-segment:nth-child(2) {
          animation-delay: .11s;
        }

        .ring-segment:nth-child(3) {
          animation-delay: .22s;
        }

        .ring-segment:nth-child(4) {
          animation-delay: .33s;
        }

        .ring-segment:nth-child(5) {
          animation-delay: .44s;
        }

        .ring-segment:nth-child(6) {
          animation-delay: .55s;
        }

        .ring-segment:nth-child(7) {
          animation-delay: .66s;
        }

        .ring-segment:nth-child(8) {
          animation-delay: .77s;
        }

        .ring-segment:nth-child(9) {
          animation-delay: .88s;
        }

        .ring-segment:nth-child(10) {
          animation-delay: .99s;
        }

        .ring-segment:nth-child(11) {
          animation-delay: 1.1s;
        }

        .ring-segment:nth-child(12) {
          animation-delay: 1.21s;
        }

        .ring-segment:nth-child(13) {
          animation-delay: 1.32s;
        }

        .ring-segment:nth-child(14) {
          animation-delay: 1.43s;
        }

        .ring-segment:nth-child(15) {
          animation-delay: 1.54s;
        }

        .ring-segment:nth-child(16) {
          animation-delay: 1.65s;
        }

        @keyframes ringRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes segmentLight {
          0%,100% {
            background: rgba(255,255,255,.08);
            box-shadow: none;
          }

          50% {
            background: #18c8ff;

            box-shadow:
              0 0 10px #18c8ff,
              0 0 25px rgba(24,200,255,.7);
          }
        }

        /* =========================
           BROOM
        ========================= */

        .broom-wrapper {
          position: relative;

          width: 390px;

          z-index: 5;

          animation: broomSweep 2.2s
            ease-in-out infinite;
        }

        .broom-image {
          display: block;

          width: 100%;

          object-fit: contain;

          filter:
            drop-shadow(
              0 20px 30px
              rgba(0,0,0,.6)
            )
            drop-shadow(
              0 0 20px
              rgba(255,180,0,.15)
            );
        }

        @keyframes broomSweep {
          0% {
            transform:
              translateX(-55px)
              rotate(-7deg);
          }

          25% {
            transform:
              translateX(-25px)
              rotate(-3deg);
          }

          50% {
            transform:
              translateX(55px)
              rotate(7deg);
          }

          75% {
            transform:
              translateX(25px)
              rotate(3deg);
          }

          100% {
            transform:
              translateX(-55px)
              rotate(-7deg);
          }
        }

        /* =========================
           DUST
        ========================= */

        .dust {
          position: absolute;

          bottom: 25px;

          width: 25px;
          height: 14px;

          border-radius: 50%;

          background:
            rgba(220,220,220,.5);

          filter: blur(5px);

          opacity: 0;

          animation:
            dustMove 1.5s ease-out infinite;
        }

        .dust-1 {
          left: 5%;
        }

        .dust-2 {
          left: 22%;
          animation-delay: .3s;
        }

        .dust-3 {
          right: 20%;
          animation-delay: .6s;
        }

        .dust-4 {
          right: 5%;
          animation-delay: .9s;
        }

        @keyframes dustMove {
          0% {
            opacity: 0;
            transform:
              translate(0,0)
              scale(.3);
          }

          30% {
            opacity: .8;
          }

          100% {
            opacity: 0;

            transform:
              translate(80px,-55px)
              scale(2.8);
          }
        }

        /* =========================
           SPARKLES
        ========================= */

        .sparkle {
          position: absolute;

          z-index: 10;

          color: white;

          font-size: 25px;

          text-shadow:
            0 0 8px white,
            0 0 20px #16c8ff;

          animation:
            sparkle 1.4s
            ease-in-out infinite;
        }

        .sparkle-1 {
          left: 4%;
          top: 45%;
        }

        .sparkle-2 {
          right: 8%;
          top: 35%;
          animation-delay: .35s;
        }

        .sparkle-3 {
          left: 23%;
          top: 20%;
          animation-delay: .7s;
        }

        .sparkle-4 {
          right: 24%;
          top: 18%;
          animation-delay: 1s;
        }

        @keyframes sparkle {
          0%,100% {
            opacity: 0;
            transform:
              scale(0)
              rotate(0deg);
          }

          50% {
            opacity: 1;
            transform:
              scale(1.3)
              rotate(180deg);
          }
        }

        /* =========================
           BRAND
        ========================= */

        .preloader-brand {
          position: relative;

          z-index: 20;

          margin-top: -15px;

          text-align: center;

          animation:
            brandAppear
            1s
            .4s
            both;
        }

        .preloader-brand h1 {
          margin: 0;

          font-size:
            clamp(28px,5vw,43px);

          font-weight: 900;

          letter-spacing: 5px;
        }

        .preloader-brand h1 span {
          color: #19c8ff;

          text-shadow:
            0 0 20px
            rgba(25,200,255,.6);
        }

        .preloader-brand p {
          margin: 8px 0 0;

          color:
            rgba(255,255,255,.5);

          font-size: 11px;

          letter-spacing: 3px;

          text-transform: uppercase;
        }

        @keyframes brandAppear {
          from {
            opacity: 0;
            transform:
              translateY(20px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        /* =========================
           PROGRESS
        ========================= */

        .progress-section {
          position: relative;

          z-index: 20;

          width: min(360px,80vw);

          margin-top: 32px;
        }

        .progress-info {
          display: flex;

          justify-content:
            space-between;

          margin-bottom: 9px;

          color:
            rgba(255,255,255,.5);

          font-size: 11px;

          letter-spacing: 1px;
        }

        .progress-info strong {
          color: #19c8ff;
        }

        .progress-bar {
          position: relative;

          width: 100%;
          height: 4px;

          overflow: hidden;

          border-radius: 20px;

          background:
            rgba(255,255,255,.1);
        }

        .progress-fill {
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #0877ff,
              #19c8ff,
              white
            );

          box-shadow:
            0 0 10px #19c8ff,
            0 0 25px
            rgba(25,200,255,.5);

          transition:
            width .15s linear;
        }

        /* =========================
           STATUS
        ========================= */

        .status {
          position: absolute;

          bottom: 28px;

          z-index: 20;

          display: flex;

          align-items: center;

          gap: 8px;

          color:
            rgba(255,255,255,.35);

          font-size: 10px;

          letter-spacing: 1.5px;

          text-transform: uppercase;
        }

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #20d5ff;

          box-shadow:
            0 0 12px #20d5ff;

          animation:
            statusPulse 1s infinite;
        }

        @keyframes statusPulse {
          0%,100% {
            opacity: .3;
            transform: scale(.7);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media(max-width:600px) {

          .cleaning-animation {
            width: 100vw;
            height: 330px;
          }

          .loading-ring {
            width: 300px;
            height: 300px;
          }

          .ring-segment {
            transform-origin:
              3.5px 150px;
          }

          .broom-wrapper {
            width: 330px;
          }

          .preloader-brand h1 {
            font-size: 28px;
          }

          .preloader-brand p {
            font-size: 9px;
          }

          .progress-section {
            width: 75vw;
          }
        }

        @media(prefers-reduced-motion:reduce) {
          *,
          *::before,
          *::after {
            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;
          }
        }
      `}</style>

      <div className="cleaning-preloader">

        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              className="particle"
              key={i}
            />
          ))}
        </div>

        {/* Main broom animation */}
        <div className="cleaning-animation">

          {/* Circular loader */}
          <div className="loading-ring">
            {Array.from({ length: 16 }).map(
              (_, i) => (
                <span
                  key={i}
                  className="ring-segment"
                  style={{
                    transform:
                      `rotate(${i * 22.5}deg)`,
                  }}
                />
              )
            )}
          </div>

          {/* Broom */}
          <div className="broom-wrapper">

            <img
              src="/broom.png"
              alt="Cleaning"
              className="broom-image"
            />

            {/* Dust */}
            <span className="dust dust-1" />
            <span className="dust dust-2" />
            <span className="dust dust-3" />
            <span className="dust dust-4" />

            {/* Cleaning sparkles */}
            <span className="sparkle sparkle-1">
              ✦
            </span>

            <span className="sparkle sparkle-2">
              ✦
            </span>

            <span className="sparkle sparkle-3">
              ✧
            </span>

            <span className="sparkle sparkle-4">
              ✦
            </span>

          </div>
        </div>

        {/* Brand */}
        <div className="preloader-brand">
          <h1>
            Hitech<span>Solutions</span>
          </h1>

          <p>
            Professional Cleaning Services
          </p>
        </div>

        {/* Progress */}
        <div className="progress-section">

          <div className="progress-info">
            <span>
              Cleaning your experience
            </span>

            <strong>
              {Math.floor(progress)}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

        {/* Status */}
        <div className="status">
          <span className="status-dot" />

          Preparing a spotless experience...
        </div>

      </div>
    </>
  );
}