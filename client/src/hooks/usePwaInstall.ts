import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isChrome, setIsChrome] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone/installed mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes("android-app://");

    setIsInstalled(isStandalone);

    // Platform detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isAndroidDevice = /android/.test(ua);
    const inApp = /fban|fbav|instagram|messenger|whatsapp|threads|snapchat|tiktok|line|micromessenger/.test(ua);
    const chromeBrowser = /chrome|crios/.test(ua) && !/edg|opr|brave/.test(ua) && !inApp;

    setIsIos(isIosDevice);
    setIsAndroid(isAndroidDevice);
    setIsInAppBrowser(inApp);
    setIsChrome(chromeBrowser);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const openInChrome = () => {
    const currentHostAndPath = window.location.host + window.location.pathname + window.location.search;
    // Android Chrome Intent triggers genuine Google Chrome application
    window.location.href = `intent://${currentHostAndPath}#Intent;scheme=https;package=com.android.chrome;end`;
  };

  const promptInstall = async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
    if (!deferredPrompt) {
      return "unavailable";
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return choice.outcome;
    } catch {
      return "unavailable";
    }
  };

  return {
    canInstall: !!deferredPrompt,
    isInstalled,
    isIos,
    isAndroid,
    isInAppBrowser,
    isChrome,
    openInChrome,
    promptInstall,
  };
}
