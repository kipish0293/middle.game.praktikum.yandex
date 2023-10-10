export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export function registerFullScreenEvents() {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'KeyF') {
      document.documentElement.requestFullscreen();
    }

    if (e.code === 'Escape') {
      document.exitFullscreen();
    }
  });
}
