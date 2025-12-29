import logo from "./assets/app_logo.png";
import "./App.css";
import app_data from "./app-data.json";
import apple_logo from "./assets/apple.svg";
import win_logo from "./assets/win.svg";
import linux_logo from "./assets/linux.svg";
import React from "react";
import { CopyIcon } from "lucide-react";

const CodeLine = (code) => {
    return (
        <div className="code-block">
            <button
                className="copy-button"
                onClick={(event) => {
                    navigator.clipboard.writeText(code);

                    // Create the success message
                    const successMessage = document.createElement("div");
                    successMessage.className = "copy-success";
                    successMessage.innerText = "Copied";

                    // Position the message near the mouse click
                    const { clientX, clientY } = event;
                    successMessage.style.top = `${clientY - 5}px`; // Align with mouse center
                    successMessage.style.left = `${clientX + 20}px`; // Offset slightly to the right

                    document.body.appendChild(successMessage);

                    // Trigger the animation
                    setTimeout(() => {
                        successMessage.classList.add("show");
                    }, 10);

                    // Remove the message after 2 seconds
                    // Remove the 'show' class after 2 seconds to trigger fade-out
                    setTimeout(() => {
                        successMessage.classList.remove("show");
                    }, 1000);

                    // Remove the element after the fade-out transition
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                    }, 1500); // Ensure this is longer than the CSS transition duration
                }}
                aria-label="Copy to clipboard"
            >
                <CopyIcon size={16} strokeWidth={1.5} />
            </button>
            {code}
        </div>
    );
};

const AppTitleLogo = (
    <React.Fragment>
        {/* app-logo title version */}
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
                    {app_data.name}
                </div>
                <div
                    style={{
                        fontSize: "0.75em",
                        color: "gray",
                    }}
                >
                    {" "}
                    latest version: {app_data.version}
                </div>
            </div>
        </div>
    </React.Fragment>
);

const Introduction = (
    <React.Fragment>
        <div className="H-line" />
        <div className="Text-content">
            <div className="Text-content-title">1、这个工具可以做什么？</div>
            <div className="Text-content-body">
                &ensp;&ensp;这是一个饥荒模组动画和贴图工具。
                动画方面，可以预览动画，修改动画，支持zip和scml的互相转化，修复了官方打包和ktool解包的一些问题；
                贴图方面，可以预览tex纹理，根据xml切割tex纹理，支持将多张图合并进一个tex并生成xml。
            </div>
            <div className="Text-content-title">2、mac系统下提示软件损坏？</div>
            <div className="Text-content-body">
                &ensp;&ensp;软件本身没有问题，但是mac系统默认不允许未知来源的app运行。请在终端中运行以下命令，
                将/path/to/app替换为实际app路径
            </div>
            {CodeLine("sudo xattr -r -d com.apple.quarantine /path/to/app")}

            <div className="Text-content-title">3、如果遇到问题和错误？</div>
            <div className="Text-content-body">
                &ensp;&ensp;可以将问题反馈给我，QQ: 2380749795，e-mail:
                2380749795@qq.com
            </div>
        </div>
        <div className="H-line" />
    </React.Fragment>
);

