"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

type PreferencesState = {
  analytics: boolean;
  marketing: boolean;
};

const backdropClasses =
  "fixed bottom-24 inset-0 bg-black/40 backdrop-blur-sm z-[9998] flex items-center justify-center px-4";

const panelClasses =
  "w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6";

const CookieBanner = () => {
  const {
    consent,
    isReady,
    isBannerVisible,
    isPreferencesOpen,
    hasAnalyticsConsent,
    acceptAll,
    rejectAll,
    updateConsent,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState<PreferencesState>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (isPreferencesOpen) {
      setLocalPreferences({
        analytics: Boolean(consent?.analytics),
        marketing: Boolean(consent?.marketing),
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreferencesOpen, consent]);

  const handleSavePreferences = () => {
    updateConsent(localPreferences);
    closePreferences();
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {isBannerVisible && (
        <div className="fixed bottom-4 left-1/2 z-[9999] w-full max-w-3xl -translate-x-1/2 px-4 md:px-0">
          <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 p-6 md:p-7">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  We value your privacy
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve
                  personalised content, and analyse our traffic. You can accept
                  all optional cookies, reject them, or tailor your preferences
                  by choosing “Manage settings”.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    rejectAll();
                  }}
                  className="order-2 cursor-pointer md:order-1 w-full md:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="order-3 cursor-pointer md:order-2 w-full md:w-auto px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Manage settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    acceptAll();
                  }}
                  className="order-1 cursor-pointer md:order-3 w-full md:w-auto px-6 py-2 text-sm font-semibold text-white rounded-full transition-colors"
                  style={{ backgroundColor: "#FF4036" }}
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className={backdropClasses} role="dialog" aria-modal="true">
          <div className={panelClasses}>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage cookie settings
              </h2>
              <p className="text-sm text-gray-600">
                Select which categories of cookies you consent to. You can
                update your choices at any time. Necessary cookies are always
                active because they keep the site running.
              </p>
            </div>

            <div className="space-y-4">
              <PreferenceRow
                title="Strictly necessary"
                description="Required for core site functionality and security."
                disabled
                checked
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand how the site is used so we can improve it."
                checked={localPreferences.analytics}
                onChange={(value) =>
                  setLocalPreferences((prev) => ({
                    ...prev,
                    analytics: value,
                  }))
                }
              />
              <PreferenceRow
                title="Marketing"
                description="Offers tailored promotions and adverts based on your browsing."
                checked={localPreferences.marketing}
                onChange={(value) =>
                  setLocalPreferences((prev) => ({
                    ...prev,
                    marketing: value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:items-center">
              <button
                type="button"
                onClick={closePreferences}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  rejectAll();
                }}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full cursor-pointer sm:w-auto px-6 py-2 text-sm font-semibold text-white rounded-full transition-colors"
                style={{ backgroundColor: "#FF4036" }}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PreferenceRow = ({
  title,
  description,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  description: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-start justify-between gap-4 border border-gray-200 rounded-xl p-4">
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(event) => onChange?.(event.target.checked)}
          disabled={disabled}
        />
        <span
          className="w-12 h-6 rounded-full transition-colors duration-200 bg-gray-300 peer-checked:bg-red-500 peer-disabled:bg-gray-200"
        />
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-6 peer-disabled:bg-gray-200" />
      </label>
    </div>
  );
};

export default CookieBanner;

