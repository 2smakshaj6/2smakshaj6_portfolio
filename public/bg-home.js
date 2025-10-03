export const FNAV_BG = (() => {
  let raf = null, canvas, gl;
  function start() {
    if (raf) return;
    try {
      canvas ||= document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;width:100%;height:100%;';
      if (!canvas.isConnected) document.body.appendChild(canvas);
      gl = gl || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return stop();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const resize = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; gl.viewport(0,0,canvas.width,canvas.height); };
      resize(); window.addEventListener('resize', resize, { passive: true });
      let t0 = performance.now();
      const loop = () => {
        const t = (performance.now() - t0) * 0.0003;
        gl.clearColor(0.05 + 0.05*Math.sin(t), 0.08 + 0.06*Math.sin(t*1.3), 0.12 + 0.05*Math.cos(t*0.8), 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } catch { stop(); }
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (canvas && canvas.isConnected) canvas.remove();
  }
  return { start, stop };
})();

window.FNAV_BG = FNAV_BG;


