import { useEffect, useRef } from "react";

function AnimatedBackground() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    let animationId;
    let stars = [];
    let comets = [];
    let shockwaves = [];
    let sparkParticles = [];
    let nebulaClouds = [];

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const CONFIG = {
      starDensity: 0.00028,
      minStars: 380,
      maxStars: 650,
      magnetRadius: 220,
      magnetForce: 0.45,
      swirlForce: 0.18,
      scatterRadius: 300,
      scatterForce: 24,
      friction: 0.94,
      cometIntervalMs: 10000,

      starColors: [
        { r: 255, g: 255, b: 255 },
        { r: 205, g: 238, b: 255 },
        { r: 135, g: 220, b: 255 },
        { r: 255, g: 232, b: 175 }
      ]
    };

    const cursor = {
      x: width / 2,
      y: height / 2,
      renderX: width / 2,
      renderY: height / 2,
      active: false,
      isPressed: false,
      pulsePhase: 0,
      scatterDisableUntil: 0
    };

    let lastCometTime = performance.now();

    function resizeCanvas() {

      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNebulaClouds();
      initStars();
    }

    function initNebulaClouds() {

      nebulaClouds = [
        {
          x: width * 0.22,
          y: height * 0.28,
          r: Math.max(width, height) * 0.42,
          color: "56, 189, 248",
          alpha: 0.035
        },
        {
          x: width * 0.78,
          y: height * 0.72,
          r: Math.max(width, height) * 0.48,
          color: "99, 102, 241",
          alpha: 0.032
        },
        {
          x: width * 0.50,
          y: height * 0.50,
          r: Math.max(width, height) * 0.55,
          color: "14, 165, 233",
          alpha: 0.02
        }
      ];
    }

    class Star {

      constructor() {
        this.reset();
      }

      reset() {

        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.depth = Math.pow(Math.random(), 1.55) * 0.85 + 0.15;

        this.radius = this.depth * 2 + 0.45;

        const speed = 0.12 + this.depth * 0.36;

        const angle = Math.random() * Math.PI * 2;

        this.baseVx = Math.cos(angle) * speed;
        this.baseVy = Math.sin(angle) * speed;

        this.vx = 0;
        this.vy = 0;

        this.twinkleSpeed = 0.015 + Math.random() * 0.045;

        this.twinklePhase = Math.random() * Math.PI * 2;

        this.baseAlpha = 0.35 + this.depth * 0.65;

        this.color = CONFIG.starColors[
          Math.floor(Math.random() * CONFIG.starColors.length)
        ];

        this.hasCrossFlare = this.depth > 0.82 && Math.random() > 0.4;

        this.isCaptured = false;
        this.distToCursor = Infinity;
      }

      update(now) {

        this.twinklePhase += this.twinkleSpeed;

        this.isCaptured = false;
        this.distToCursor = Infinity;

        if (cursor.active && now > cursor.scatterDisableUntil) {

          const dx = cursor.x - this.x;
          const dy = cursor.y - this.y;

          const distSq = dx * dx + dy * dy;

          if (distSq < CONFIG.magnetRadius ** 2) {

            const dist = Math.sqrt(distSq) || 0.001;

            this.distToCursor = dist;
            this.isCaptured = true;

            const pullStrength = Math.pow(
              1 - dist / CONFIG.magnetRadius,
              1.45
            );

            const nx = dx / dist;
            const ny = dy / dist;

            const tx = -ny;
            const ty = nx;

            if (dist > 18) {

              this.vx += nx * pullStrength *
                CONFIG.magnetForce * (0.5 + this.depth * 0.5);

              this.vy += ny * pullStrength *
                CONFIG.magnetForce * (0.5 + this.depth * 0.5);

            } else {

              this.vx *= 0.84;
              this.vy *= 0.84;

            }

            this.vx += tx * pullStrength * CONFIG.swirlForce;
            this.vy += ty * pullStrength * CONFIG.swirlForce;
          }
        }

        this.x += this.baseVx + this.vx;
        this.y += this.baseVy + this.vy;

        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;

        const margin = 24;

        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;

        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;
      }

      draw() {

        const twinkle = (Math.sin(this.twinklePhase) + 1) * 0.5;

        const speedMag = Math.hypot(this.vx, this.vy);

        let alpha = this.baseAlpha * (0.4 + twinkle * 0.6);

        if (this.isCaptured || speedMag > 1.5) {
          alpha = Math.min(1, alpha + 0.35);
        }

        const { r, g, b } = this.color;

        ctx.save();

        if (speedMag > 2.2) {

          ctx.beginPath();

          ctx.moveTo(this.x, this.y);

          ctx.lineTo(
            this.x - this.vx * 2.4,
            this.y - this.vy * 2.4
          );

          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.75})`;

          ctx.lineWidth = this.radius * 1.15;

          ctx.lineCap = "round";

          ctx.stroke();
        }

        if (this.depth > 0.55 || this.isCaptured) {

          const glowR = this.radius * (this.isCaptured ? 4.4 : 3);

          const grad = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, glowR
          );

          grad.addColorStop(
            0,
            `rgba(${r},${g},${b},${alpha * 0.45})`
          );

          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

          ctx.fillStyle = grad;

          ctx.beginPath();

          ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2);

          ctx.fill();
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fill();

        if (this.hasCrossFlare && twinkle > 0.55) {

          const spikeLen = this.radius * (3.4 + twinkle * 2.4);

          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.5})`;

          ctx.lineWidth = 0.75;

          ctx.beginPath();

          ctx.moveTo(this.x - spikeLen, this.y);
          ctx.lineTo(this.x + spikeLen, this.y);

          ctx.moveTo(this.x, this.y - spikeLen);
          ctx.lineTo(this.x, this.y + spikeLen);

          ctx.stroke();
        }

        ctx.restore();
      }
    }

    class Comet {

      constructor() {

        this.initTrajectory();

        this.trail = [];
        this.maxTrailLength = 60;

        this.dust = [];

        this.alive = true;
      }

      initTrajectory() {

        const margin = 90;

        const side = Math.random();

        let startX, startY, endX, endY;

        if (side < 0.45) {

          startX = -margin;
          startY = Math.random() * (height * 0.7) + height * 0.08;

          endX = width + margin;

          endY = Math.max(
            height * 0.1,
            Math.min(height * 0.9, startY + (Math.random() - 0.4) * height * 0.65)
          );

        } else if (side < 0.9) {

          startX = width + margin;
          startY = Math.random() * (height * 0.7) + height * 0.08;

          endX = -margin;

          endY = Math.max(
            height * 0.1,
            Math.min(height * 0.9, startY + (Math.random() - 0.4) * height * 0.65)
          );

        } else {

          startX = Math.random() < 0.5 ? width * 0.15 : width * 0.85;

          startY = -margin;

          endX = startX < width * 0.5 ? width + margin : -margin;

          endY = height + margin;
        }

        this.x = startX;
        this.y = startY;

        const dx = endX - startX;
        const dy = endY - startY;

        const distance = Math.hypot(dx, dy);

        const speed = Math.max(14, Math.min(23, distance / 92));

        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;

        const curveFactor = (Math.random() - 0.5) * 0.018;

        this.ax = -this.vy * curveFactor * 0.05;
        this.ay = this.vx * curveFactor * 0.05;
      }

      update() {

        this.trail.unshift({ x: this.x, y: this.y });

        if (this.trail.length > this.maxTrailLength) {
          this.trail.pop();
        }

        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        for (let i = 0; i < 3; i++) {

          this.dust.push({

            x: this.x + (Math.random() - 0.5) * 7,

            y: this.y + (Math.random() - 0.5) * 7,

            vx: -this.vx * (0.06 + Math.random() * 0.12) +
              (Math.random() - 0.5) * 1.3,

            vy: -this.vy * (0.06 + Math.random() * 0.12) +
              (Math.random() - 0.5) * 1.3,

            alpha: 0.95,

            size: Math.random() * 2.1 + 0.5
          });
        }

        for (let i = this.dust.length - 1; i >= 0; i--) {

          const d = this.dust[i];

          d.x += d.vx;
          d.y += d.vy;

          d.alpha -= 0.024;

          if (d.alpha <= 0) {
            this.dust.splice(i, 1);
          }
        }

        const offscreenMargin = 420;

        if (
          this.x < -offscreenMargin ||
          this.x > width + offscreenMargin ||
          this.y < -offscreenMargin ||
          this.y > height + offscreenMargin
        ) {
          this.alive = false;
        }
      }

      draw() {

        if (this.trail.length < 2) return;

        ctx.save();

        for (let i = 0; i < this.trail.length - 1; i++) {

          const p1 = this.trail[i];
          const p2 = this.trail[i + 1];

          const ratio = 1 - i / this.trail.length;

          ctx.beginPath();

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(56,189,248,${Math.pow(ratio, 1.6) * 0.65})`;

          ctx.lineWidth = ratio * 8;

          ctx.lineCap = "round";

          ctx.stroke();

          ctx.beginPath();

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(255,255,255,${Math.pow(ratio, 2.1) * 0.95})`;

          ctx.lineWidth = ratio * 2.8;

          ctx.stroke();
        }

        for (let d of this.dust) {

          ctx.fillStyle = `rgba(186,230,253,${d.alpha})`;

          ctx.beginPath();

          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);

          ctx.fill();
        }

        const headGlow = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, 32
        );

        headGlow.addColorStop(0, "rgba(255,255,255,1)");
        headGlow.addColorStop(0.25, "rgba(125,211,252,0.9)");
        headGlow.addColorStop(0.6, "rgba(56,189,248,0.28)");
        headGlow.addColorStop(1, "rgba(56,189,248,0)");

        ctx.fillStyle = headGlow;

        ctx.beginPath();

        ctx.arc(this.x, this.y, 32, 0, Math.PI * 2);

        ctx.fill();

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(this.x, this.y, 3.8, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
      }
    }

    function initStars() {

      const count = Math.min(
        CONFIG.maxStars,
        Math.max(
          CONFIG.minStars,
          Math.floor(width * height * CONFIG.starDensity)
        )
      );

      stars = [];

      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
    }

    function spawnComet() {

      comets.push(new Comet());

      lastCometTime = performance.now();
    }

    function triggerScatter(originX, originY) {

      cursor.scatterDisableUntil = performance.now() + 600;

      shockwaves.push({

        x: originX,
        y: originY,

        radius: 6,

        maxRadius: CONFIG.scatterRadius * 1.15,

        alpha: 0.95,

        lineWidth: 3.5,

        color: "56, 189, 248"
      });

      shockwaves.push({

        x: originX,
        y: originY,

        radius: 3,

        maxRadius: CONFIG.scatterRadius * 0.75,

        alpha: 0.8,

        lineWidth: 2,

        color: "255, 232, 175"
      });

      for (let i = 0; i < 30; i++) {

        const angle = (Math.PI * 2 * i) / 30 +
          (Math.random() - 0.5) * 0.25;

        const speed = 4 + Math.random() * 13;

        sparkParticles.push({

          x: originX,
          y: originY,

          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,

          alpha: 1,

          size: 1.2 + Math.random() * 2,

          color: i % 3 === 0 ? "255, 232, 175" : "125, 211, 252"
        });
      }

      for (const star of stars) {

        const dx = star.x - originX;
        const dy = star.y - originY;

        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.scatterRadius ** 2) {

          const dist = Math.sqrt(distSq) || 0.1;

          const angle = Math.atan2(dy, dx) +
            (Math.random() - 0.5) * 0.4;

          const falloff = Math.pow(
            1 - dist / CONFIG.scatterRadius,
            0.6
          );

          const impulse = CONFIG.scatterForce *
            falloff * (0.75 + Math.random() * 0.65);

          star.vx = Math.cos(angle) * impulse;
          star.vy = Math.sin(angle) * impulse;

          star.isCaptured = false;
        }
      }
    }

    function drawBackground() {

      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );

      bgGrad.addColorStop(0, "#080d1a");
      bgGrad.addColorStop(0.55, "#050811");
      bgGrad.addColorStop(1, "#03050a");

      ctx.fillStyle = bgGrad;

      ctx.fillRect(0, 0, width, height);

      for (const n of nebulaClouds) {

        const nebGrad = ctx.createRadialGradient(
          n.x, n.y, 0,
          n.x, n.y, n.r
        );

        nebGrad.addColorStop(0, `rgba(${n.color},${n.alpha})`);

        nebGrad.addColorStop(1, `rgba(${n.color},0)`);

        ctx.fillStyle = nebGrad;

        ctx.beginPath();

        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);

        ctx.fill();
      }
    }

    function drawMagneticCursor(now) {

      if (!cursor.active) return;

      cursor.renderX += (cursor.x - cursor.renderX) * 0.25;

      cursor.renderY += (cursor.y - cursor.renderY) * 0.25;

      cursor.pulsePhase += 0.055;

      const cx = cursor.renderX;
      const cy = cursor.renderY;

      const magnetActive = now > cursor.scatterDisableUntil;

      ctx.save();

      if (magnetActive) {

        ctx.lineWidth = 0.7;

        for (const s of stars) {

          if (s.isCaptured && s.distToCursor < 125) {

            const lineAlpha = (1 - s.distToCursor / 125) * 0.28;

            ctx.strokeStyle = `rgba(125,211,252,${lineAlpha})`;

            ctx.beginPath();

            ctx.moveTo(cx, cy);

            ctx.lineTo(s.x, s.y);

            ctx.stroke();
          }
        }
      }

      const pulse = Math.sin(cursor.pulsePhase) * 3.5;

      const ringRadius = 19 + pulse;

      const auraGrad = ctx.createRadialGradient(
        cx, cy, 0,
        cx, cy, ringRadius * 2.4
      );

      auraGrad.addColorStop(0, "rgba(56,189,248,0.26)");
      auraGrad.addColorStop(0.5, "rgba(56,189,248,0.07)");
      auraGrad.addColorStop(1, "rgba(56,189,248,0)");

      ctx.fillStyle = auraGrad;

      ctx.beginPath();

      ctx.arc(cx, cy, ringRadius * 2.4, 0, Math.PI * 2);

      ctx.fill();

      ctx.strokeStyle = cursor.isPressed
        ? "rgba(255,232,175,0.85)"
        : "rgba(56,189,248,0.6)";

      ctx.lineWidth = 1.4;

      ctx.beginPath();

      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);

      ctx.stroke();

      ctx.save();

      ctx.translate(cx, cy);

      ctx.rotate(cursor.pulsePhase * 0.45);

      ctx.strokeStyle = "rgba(135,220,255,0.42)";

      ctx.lineWidth = 1.2;

      const arcRadius = ringRadius + 7;

      for (let i = 0; i < 3; i++) {

        const startAngle = (i * Math.PI * 2) / 3;

        ctx.beginPath();

        ctx.arc(0, 0, arcRadius, startAngle, startAngle + 0.9);

        ctx.stroke();
      }

      ctx.restore();

      ctx.fillStyle = cursor.isPressed ? "#ffe8af" : "#ffffff";

      ctx.shadowColor = "#38bdf8";

      ctx.shadowBlur = 12;

      ctx.beginPath();

      ctx.arc(
        cursor.x,
        cursor.y,
        cursor.isPressed ? 5.2 : 3.8,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    }

    function updateAndDrawEffects() {

      for (let i = shockwaves.length - 1; i >= 0; i--) {

        const sw = shockwaves[i];

        sw.radius += (sw.maxRadius - sw.radius) * 0.14 + 3.5;

        sw.alpha *= 0.91;

        sw.lineWidth *= 0.96;

        ctx.save();

        ctx.beginPath();

        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);

        ctx.strokeStyle = `rgba(${sw.color},${sw.alpha})`;

        ctx.lineWidth = Math.max(0.5, sw.lineWidth);

        ctx.stroke();

        ctx.restore();

        if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      for (let i = sparkParticles.length - 1; i >= 0; i--) {

        const p = sparkParticles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.alpha -= 0.032;

        if (p.alpha <= 0) {
          sparkParticles.splice(i, 1);
          continue;
        }

        ctx.save();

        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
      }
    }

    function animate(now) {

      drawBackground();

      if (now - lastCometTime >= CONFIG.cometIntervalMs) {
        spawnComet();
      }

      for (const star of stars) {
        star.update(now);
        star.draw();
      }

      for (let i = comets.length - 1; i >= 0; i--) {

        comets[i].update();
        comets[i].draw();

        if (!comets[i].alive) {
          comets.splice(i, 1);
        }
      }

      updateAndDrawEffects();

      drawMagneticCursor(now);

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {

      cursor.x = e.clientX;
      cursor.y = e.clientY;

      if (!cursor.active) {

        cursor.renderX = e.clientX;
        cursor.renderY = e.clientY;

        cursor.active = true;
      }
    }

    function handleMouseDown(e) {

      cursor.isPressed = true;

      cursor.x = e.clientX;
      cursor.y = e.clientY;

      cursor.active = true;

      triggerScatter(e.clientX, e.clientY);
    }

    function handleMouseUp() {
      cursor.isPressed = false;
    }

    function handleMouseLeave() {
      cursor.active = false;
    }

    function handleTouch(e) {

      if (e.touches.length > 0) {

        const t = e.touches[0];

        cursor.x = t.clientX;
        cursor.y = t.clientY;

        cursor.renderX = t.clientX;
        cursor.renderY = t.clientY;

        cursor.active = true;
      }
    }

    function handleTouchEnd() {

      triggerScatter(cursor.x, cursor.y);

      cursor.active = false;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    const cometTimer = setTimeout(spawnComet, 1500);

    animationId = requestAnimationFrame(animate);

    return () => {

      cancelAnimationFrame(animationId);

      clearTimeout(cometTimer);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);

      window.removeEventListener("resize", resizeCanvas);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
    />
  );
}

export default AnimatedBackground;