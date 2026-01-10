import logo from "./assets/app_logo.png";
import "./App.css";
import app_data from "./app-data.json";
import apple_logo from "./assets/apple.svg";
import win_logo from "./assets/win.svg";
import linux_logo from "./assets/linux.svg";
import React, { useEffect, useState } from "react";
import { CopyIcon } from "lucide-react";

const translations = {
    zh: {
        app_name: "饥荒模组工具",
        latest_version: "latest version:",
        download: {
            windows: "Windows",
            macos: "MacOS",
            linux: "Linux",
        },
        copy: "复制",
        copied: "已复制",
        introduction: {
            title_q1: "1、这个工具可以做什么？",
            body_q1:
                "这是一个饥荒模组动画和贴图工具。动画方面，可以预览动画，修改动画，支持zip和scml的互相转化，修复了官方打包和ktools解包的一些问题；贴图方面，可以预览tex纹理，根据xml切割tex纹理，支持将多张图合并进一个tex并生成xml。",
            title_q2: "2、mac系统下提示软件损坏？",
            body_q2:
                "软件本身没有问题，但是mac系统默认不允许未知来源的app运行。请在终端中运行以下命令，将/path/to/app替换为实际app路径",
            title_q3: "3、如果遇到问题和错误？",
            body_q3:
                "可以将问题反馈给我，QQ: 2380749795，e-mail: 2380749795@qq.com",
            mac_quarantine_cmd:
                "sudo xattr -r -d com.apple.quarantine /path/to/app",
        },
        commandline: {
            title: "命令行使用",
            scml2zip_title: "打包scml到zip",
            zip2scml_title: "解包zip到scml",
            packtex_title: "打包png到tex和xml",
            unpacktex_title: "解包tex到png",
            splitatlas_title: "根据xml切图",
            note: "（注：所有输入输出文件路径请使用绝对路径）",
            examples: {
                scml2zip: "dst-mod-tool.exe input.scml output.zip --scml2zip",
                zip2scml: "dst-mod-tool.exe input.zip output.scml --zip2scml",
                packtex_dir: "dst-mod-tool.exe input_dir output_dir --packtex",
                packtex_file: "dst-mod-tool.exe input.png output_dir --packtex",
                unpacktex: "dst-mod-tool.exe input.tex output.png --unpacktex",
                splitatlas:
                    "dst-mod-tool.exe input.xml output_dir --splitatlas",
            },
        },
        faq: {
            title: "常见问题",
            q_gif_export: "如何将动画导出为GIF或序列图",
            a_gif_export: "在Animation列表额外操作里选择导出GIF或序列图",
            q_edge_incomplete: "导出的GIF和序列图边缘不完整",
            a_edge_incomplete: "在Bank列表额外操作里选择重新计算包围盒",
            q_scml_offset: "反编译到Scml的动画有轻微错位",
            a_scml_offset:
                "Spriter不支持图片的倾斜变换，因此无法完美表征部分饥荒动画，解决方案是直接复用官方的Bank或反编译到Spine",
            q_no_transition: "反编译到Scml的动画帧间没有过渡",
            a_no_transition:
                "饥荒的动画格式是逐帧动画，而Spriter默认是帧间线性插值。为了保证动画的一致性，避免帧间插值错误，因此反编译的帧过渡模式均为instant，可手动修改为linear",
        },
        spine: {
            title: "Spine打包须知",
            how: "如何打包",
            how_body:
                "将Spine动画导出为json文件，确保和images文件夹同层级，然后将json文件拖入工具",
            rules_title: "命名&打包规则",
            rules: [
                "1、插槽(slot)名称 = [layer][-数字后缀]",
                "2、图片区域(region)名称 = [symbol_name]-[frame_num]",
                "3、动画文件夹名称 = [bank_name]",
            ],
            rules_note: "推荐按照规则命名，反之并不会导致打包失败",
            mesh_support_title: "现已支持网格功能",
            mesh_support_body:
                "支持使用了网格的Spine动画，可以导出为zip动画包在游戏内使用",
            char_template_title: "角色动画模板",
            char_template_body:
                "如果你希望用spine来制作人物动画，这里有一份由杰出动画师制作的带骨骼绑定的人物动画模板: ",
        },
        changelog: {
            title: "更新日志",
            entries: [
                {
                    date: "2026.01.07 V0.3.0",
                    body: "支持打包含有网格(mesh)的Spine动画；优化了动画播放；优化了PNG和序列图的导出。",
                },
                {
                    date: "2025.12.29 V0.2.9",
                    body: "支持导出APNG格式的动图；Anti-FollowSymbol功能支持限定num；打包Spine动画时，根据skin区分build；打包武器动画时自动复用图片；打包Atlas时支持向外拓展边缘，适合打包tile；资源搜索支持限定xml中的tex，以及限定mod；动画工具所有列表末尾添加项目数量统计；修复和优化了一些问题。",
                },
                {
                    date: "2025.12.07 V0.2.8",
                    body: "支持导出动画单帧为PNG；资源搜索可以切换排序模式(最后修改时间/字母表排序)；资源搜索可以筛选Tex的具体细分类型；修复和优化了一些问题。",
                },
                {
                    date: "2025.11.15 V0.2.7",
                    body: "修复和优化了一些问题。",
                },
                {
                    date: "2025.10.19 V0.2.6",
                    body: "添加资源检索功能，可以检索饥荒联机(DST)、饥荒单机(DS)以及模组(Mod)的动画和贴图资源，对于部分来源于饥荒联机(DST)的资源，支持中文搜索。",
                },
                {
                    date: "2025.10.05 V0.2.5",
                    body: "预览tex纹理时可以选择是否预除alpha；预览zip和dyn中的纹理时可以选择分页；dyn和对应的build在同一目录下时可以直接导入动画工具；导出动画时可以选择是否导出build中的隐藏项目；导出动画到zip时可以选择是否启用顶点优化和生成mipmap。",
                },
                {
                    date: "2025.09.19 V0.2.4",
                    body: "添加Anti-FollowSymbol功能；优化上下文菜单(右键菜单)；FollowSymbol功能添加设置本地旋转、缩放功能；导出spine支持将整体变换拆分为双层骨骼。",
                },
                {
                    date: "2025.09.11 V0.2.3",
                    body: "优化导出GIF质量，并且现在可以自定义背景颜色；添加正则匹配删除替换功能；添加FollowSymbol功能；添加上下文菜单(右键菜单)；导出spine动画时相同的layer会绑定到同一个父骨骼下；现在支持打包16384尺寸的纹理贴图。",
                },
                {
                    date: "2025.09.05 V0.2.2",
                    body: "Element和AnimFrame列表现在支持多选，以及拖动调整顺序；没有图片的Element现在也可选中，表现为半透明红色矩形框；添加幻影视图(洋葱皮)功能，可以向前或者向后预览；添加OverrideSymbol功能；优化HideLayer功能；一些其他功能优化和问题修复。",
                },
                {
                    date: "2025.08.28 V0.2.1",
                    body: "优化缩放操作，现在可以单独缩放某一个轴向，也可以整体等比例缩放(按住Shift)；选中一个或多个元素后，按上/下箭头按键可以调整图层顺序；现在可以在SymbolFrame面板预览图片(小眼睛图标)，并且可以将图片直接拖入动画视口；添加中英文语言切换功能。",
                },
                {
                    date: "2025.08.22 V0.2.0",
                    body: "动画工具添加高亮选中元素以及拖动框选功能，可以进行平移、旋转、缩放、复制、粘贴等操作；添加快捷键Tab快速切换视图；添加对熔炉密林动画和纹理图的支持；现在导出动画为zip时默认覆盖同名文件。",
                },
                {
                    date: "2025.08.13 V0.1.10",
                    body: "优化和修复了一些已知的问题。",
                },
                {
                    date: "2025.08.08 V0.1.9",
                    body: "动画工具添加操作历史面板，支持回溯30条操作记录，可以使用快捷键[Ctrl/Cmd + Z]快速撤销，[Ctrl/Cmd + Y]或[Ctrl/Cmd + Shift + Z]快速重做；修复了一些已知的问题。",
                },
                {
                    date: "2025.08.03 V0.1.8",
                    body: "添加将动画导出到spine的功能；优化打包spine动画。",
                },
                {
                    date: "2025.07.30 V0.1.7",
                    body: "添加命令行使用方式：[APP路径] [输入路径] [输出路径] --[参数]，参数可选scml2zip或zip2scml。添加导入spine动画功能（测试），支持3.8和4.2版本。被导入的json文件需要和图片文件夹同层级或在图片文件夹内。spine和饥荒动画对应的规则如下：1、插槽名称 = [layer][-数字后缀]。2、图片区域名称 = [symbol_name]-[frame_num]。3、动画文件夹名称 = [bank_name]。如果你不在意上述参数，那么也可以不按照这个规则命名。",
                },
                {
                    date: "2025.07.17 V0.1.6",
                    body: "添加修改图片红点并保持动画效果不变的功能；内置人物参考动画，方便观察角色贴图是否错位；可以将本软件作为zip、tex、scml、xml等文件的打开方式。",
                },
                {
                    date: "2025.07.10 V0.1.5",
                    body: "添加批量替换/删除symbol/layer的功能；添加从GIF以及序列图构建动画的功能；优化搜索筛选symbol/layer的性能表现；添加高亮显示选中的element的功能。",
                },
                {
                    date: "2025.07.01 V0.1.4",
                    body: "修复了打包scml时可能出现的错误。",
                },
                {
                    date: "2025.06.20 V0.1.3",
                    body: "添加批量打包scml的功能；修复了打包scml时可能出现的错误；透明度始终为0的时间线将不会被打包。",
                },
            ],
        },
        acknowledge: {
            title: "致谢",
            body: "本工具的灵感及布局风格来自Jerry457的网页工具，并在开发过程中受到他的很多帮助，特此感谢！",
            jerry_link_text: "Jerry457",
        },
    },

    en: {
        app_name: "DST Mod Tool",
        latest_version: "latest version:",
        download: {
            windows: "Windows",
            macos: "MacOS",
            linux: "Linux",
        },
        copy: "Copy",
        copied: "Copied",
        introduction: {
            title_q1: "1. What can this tool do?",
            body_q1:
                "This tool is designed for DST (Don't Starve Together) mod animations and textures. For animations, it allows you to preview, edit, convert between zip and scml formats, and resolve issues related to official packing or ktools unpacking. For textures, you can preview `.tex` files, slice them based on `.xml`, and merge multiple images into a single `.tex` file with a corresponding `.xml`.",
            title_q2: "2. macOS shows app is damaged?",
            body_q2:
                "The app itself is fine, but macOS blocks unknown apps by default. Run the following command in Terminal, replacing /path/to/app with the actual app path:",
            title_q3: "3. Found bugs or issues?",
            body_q3:
                "You can send feedback to me via QQ: 2380749795 or e-mail: 2380749795@qq.com",
            mac_quarantine_cmd:
                "sudo xattr -r -d com.apple.quarantine /path/to/app",
        },
        commandline: {
            title: "Command-line usage",
            scml2zip_title: "Pack scml to zip",
            zip2scml_title: "Unpack zip to scml",
            packtex_title: "Pack png to tex and xml",
            unpacktex_title: "Unpack tex to png",
            splitatlas_title: "Slice images according to xml",
            note: "(Note: Ensure all input and output file paths are absolute paths, such as `/Users/username/path/to/file`.)",
            examples: {
                scml2zip: "dst-mod-tool.exe input.scml output.zip --scml2zip",
                zip2scml: "dst-mod-tool.exe input.zip output.scml --zip2scml",
                packtex_dir: "dst-mod-tool.exe input_dir output_dir --packtex",
                packtex_file: "dst-mod-tool.exe input.png output_dir --packtex",
                unpacktex: "dst-mod-tool.exe input.tex output.png --unpacktex",
                splitatlas:
                    "dst-mod-tool.exe input.xml output_dir --splitatlas",
            },
        },
        faq: {
            title: "FAQ",
            q_gif_export: "How to export an animation as GIF or frames?",
            a_gif_export:
                "In the Animation list, select 'Export GIF' or 'Export Frames' from the additional options.",
            q_edge_incomplete: "Exported GIF/frames have incomplete edges",
            a_edge_incomplete:
                "In the Bank list, select 'Recompute Bounding Box' from the additional options.",
            q_scml_offset: "Decompiled Scml animation has slight offsets",
            a_scml_offset:
                "Spriter doesn't support skew transforms of images, so some DST animations can't be represented perfectly. Use the official Bank or decompile to Spine as a workaround.",
            q_no_transition:
                "No interpolation between frames in decompiled Scml",
            a_no_transition:
                "DST animation format is frame-by-frame while Spriter uses linear interpolation by default. To keep animation consistency and avoid interpolation artifacts, decompiled frames use 'instant' transition. You can change them to 'linear' manually.",
        },
        spine: {
            title: "Spine packing notes",
            how: "How to pack",
            how_body:
                "Export the Spine animation as a JSON file, and make sure it is in the same directory as the images folder. Then, drag the JSON file into the tool.",
            rules_title: "Naming & packing rules",
            rules: [
                "1. Slot name = [layer][-numeric-suffix]",
                "2. Region name = [symbol_name]-[frame_num]",
                "3. Animation folder name = [bank_name]",
            ],
            rules_note:
                "Following the rules is recommended for better results, but not mandatory.",
            mesh_support_title: "Mesh support available",
            mesh_support_body:
                "Spine animations that use meshes are supported and can be exported to zip animation packages for in-game use.",
            char_template_title: "Character animation template",
            char_template_body:
                "If you want to create character animations using Spine, here is a great template with skeleton bindings made by an excellent animator: ",
        },
        changelog: {
            title: "Change Log",
            entries: [
                {
                    date: "2026.01.07 V0.3.0",
                    body: "Support packing Spine animations that include meshes; improved animation playback; improved PNG and frame export.",
                },
                {
                    date: "2025.12.29 V0.2.9",
                    body: "Support exporting APNG; Anti-FollowSymbol supports limiting num; separate builds by skin when packing Spine; reuse images automatically when packing weapon animations; support expanding atlas edges for tiles; resource search can limit tex in xml and limit by mod; added item counts for lists in the animation tool; various fixes and optimizations.",
                },
                {
                    date: "2025.12.07 V0.2.8",
                    body: "Support exporting single animation frames as PNG; resource search can toggle sort mode (last modified / alphabetical); resource search can filter tex subtypes; fixes and optimizations.",
                },
                {
                    date: "2025.11.15 V0.2.7",
                    body: "Fixes and optimizations.",
                },
                {
                    date: "2025.10.19 V0.2.6",
                    body: "Added resource search supporting DST, DS and Mod animations and textures; Chinese search supported for some DST-sourced resources.",
                },
                {
                    date: "2025.10.05 V0.2.5",
                    body: "Option to premultiply alpha when previewing tex; pagination for previewing zip and dyn textures; import animation when dyn and build are in the same folder; option to export hidden items from build; options for vertex optimization and generating mipmaps when exporting to zip.",
                },
                {
                    date: "2025.09.19 V0.2.4",
                    body: "Added Anti-FollowSymbol; improved context menus; FollowSymbol can set local rotation/scale; export to spine can split transforms into two-layer bones.",
                },
                {
                    date: "2025.09.11 V0.2.3",
                    body: "Improved GIF export quality and added custom background color; added regex replace/delete; added FollowSymbol and context menus; same layer names bind under the same parent when exporting spine; support packing 16384 texture size.",
                },
                {
                    date: "2025.09.05 V0.2.2",
                    body: "Element and AnimFrame lists support multi-select and drag-reorder; elements without images are selectable and rendered as semi-transparent red rectangles; added onion-skin preview; added OverrideSymbol; improved HideLayer; assorted fixes and optimizations.",
                },
                {
                    date: "2025.08.28 V0.2.1",
                    body: "Improved scaling operations with axis-specific scaling and uniform scaling (hold Shift); arrow keys move layer order; preview image in SymbolFrame panel and drag into viewport; added Chinese/English language switch.",
                },
                {
                    date: "2025.08.22 V0.2.0",
                    body: "Added highlight selection and drag selection in animation tool; support for translate/rotate/scale/copy/paste; Tab to switch views; added support for Furnace and Jungle animations/textures; exporting to zip now overwrites by default.",
                },
                {
                    date: "2025.08.13 V0.1.10",
                    body: "Various fixes and improvements.",
                },
                {
                    date: "2025.08.08 V0.1.9",
                    body: "Added action history panel with 30 steps undo; use Ctrl/Cmd+Z to undo, Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z to redo; various fixes.",
                },
                {
                    date: "2025.08.03 V0.1.8",
                    body: "Added export to spine and improved spine packing.",
                },
                {
                    date: "2025.07.30 V0.1.7",
                    body: "Added CLI usage: [APP_PATH] [INPUT] [OUTPUT] --[param] (scml2zip or zip2scml). Added experimental spine import supporting v3.8 and v4.2; json must be at same level as images folder or inside it. Spine <-> DST rules: 1) slot name = [layer][-num]; 2) region name = [symbol_name]-[frame_num]; 3) animation folder = [bank_name]. You may ignore these rules if you don't care.",
                },
                {
                    date: "2025.07.17 V0.1.6",
                    body: "Added feature to change image hotspots without breaking animation; built-in reference animations for character alignment checks; app can be registered as open-with handler for zip/tex/scml/xml etc.",
                },
                {
                    date: "2025.07.10 V0.1.5",
                    body: "Added batch replace/delete for symbol/layer; build animation from GIF or frames; improved search/filter performance; highlight selected element.",
                },
                {
                    date: "2025.07.01 V0.1.4",
                    body: "Fixed potential issues when packing scml.",
                },
                {
                    date: "2025.06.20 V0.1.3",
                    body: "Added batch packing scml; fixed some scml packing issues; timelines with permanent 0 opacity won't be packed.",
                },
            ],
        },
        acknowledge: {
            title: "Acknowledgement",
            body: "This tool's design was inspired by Jerry457's web tool, with his helpful guidance.",
            jerry_link_text: "Jerry457",
        },
    },
};

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

                <div className="Text-content-title">
                    {t("commandline.note")}
                </div>
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

                <div className="Text-content-title">
                    {t("faq.q_edge_incomplete")}
                </div>
                <div className="Text-content-body">
                    {t("faq.a_edge_incomplete")}
                </div>

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
