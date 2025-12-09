export type Click = {
  id: string;
  linkId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  device: {
    userAgent: string;
    os: string;
    browser: string;
  };
};

// In-memory store for demonstration purposes
const clicks: Click[] = [];

// Helper to parse user agent string
const parseUserAgent = (userAgent: string) => {
  let os = 'Unknown';
  let browser = 'Unknown';

  if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';

  if (/firefox/i.test(userAgent) && !/seamonkey/i.test(userAgent)) browser = 'Firefox';
  else if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) browser = 'Chrome';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
  else if (/edg/i.test(userAgent)) browser = 'Edge';
  else if (/msie|trident/i.test(userAgent)) browser = 'Internet Explorer';

  return { os, browser };
};


export const addClick = async (
  linkId: string,
  userAgent: string,
  location: { latitude: number, longitude: number } | null
): Promise<Click> => {
  const newClick: Click = {
    id: `click_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    linkId,
    timestamp: new Date(),
    location,
    device: {
        userAgent,
        ...parseUserAgent(userAgent),
    },
  };
  clicks.unshift(newClick);
  return newClick;
};

export const getClicks = async (): Promise<Click[]> => {
  await new Promise(res => setTimeout(res, 50));
  return clicks;
};

export const getDashboardStats = async () => {
  const allClicks = await getClicks();
  const totalClicks = allClicks.length;
  const uniqueLinks = new Set(allClicks.map(c => c.linkId)).size;
  const clicksWithLocation = allClicks.filter(c => c.location).length;

  return { totalClicks, uniqueLinks, clicksWithLocation };
};
