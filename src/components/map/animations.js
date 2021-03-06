export default function useAnimation(map) {
  const fit = layer => map.flyToBounds(layer.getBounds());

  const tracePath = layer => {
    const SPEED = 100; // 100 px/s
    const path = document.querySelector(`.${layer.options.className}`);
    path.style.opacity = 0;
    fit(layer);
    map.once('moveend', () => {
      const length = path.getTotalLength();
      const duration = length / SPEED;
      path.setAttribute('stroke-dasharray', length);
      path.setAttribute('stroke-dashoffset', length);
      path.style.opacity = 1;
      path.style.animation = `trace-path ${duration}s linear forwards`;
      setTimeout(() => { path.setAttribute('stroke-dasharray', 0); }, duration * 1000);
    });
  };

  return { fit, tracePath };
}
