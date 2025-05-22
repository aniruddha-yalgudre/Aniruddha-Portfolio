import React, { useEffect, useRef } from 'react';

export default function UnicornEmbed() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1) Ensure the global object exists
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
    }

    // 2) If the UMD script isn’t loaded yet, inject it
    if (!window.UnicornStudio.isInitialized) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js';
      script.async = true;
      script.onload = () => {
        // Initialize the SDK once
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    } else {
      // If already loaded, just re‑init (will pick up our div)
      window.UnicornStudio.init();
    }
  }, []);

  return (
    <div
      ref={containerRef}
    //   data-us-project="JwRPm1WRNKnGfHcTwpC4"
      data-us-project="JwRPm1WRNKnGfHcTwpC4"

      className=' w-full h-screen top-0 left-0 '
    />
  );
}
