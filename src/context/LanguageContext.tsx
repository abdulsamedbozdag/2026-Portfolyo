"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations } from "@/lib/translations";

type Language = "tr" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
    /** Inline translation: returns `en` when English is active, otherwise `tr`. */
    tx: <T,>(tr: T, en: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            try {
                const savedLang = localStorage.getItem("language") as Language;
                return savedLang || "tr";
            } catch (e) {
                return "tr";
            }
        }
        return "tr";
    });

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    }, []);

    const t = useCallback((path: string): any => {
        const keys = path.split(".");
        let result: any = translations[language];

        for (const key of keys) {
            if (result?.[key] === undefined) {
                return path;
            }
            result = result[key];
        }
        return result;
    }, [language]);

    const tx = useCallback(<T,>(tr: T, en: T): T => (language === "en" ? en : tr), [language]);

    const value = useMemo(() => ({ language, setLanguage, t, tx }), [language, setLanguage, t, tx]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
