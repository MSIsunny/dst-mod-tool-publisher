import logo from "./assets/app_logo.png";
import "./App.css";
import app_data from "./app-data.json";
import apple_logo from "./assets/apple.svg";
import win_logo from "./assets/win.svg";
import linux_logo from "./assets/linux.svg";
import React, { useEffect, useState } from "react";
import { CopyIcon } from "lucide-react";
import translations from "./translations";

function getInitialLang() {
    try {
        const saved = localStorage.getItem("dst_tool_lang");
        if (saved === "zh" || saved === "en") return saved;
    } catch (e) {
        // ignore
    }
    // default: zh if browser language indicates Chinese, otherwise en
    const nav =
        typeof navigator !== "undefined" ? navigator.language || "" : "";
    if (nav.startsWith("zh")) return "zh";
    return "en";
}

function persistLang(lang) {
    try {
        localStorage.setItem("dst_tool_lang", lang);
    } catch (e) {
        // ignore
    }
}

function useTranslation() {
    const [lang, setLang] = useState(getInitialLang());
    useEffect(() => {
        persistLang(lang);
    }, [lang]);

    function t(path, fallback = "") {
        // path like "introduction.title_q1" or "download.windows"
        const parts = path.split(".");
        let node = translations[lang];
        for (const p of parts) {
            if (node && Object.prototype.hasOwnProperty.call(node, p)) {
                node = node[p];
            } else {
                node = null;
                break;
            }
        }
        if (node == null) {
            // fallback to english if not found in current lang
            const fallbackNode = path
                .split(".")
                .reduce(
                    (acc, p) => (acc && acc[p] ? acc[p] : null),
                    translations.en,
                );
            return fallbackNode ?? fallback ?? path;
        }
        return node;
    }

    return { lang, setLang, t };
}

const CodeLine = ({ code, t }) => {
    // small wrapper to render a code block with a copy button and a translated tooltip/message
    return (
        <div className="code-block">
            <button
                className="copy-button"
                onClick={(event) => {
                    try {
                        navigator.clipboard.writeText(code);
                    } catch (e) {
                        // ignore if clipboard fails
                    }

                    // Create the success message
                    const successMessage = document.createElement("div");
                    successMessage.className = "copy-success";
                    successMessage.innerText = t("copied");

                    // Position the message near the mouse click
                    const { clientX, clientY } = event;
                    successMessage.style.top = `${clientY - 5}px`;
                    successMessage.style.left = `${clientX + 20}px`;

                    document.body.appendChild(successMessage);

                    // Trigger the animation
                    setTimeout(() => {
                        successMessage.classList.add("show");
                    }, 10);

                    // Remove the message after fade-out
                    setTimeout(() => {
                        successMessage.classList.remove("show");
                    }, 1000);

                    setTimeout(() => {
                        if (document.body.contains(successMessage)) {
                            document.body.removeChild(successMessage);
                        }
                    }, 1500);
                }}
                aria-label={t("copy")}
                title={t("copy")}
            >
                <CopyIcon size={16} strokeWidth={1.5} />
            </button>
            {code}
        </div>
    );
};

function Hspace(h) {
    return <div style={{ height: h }}></div>;
}

function AppTitleLogo({ t }) {
    return (
        <React.Fragment>
            <div className="Title">
                <img src={logo} className="App-logo" alt="logo" />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: "2.5em",
                        }}
                    >
                        {"DST Mod Tool"}
                    </div>
                    <div
                        style={{
                            fontSize: "0.75em",
                            color: "gray",
                        }}
                    >
                        {" "}
                        {t("latest_version")} {app_data.version}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function Introduction({ t }) {
    return (
        <React.Fragment>
            <div className="H-line" />
            <div className="Text-content">
                <div className="Text-content-title">
                    {t("introduction.title_q1")}
                </div>
                <div className="Text-content-body">
                    {t("introduction.body_q1")}
                </div>

                <div className="Text-content-title">
                    {t("introduction.title_q2")}
                </div>
                <div className="Text-content-body">
                    {t("introduction.body_q2")}
                </div>
                <CodeLine code={t("introduction.mac_quarantine_cmd")} t={t} />

                <div className="Text-content-title">
                    {t("introduction.title_q3")}
                </div>
                <div className="Text-content-body">
                    {t("introduction.body_q3")}
                </div>
            </div>
            <div className="H-line" />
        </React.Fragment>
    );
}

