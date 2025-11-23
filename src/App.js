import logo from "./app_logo.png";
import "./App.css";
import app_data from "./app-data.json";
import apple_logo from "./apple.svg";
import win_logo from "./win.svg";
import React from "react";

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
)

const Introduction = (
    <React.Fragment>
        <div className="H-line" />
        <div className="Text-content">
            <div className="Text-content-title">
                1、这个工具可以做什么？
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;这是一个饥荒模组动画和贴图工具。
                动画方面，可以预览动画，修改动画，支持zip和scml的互相转化，修复了官方打包和ktool解包的一些问题；
                贴图方面，可以预览tex纹理，根据xml切割tex纹理，支持将多张图合并进一个tex并生成xml。
            </div>

            <div className="Text-content-title">
                2、mac系统下提示软件损坏？
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;软件本身没有问题，原因是mac系统默认不允许未知来源的app运行。解决方法请查询百度，需要通过终端运行指令。
            </div>

            <div className="Text-content-title">
                3、如果遇到问题和错误？
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;可以将问题反馈给我，联系QQ:2380749795
            </div>

            <div className="Text-content-title">
                4、This page currently does not have an English
                translation.
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;If you encounter any problems or have
                improvement suggestions, you can send them to my email
                2380749795@qq.com
            </div>
        </div>
        <div className="H-line" />
    </React.Fragment>
)

const DownlodBtn = (
    <React.Fragment>
        <div className="Link-container">
            <a
                className="App-link"
                href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/win-dst-mod-tool.zip`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={win_logo}
                    className="Platform-icon"
                    alt="win"
                />
                <p>Windows</p>
            </a>

            <a
                className="App-link"
                href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/macos-dst-mod-tool.zip`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={apple_logo}
                    className="Platform-icon"
                    alt="apple"
                />
                <p>macOS</p>
            </a>
        </div>
    </React.Fragment>
)

