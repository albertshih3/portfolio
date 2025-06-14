"use client";

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

const FirebaseAnalytics = () => {
  useEffect(() => {
    // Initialize analytics and log page view
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default FirebaseAnalytics;