function DownloadButtons({ t }) {
    const version = app_data.version;
    return (
        <React.Fragment>
            <div className="Link-container">
                <a
                    className="App-link"
                    href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${version}/win-dst-mod-tool.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={win_logo} className="Platform-icon" alt="win" />
                    {t("download.windows")}
                </a>

                <a
                    className="App-link"
                    href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${version}/macos-dst-mod-tool.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={apple_logo}
                        className="Platform-icon"
                        alt="apple"
                    />
                    {t("download.macos")}
                </a>

                <a
                    className="App-link"
                    href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${version}/linux-dst-mod-tool.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={linux_logo}
                        className="Platform-icon"
                        alt="linux"
                    />
                    {t("download.linux")}
                </a>
            </div>
        </React.Fragment>
    );
}

function CommandLineGuide({ t }) {
    const ex = t("commandline.examples");
    return (
        <React.Fragment>
            <div style={{ fontSize: "1em", margin: "20px" }}>
                {t("commandline.title")}
            </div>
            <div className="H-line" />
            <div className="Text-content">
                <div className="Text-content-title">
                    {t("commandline.scml2zip_title")}
                </div>
                <CodeLine code={ex.scml2zip} t={t} />

                <div className="Text-content-title">
                    {t("commandline.zip2scml_title")}
                </div>
                <CodeLine code={ex.zip2scml} t={t} />

                <div className="Text-content-title">
                    {t("commandline.packtex_title")}
                </div>
                <CodeLine code={ex.packtex_dir} t={t} />
                <CodeLine code={ex.packtex_file} t={t} />

                <div className="Text-content-title">
                    {t("commandline.unpacktex_title")}
                </div>
                <CodeLine code={ex.unpacktex} t={t} />

                <div className="Text-content-title">
                    {t("commandline.splitatlas_title")}
                </div>
                <CodeLine code={ex.splitatlas} t={t} />

                {/* <div className="Text-content-title">
                    {t("commandline.note")}
                </div>*/}
            </div>
        </React.Fragment>
    );
}

function Questions({ t }) {
    return (
        <React.Fragment>
            <div style={{ fontSize: "1em", margin: "20px" }}>
                {t("faq.title")}
            </div>
            <div className="H-line" />
            <div className="Text-content">
                <div className="Text-content-title">
                    {t("faq.q_gif_export")}
                </div>
                <div className="Text-content-body">{t("faq.a_gif_export")}</div>

                {/* <div className="Text-content-title">
                    {t("faq.q_edge_incomplete")}
                </div>
                <div className="Text-content-body">
                    {t("faq.a_edge_incomplete")}
                </div>*/}

                <div className="Text-content-title">
                    {t("faq.q_scml_offset")}
                </div>
                <div className="Text-content-body">
                    {t("faq.a_scml_offset")}
                </div>

                <div className="Text-content-title">
                    {t("faq.q_no_transition")}
                </div>
                <div className="Text-content-body">
                    {t("faq.a_no_transition")}
                </div>
            </div>
        </React.Fragment>
    );
}

function SpineGuide({ t }) {
    return (
        <React.Fragment>
            <div style={{ fontSize: "1em", margin: "20px" }}>
                {t("spine.title")}
            </div>
            <div className="H-line" />
            <div className="Text-content">
                <div className="Text-content-title">{t("spine.how")}</div>
                <div className="Text-content-body">{t("spine.how_body")}</div>

                <div className="Text-content-title">
                    {t("spine.rules_title")}
                </div>
                <div className="Text-content-body">
                    {t("spine.rules").map((r, i) => (
                        <div key={i} style={{ marginTop: 4 }}>
                            {r}
                        </div>
                    ))}
                </div>
                <div className="Text-content-body">{t("spine.rules_note")}</div>

                <div className="Text-content-title">
                    {t("spine.mesh_support_title")}
                </div>
                <div className="Text-content-body">
                    {t("spine.mesh_support_body")}
                </div>

                <div className="Text-content-title">
                    {t("spine.char_template_title")}
                </div>
                <div className="Text-content-body">
                    {t("spine.char_template_body")}
                    <a
                        href="https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/guto-spine-char/guto-spine-char.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "cyan",
                        }}
                    >
                        Download
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}