const DownlodBtn = (
    <React.Fragment>
        <div className="Link-container">
            <a
                className="App-link"
                href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/win-dst-mod-tool.zip`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={win_logo} className="Platform-icon" alt="win" />
                Windows
            </a>

            <a
                className="App-link"
                href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/macos-dst-mod-tool.zip`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={apple_logo} className="Platform-icon" alt="apple" />
                MacOS
            </a>

            <a
                className="App-link"
                href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/linux-dst-mod-tool.zip`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={linux_logo} className="Platform-icon" alt="apple" />
                Linux
            </a>
        </div>
    </React.Fragment>
);

const CommandLineGuide = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            命令行使用{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content">
            <div className="Text-content-title"> 打包scml到zip </div>
            {CodeLine("dst-mod-tool.exe input.scml output.zip --scml2zip")}

            <div className="Text-content-title"> 解包zip到scml </div>
            {CodeLine("dst-mod-tool.exe input.zip output.scml --zip2scml")}

            <div className="Text-content-title"> 打包png到tex和xml </div>
            {CodeLine("dst-mod-tool.exe input_dir output_dir --packtex")}
            {CodeLine("dst-mod-tool.exe input.png output_dir --packtex")}

            <div className="Text-content-title"> 解包tex到png </div>
            {CodeLine("dst-mod-tool.exe input.tex output.png --unpacktex")}

            <div className="Text-content-title"> 根据xml切图 </div>
            {CodeLine("dst-mod-tool.exe input.xml output_dir --splitatlas")}

            <div className="Text-content-title">
                {" "}
                (注：所有输入输出文件路径请使用绝对路径){" "}
            </div>
        </div>
    </React.Fragment>
);

const Questions = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            常见问题{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content">
            <div className="Text-content-title">
                {" "}
                如何将动画导出为GIF或序列图{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;在Animation列表额外操作里选择导出GIF或序列图
            </div>

            <div className="Text-content-title">
                {" "}
                导出的GIF和序列图边缘不完整{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;在Bank列表额外操作里选择重新计算包围盒
            </div>

            <div className="Text-content-title">
                {" "}
                反编译到Scml的动画有轻微错位{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;Spriter不支持图片的倾斜变换，因此无法完美表征部分饥荒动画，解决方案是直接复用官方的Bank或反编译到Spine
            </div>

            <div className="Text-content-title">
                {" "}
                反编译到Scml的动画帧间没有过渡{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;饥荒的动画格式是逐帧动画，而Spriter默认是帧间线性插值。为了保证动画的一致性，避免帧间插值错误，因此反编译的帧过渡模式均为instant，可手动修改为linear
            </div>
        </div>
    </React.Fragment>
);

const SpineGuide = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            Spine打包须知{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content">
            <div className="Text-content-title"> 如何打包 </div>
            <div className="Text-content-body">
                &ensp;&ensp;将Spine动画导出为json文件，确保和images文件夹同层级，然后将json文件拖入工具
            </div>

            <div className="Text-content-title"> 命名&打包规则 </div>
            <div className="Text-content-body">
                &ensp;&ensp;1、插槽(slot)名称 = [layer][-数字后缀]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;2、图片区域(region)名称 = [symbol_name]-[frame_num]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;3、动画文件夹名称 = [bank_name]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;推荐按照规则命名，反之并不会导致打包失败
            </div>

            <div className="Text-content-title"> 不支持网格功能 </div>
            <div className="Text-content-body">
                &ensp;&ensp;不支持使用了网格的Spine动画，使用了网格的图片在打包时将被忽略
            </div>
        </div>
    </React.Fragment>
);

const ChangeLog = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            更新日志{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content">
            <div className="Text-content-title"> 2025.12.29 V0.2.9 </div>
            <div className="Text-content-body">
                &ensp;&ensp;支持导出APNG格式的动图；Anti-FollowSymbol功能支持限定num；打包Spine动画时，根据skin区分build；
                打包武器动画时自动复用图片；打包Atlas时支持向外拓展边缘，适合打包tile；资源搜索支持限定xml中的tex，以及限定mod；
                动画工具所有列表末尾添加项目数量统计；修复和优化了一些问题。
            </div>

            <div className="Text-content-title"> 2025.12.07 V0.2.8 </div>
            <div className="Text-content-body">
                &ensp;&ensp;支持导出动画单帧为PNG；资源搜索可以切换排序模式(最后修改时间/字母表排序)；资源搜索可以筛选Tex的具体细分类型；修复和优化了一些问题。
            </div>

            <div className="Text-content-title"> 2025.11.15 V0.2.7 </div>
            <div className="Text-content-body">
                &ensp;&ensp;修复和优化了一些问题。
            </div>

            <div className="Text-content-title"> 2025.10.19 V0.2.6 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加资源检索功能，可以检索饥荒联机(DST)、饥荒单机(DS)以及模组(Mod)的动画和贴图资源，对于部分来源于饥荒联机(DST)的资源，支持中文搜索。
            </div>

            <div className="Text-content-title"> 2025.10.05 V0.2.5 </div>
            <div className="Text-content-body">
                &ensp;&ensp;预览tex纹理时可以选择是否预除alpha；预览zip和dyn中的纹理时可以选择分页；dyn和对应的build在同一目录下时可以直接导入动画工具；导出动画时可以选择是否导出build中的隐藏项目；导出动画到zip时可以选择是否启用顶点优化和生成mipmap。
            </div>

            <div className="Text-content-title"> 2025.09.19 V0.2.4 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加Anti-FollowSymbol功能；优化上下文菜单(右键菜单)；FollowSymbol功能添加设置本地旋转、缩放功能；导出spine支持将整体变换拆分为双层骨骼。
            </div>

            <div className="Text-content-title"> 2025.09.11 V0.2.3 </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化导出GIF质量，并且现在可以自定义背景颜色；添加正则匹配删除替换功能；添加FollowSymbol功能；添加上下文菜单(右键菜单)；导出spine动画时相同的layer会绑定到同一个父骨骼下；现在支持打包16384尺寸的纹理贴图。
            </div>

            <div className="Text-content-title"> 2025.09.05 V0.2.2 </div>
            <div className="Text-content-body">
                &ensp;&ensp;Element和AnimFrame列表现在支持多选，以及拖动调整顺序；没有图片的Element现在也可选中，表现为半透明红色矩形框；添加幻影视图(洋葱皮)功能，可以向前或者向后预览；添加OverrideSymbol功能；优化HideLayer功能；一些其他功能优化和问题修复。
            </div>

            <div className="Text-content-title"> 2025.08.28 V0.2.1 </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化缩放操作，现在可以单独缩放某一个轴向，也可以整体等比例缩放(按住Shift)；选中一个或多个元素后，按上/下箭头按键可以调整图层顺序；现在可以在SymbolFrame面板预览图片(小眼睛图标)，并且可以将图片直接拖入动画视口；添加中英文语言切换功能。
            </div>

            <div className="Text-content-title"> 2025.08.22 V0.2.0 </div>
            <div className="Text-content-body">
                &ensp;&ensp;动画工具添加高亮选中元素以及拖动框选功能，可以进行平移、旋转、缩放、复制、粘贴等操作；添加快捷键Tab快速切换视图；添加对熔炉密林动画和纹理图的支持；现在导出动画为zip时默认覆盖同名文件。
            </div>

            <div className="Text-content-title"> 2025.08.13 V0.1.10 </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化和修复了一些已知的问题。
            </div>

            <div className="Text-content-title"> 2025.08.08 V0.1.9 </div>
            <div className="Text-content-body">
                &ensp;&ensp;动画工具添加操作历史面板，支持回溯30条操作记录，可以使用快捷键[Ctrl/Cmd
                + Z]快速撤销，[Ctrl/Cmd + Y]或[Ctrl/Cmd + Shift +
                Z]快速重做；修复了一些已知的问题。
            </div>

            <div className="Text-content-title"> 2025.08.03 V0.1.8 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加将动画导出到spine的功能；优化打包spine动画。
            </div>

            <div className="Text-content-title"> 2025.07.30 V0.1.7 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加命令行使用方式：[APP路径] [输入路径] [输出路径]
                --[参数]，参数可选scml2zip或zip2scml。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加导入spine动画功能（测试），支持3.8和4.2版本。被导入的json文件需要和图片文件夹同层级或在图片文件夹内。spine和饥荒动画对应的规则如下：
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;1、插槽名称 = [layer][-数字后缀]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;2、图片区域名称 = [symbol_name]-[frame_num]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;3、动画文件夹名称 = [bank_name]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;如果你不在意上述参数，那么也可以不按照这个规则命名。
            </div>

            <div className="Text-content-title"> 2025.07.17 V0.1.6 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加修改图片红点并保持动画效果不变的功能；内置人物参考动画，方便观察角色贴图是否错位；可以将本软件作为zip、tex、scml、xml等文件的打开方式。
            </div>

            <div className="Text-content-title"> 2025.07.10 V0.1.5 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加批量替换/删除symbol/layer的功能；添加从GIF以及序列图构建动画的功能；优化搜索筛选symbol/layer的性能表现；添加高亮显示选中的element的功能。
            </div>

            <div className="Text-content-title"> 2025.07.01 V0.1.4 </div>
            <div className="Text-content-body">
                &ensp;&ensp;修复了打包scml时可能出现的错误。
            </div>

            <div className="Text-content-title"> 2025.06.20 V0.1.3 </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加批量打包scml的功能；修复了打包scml时可能出现的错误；透明度始终为0的时间线将不会被打包。
            </div>
        </div>
    </React.Fragment>
);

const Acknowledge = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            致谢{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content-title">
            {" "}
            本工具的灵感及布局风格来自
            <a href="https://github.com/Jerry457" style={{ color: "cyan" }}>
                Jerry457
            </a>
            的网页工具，并在开发过程中受到他的很多帮助，特此感谢！{" "}
        </div>
    </React.Fragment>
);

function Hspace(h) {
    return <div style={{ height: h }}></div>;
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {AppTitleLogo}

                {Introduction}

                {DownlodBtn}
                {Hspace(50)}

                {Questions}
                {Hspace(50)}

                {SpineGuide}
                {Hspace(50)}

                {CommandLineGuide}
                {Hspace(50)}

                {ChangeLog}
                {Hspace(50)}

                {Acknowledge}
                {Hspace(200)}
            </header>
        </div>
    );
}

export default App;
