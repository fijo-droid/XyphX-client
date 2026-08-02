export const trackEvent = async (eventName: string, properties: Record<string, any> = {}) => {
  try {
    // Generate or retrieve Visitor ID
    let visitorId = localStorage.getItem('xyphx_visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('xyphx_visitor_id', visitorId);
    }

    // Generate or retrieve Session ID
    let sessionId = sessionStorage.getItem('xyphx_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('xyphx_session_id', sessionId);
    }

    const payload = {
      eventName,
      visitorId,
      sessionId,
      deviceBrowser: getBrowser(),
      deviceOs: getOS(),
      properties: {
        ...properties,
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer
      }
    };

    // Replace with the actual endpoint, assuming admin.xyphx.com is running locally on some port or deployed
    // In a real environment, you'd use import.meta.env.VITE_ANALYTICS_URL
    const endpoint = window.location.hostname.includes('localhost') 
      ? 'http://localhost:8080/api/public/analytics/track' 
      : 'https://admin.xyphx.com/api/public/analytics/track';

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // Keepalive ensures the request finishes even if the user navigates away
      keepalive: true 
    });
  } catch (error) {
    console.error('Failed to track event', error);
  }
};

// Simple OS detector
function getOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('Win') !== -1) return 'Windows';
  if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
  if (userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux';
  if (/Android/.test(userAgent)) return 'Android';
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
  return 'Unknown';
}

// Simple Browser detector
function getBrowser() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('SamsungBrowser') > -1) return 'Samsung Browser';
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
  if (userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
  if (userAgent.indexOf('Edge') > -1) return 'Edge';
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  return 'Unknown';
}