const CommandLineGuide = (
    <React.Fragment>
        <div
            style={{
                fontSize: "1em",
                margin: "20px",
            }}
        >
            {" "}
            命令行使用示例{" "}
        </div>

        {/* h-line */}
        <div className="H-line" />

        <div className="Text-content">
            <div className="Text-content-title">
                {" "}
                打包scml到zip{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input.scml output.zip --scml2zip
            </div>

            <div className="Text-content-title">
                {" "}
                解包zip到scml{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input.zip output.scml --zip2scml
            </div>

            <div className="Text-content-title">
                {" "}
                打包png到tex和xml{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input_dir output_dir --packtex
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input.png output_dir --packtex
            </div>

            <div className="Text-content-title">
                {" "}
                解包tex到png{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input.tex output.png --unpacktex
            </div>

            <div className="Text-content-title">
                {" "}
                根据xml切图{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;dst-mod-tool.exe input.xml output_dir --splitatlas
            </div>

            <div className="Text-content-title">
                {" "}
                (注：所有输入输出文件路径请使用绝对路径){" "}
            </div>

        </div>
    </React.Fragment>
)

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
            <div className="Text-content-title">
                {" "}
                如何打包{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;将Spine动画导出为json文件，确保和images文件夹同层级，然后将json文件拖入工具
            </div>

            <div className="Text-content-title">
                {" "}
                命名&打包规则{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;1、插槽(slot)名称 = [layer][-数字后缀]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;2、图片区域(region)名称 =
                [symbol_name]-[frame_num]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;3、动画文件夹名称 = [bank_name]
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;推荐按照规则命名，反之并不会导致打包失败
            </div>
        </div>
    </React.Fragment>
)

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
            <div className="Text-content-title">
                {" "}
                2025.11.15 V0.2.7{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;修复和优化了一些问题。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.10.19 V0.2.6{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加资源检索功能，可以检索饥荒联机(DST)、饥荒单机(DS)以及模组(Mod)的动画和贴图资源，对于部分来源于饥荒联机(DST)的资源，支持中文搜索。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.10.05 V0.2.5{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;预览tex纹理时可以选择是否预除alpha；预览zip和dyn中的纹理时可以选择分页；dyn和对应的build在同一目录下时可以直接导入动画工具；导出动画时可以选择是否导出build中的隐藏项目；导出动画到zip时可以选择是否启用顶点优化和生成mipmap。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.09.19 V0.2.4{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加Anti-FollowSymbol功能；优化上下文菜单(右键菜单)；FollowSymbol功能添加设置本地旋转、缩放功能；导出spine支持将整体变换拆分为双层骨骼。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.09.11 V0.2.3{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化导出GIF质量，并且现在可以自定义背景颜色；添加正则匹配删除替换功能；添加FollowSymbol功能；添加上下文菜单(右键菜单)；导出spine动画时相同的layer会绑定到同一个父骨骼下；现在支持打包16384尺寸的纹理贴图。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.09.05 V0.2.2{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;Element和AnimFrame列表现在支持多选，以及拖动调整顺序；没有图片的Element现在也可选中，表现为半透明红色矩形框；添加幻影视图(洋葱皮)功能，可以向前或者向后预览；添加OverrideSymbol功能；优化HideLayer功能；一些其他功能优化和问题修复。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.08.28 V0.2.1{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化缩放操作，现在可以单独缩放某一个轴向，也可以整体等比例缩放(按住Shift)；选中一个或多个元素后，按上/下箭头按键可以调整图层顺序；现在可以在SymbolFrame面板预览图片(小眼睛图标)，并且可以将图片直接拖入动画视口；添加中英文语言切换功能。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.08.22 V0.2.0{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;动画工具添加高亮选中元素以及拖动框选功能，可以进行平移、旋转、缩放、复制、粘贴等操作；添加快捷键Tab快速切换视图；添加对熔炉密林动画和纹理图的支持；现在导出动画为zip时默认覆盖同名文件。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.08.13 V0.1.10{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;优化和修复了一些已知的问题。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.08.08 V0.1.9{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;动画工具添加操作历史面板，支持回溯30条操作记录，可以使用快捷键[Ctrl/Cmd + Z]快速撤销，[Ctrl/Cmd + Y]或[Ctrl/Cmd + Shift + Z]快速重做；修复了一些已知的问题。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.08.03 V0.1.8{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加将动画导出到spine的功能；优化打包spine动画。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.07.30 V0.1.7{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加命令行使用方式：[APP路径] [输入路径]
                [输出路径] --[参数]，参数可选scml2zip或zip2scml。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加导入spine动画功能（测试），支持3.8和4.2版本。被导入的json文件需要和图片文件夹同层级或在图片文件夹内。spine和饥荒动画对应的规则如下：
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;1、插槽名称 = [layer][-数字后缀]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;2、图片区域名称 =
                [symbol_name]-[frame_num]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;3、动画文件夹名称 = [bank_name]。
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;如果你不在意上述参数，那么也可以不按照这个规则命名。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.07.17 V0.1.6{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加修改图片红点并保持动画效果不变的功能；内置人物参考动画，方便观察角色贴图是否错位；可以将本软件作为zip、tex、scml、xml等文件的打开方式。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.07.10 V0.1.5{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加批量替换/删除symbol/layer的功能；添加从GIF以及序列图构建动画的功能；优化搜索筛选symbol/layer的性能表现；添加高亮显示选中的element的功能。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.07.01 V0.1.4{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;修复了打包scml时可能出现的错误。
            </div>

            <div className="Text-content-title">
                {" "}
                2025.06.20 V0.1.3{" "}
            </div>
            <div className="Text-content-body">
                &ensp;&ensp;添加批量打包scml的功能；修复了打包scml时可能出现的错误；透明度始终为0的时间线将不会被打包。
            </div>
        </div>
    </React.Fragment>
)

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
            本工具的灵感以及布局风格来自
            <a
                href="https://github.com/Jerry457"
                style={{ color: "cyan" }}
            >
                Jerry457
            </a>
            的网页工具，并在开发过程中受到他的很多帮助，特此感谢！{" "}
        </div>
    </React.Fragment>
)

function Hspace(h) {
    return <div style={{ height: h }}></div>
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {AppTitleLogo}

                {Introduction}

                {DownlodBtn}
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
