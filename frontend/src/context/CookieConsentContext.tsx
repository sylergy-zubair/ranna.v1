"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextValue = {
  consent: ConsentCategories | null;
  isReady: boolean;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  hasAnalyticsConsent: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (categories: Partial<ConsentCategories>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  resetConsent: () => void;
};

const STORAGE_KEY = "cookie-consent";

const defaultConsent: ConsentCategories = {
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined,
);

export const CookieConsentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [consent, setConsent] = useState<ConsentCategories | null | undefined>(
    undefined,
  );
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentCategories;
        setConsent({
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      } else {
        setConsent(null);
      }
    } catch (error) {
      console.error("Failed to read cookie consent from storage", error);
      setConsent(null);
    }
  }, []);

  const persistConsent = useCallback((next: ConsentCategories | null) => {
    if (typeof window === "undefined") {
      return;
    }

    if (next === null) {
      window.localStorage.removeItem(STORAGE_KEY);
      setConsent(null);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({ analytics: true, marketing: true });
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const rejectAll = useCallback(() => {
    persistConsent({ analytics: false, marketing: false });
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const updateConsent = useCallback(
    (categories: Partial<ConsentCategories>) => {
      const current = consent ?? defaultConsent;
      const next: ConsentCategories = {
        analytics:
          categories.analytics !== undefined
            ? categories.analytics
            : current.analytics,
        marketing:
          categories.marketing !== undefined
            ? categories.marketing
            : current.marketing,
      };

      persistConsent(next);
    },
    [consent, persistConsent],
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    persistConsent(null);
    setIsPreferencesOpen(true);
  }, [persistConsent]);

  const value = useMemo<CookieConsentContextValue>(() => {
    const isReady = consent !== undefined;
    const concreteConsent = consent ?? null;

    return {
      consent: concreteConsent,
      isReady,
      isBannerVisible: isReady && concreteConsent === null,
      isPreferencesOpen,
      hasAnalyticsConsent: Boolean(concreteConsent?.analytics),
      acceptAll,
      rejectAll,
      updateConsent,
      openPreferences,
      closePreferences,
      resetConsent,
    };
  }, [consent, isPreferencesOpen, acceptAll, rejectAll, updateConsent, openPreferences, closePreferences, resetConsent]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
};

