"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        formData.append("access_key", "8019752d-807f-4674-adb6-a2d055704385");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
            } else {
                setErrorMessage(data.message || "An error occurred");
                setStatus("error");
            }
        } catch (error) {
            setErrorMessage("Failed to send message. Please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 rounded-[2.5rem] p-12 text-center max-w-xl mx-auto"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 size={32} />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Teşekkürler!</h3>
                <p className="text-foreground/60 leading-relaxed">
                    Mesajınız başarıyla iletildi. En kısa sürede size geri dönüş yapacağım.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm text-foreground/50 hover:text-foreground transition-colors underline underline-offset-4"
                >
                    Yeni bir mesaj gönder
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Ad Soyad"
                            aria-label="Ad Soyad"
                            autoComplete="name"
                            className="w-full bg-foreground/[0.03] border border-foreground/15 rounded-2xl px-5 py-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus:border-foreground/40 focus:bg-foreground/[0.05] transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="E-posta Adresi"
                            aria-label="E-posta Adresi"
                            autoComplete="email"
                            className="w-full bg-foreground/[0.03] border border-foreground/15 rounded-2xl px-5 py-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus:border-foreground/40 focus:bg-foreground/[0.05] transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Konu"
                        aria-label="Konu"
                        className="w-full bg-foreground/[0.03] border border-foreground/15 rounded-2xl px-5 py-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus:border-foreground/40 focus:bg-foreground/[0.05] transition-all"
                    />
                </div>

                <div className="space-y-1">
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Mesajınız..."
                        aria-label="Mesajınız"
                        className="w-full bg-foreground/[0.03] border border-foreground/15 rounded-2xl px-5 py-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus:border-foreground/40 focus:bg-foreground/[0.05] transition-all resize-none"
                    />
                </div>

                <AnimatePresence>
                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 text-red-400 text-sm px-4"
                        >
                            <AlertCircle size={14} />
                            <span>{errorMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full relative group overflow-hidden bg-foreground text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background py-4 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                >
                    <div className="flex items-center justify-center gap-2">
                        {status === "loading" ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Gönderiliyor...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>Mesaj Gönder</span>
                            </>
                        )}
                    </div>
                </button>
            </form>
        </div>
    );
}