function ChangeLog({ t }) {
    const changelog = t("changelog.entries");
    return (
        <React.Fragment>
            <div style={{ fontSize: "1em", margin: "20px" }}>
                {t("changelog.title")}
            </div>
            <div className="H-line" />
            <div className="Text-content">
                {changelog.map((entry, idx) => (
                    <React.Fragment key={idx}>
                        <div className="Text-content-title">{entry.date}</div>
                        <div className="Text-content-body">{entry.body}</div>
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    );
}

function Acknowledge({ t }) {
    return (
        <React.Fragment>
            <div style={{ fontSize: "1em", margin: "20px" }}>
                {t("acknowledge.title")}
            </div>
            <div className="H-line" />
            <div className="Text-content-title">{t("acknowledge.body")}</div>
        </React.Fragment>
    );
}

function LanguageToggle({ lang, setLang }) {
    // Accessible segmented control (like a radio group) for language selection.
    // - Keyboard: Tab to the group, arrow keys to switch, Enter/Space to activate.
    // - Clear labels and visible active state.
    const containerStyle = {
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 2000,
        // backgroundColor: "rgba(45, 50, 59, 0.95)",
        padding: "6px",
        borderRadius: 8,
        display: "flex",
        gap: 4,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        alignItems: "center",
    };

    const baseButton = {
        appearance: "none",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "white",
        padding: "6px 10px",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        lineHeight: "16px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 64,
        transition: "background-color 150ms ease, transform 80ms ease",
    };

    const activeButton = {
        background: "linear-gradient(180deg, #23395E 0%, #1B335C 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        transform: "translateY(-1px)",
    };

    const inactiveButton = {
        background: "transparent",
    };

    const languages = [
        { key: "zh", label: "中文" },
        { key: "en", label: "ENG" },
    ];

    const handleKeyDown = (e, index) => {
        const last = languages.length - 1;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            const next = index === last ? 0 : index + 1;
            setLang(languages[next].key);
            // Move focus to the next button by using DOM focus (the event target is the button)
            const nextBtn =
                e.currentTarget.parentElement.querySelectorAll(
                    '[role="radio"]',
                )[next];
            if (nextBtn) nextBtn.focus();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = index === 0 ? last : index - 1;
            setLang(languages[prev].key);
            const prevBtn =
                e.currentTarget.parentElement.querySelectorAll(
                    '[role="radio"]',
                )[prev];
            if (prevBtn) prevBtn.focus();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLang(languages[index].key);
        }
    };

    return (
        <div
            style={containerStyle}
            role="group"
            aria-label="Language selector"
            title="Language"
        >
            <div
                role="radiogroup"
                aria-label="Language"
                style={{ display: "flex", gap: 4 }}
            >
                {languages.map((l, i) => {
                    const isActive = lang === l.key;
                    return (
                        <button
                            key={l.key}
                            role="radio"
                            aria-checked={isActive}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setLang(l.key)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            style={{
                                ...baseButton,
                                ...(isActive ? activeButton : inactiveButton),
                                outline: "none",
                            }}
                            aria-label={
                                l.key === "zh"
                                    ? "切换为中文"
                                    : "Switch to English"
                            }
                            title={l.key === "zh" ? "中文" : "EN"}
                        >
                            <span style={{ pointerEvents: "none" }}>
                                {l.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function App() {
    const { lang, setLang, t } = useTranslation();

    // Provide a way for components to access the translation function and current language.
    // We'll add a small convenience so t("lang") returns current lang if needed.
    const tWithLang = (path, fallback) => {
        if (path === "lang") return lang;
        return t(path, fallback);
    };

    return (
        <div className="App">
            <LanguageToggle lang={lang} setLang={setLang} />
            <header className="App-header">
                <AppTitleLogo t={tWithLang} />

                <Introduction t={tWithLang} />

                <DownloadButtons t={tWithLang} />
                {Hspace(50)}

                <Questions t={tWithLang} />
                {Hspace(50)}

                <SpineGuide t={tWithLang} />
                {Hspace(50)}

                <CommandLineGuide t={tWithLang} />
                {Hspace(50)}

                <ChangeLog t={tWithLang} />
                {Hspace(50)}

                <Acknowledge t={tWithLang} />
                {Hspace(200)}
            </header>
        </div>
    );
}

export default App;
