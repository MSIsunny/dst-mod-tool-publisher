import logo from './app_logo.png';
import './App.css';
import app_data from './app-data.json';
import apple_logo from './apple.svg';
import win_logo from './win.svg';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* app-logo title version */}
                <div className='Title'>
                    <img src={logo} className="App-logo" alt="logo" />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            fontSize: '2.5em'
                        }}>{app_data.name}</div>
                        <div style={{
                            fontSize: '0.75em',
                            color: 'gray'
                        }}> lastest version: {app_data.version}</div>
                    </div>
                </div>

                {/* h-line */}
                <div className='H-line'/>
                <div className='Text-content'>
                    <div className='Text-content-title'>1、这个工具可以做什么？</div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;这是一个饥荒模组动画和贴图工具。
                        动画方面，可以预览动画，修改动画，支持zip和scml的互相转化，修复了官方打包和ktool解包的一些问题；
                        贴图方面，可以预览tex纹理，根据xml切割tex纹理，支持将多张图合并进一个tex并生成xml。
                    </div>

                    <div className='Text-content-title'>2、mac系统下提示软件损坏？</div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;软件本身没有问题，原因是mac系统默认不允许未知来源的app运行。解决方法请查询百度，需要通过终端运行指令。
                    </div>

                    <div className='Text-content-title'>3、如果遇到问题和错误？</div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;可以将问题反馈给我，联系QQ:2380749795
                    </div>
                </div>
                {/* h-line */}
                <div className='H-line'/>


                {/* download */}
                <div className='Link-container'>

                    <a
                        className="App-link"
                        href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/win-dst-mod-tool.zip`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={win_logo} className='Platform-icon' alt="win"/>
                        <p>Windows</p>
                    </a>


                    <a
                        className="App-link"
                        href={`https://gitee.com/LumineAether/dst-mod-tool-pub/releases/download/dst-mod-tool-v${app_data.version}/macos-dst-mod-tool.zip`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={apple_logo} className='Platform-icon' alt="apple"/>
                        <p>macOS</p>
                    </a>

                </div>

                <div style={{
                    height: '50px'
                }}></div>

                <div style={{
                    fontSize: '1em',
                    margin: '20px',
                }}> 更新日志 </div>

                {/* h-line */}
                <div className='H-line'/>

                <div className='Text-content'>
                    <div className='Text-content-title'> 2025.08.22 V0.2.0 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;动画工具添加高亮选中元素以及拖动框选功能，可以进行平移、旋转、缩放、复制、粘贴等操作；添加快捷键Tab快速切换视图；添加对熔炉密林动画和纹理图的支持；现在导出动画为zip时默认覆盖同名文件；添加命令行参数--fixbuild，打包zip时删除人物原始通道。
                    </div>

                    <div className='Text-content-title'> 2025.08.13 V0.1.10 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;优化和修复了一些已知的问题。
                    </div>

                    <div className='Text-content-title'> 2025.08.08 V0.1.9 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;动画工具添加操作历史面板，支持回溯30条操作记录，可以使用快捷键[Ctrl/Cmd + Z]快速撤销，[Ctrl/Cmd + Y]或[Ctrl/Cmd + Shift + Z]快速重做；修复了一些已知的问题。
                    </div>

                    <div className='Text-content-title'> 2025.08.03 V0.1.8 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加将动画导出到spine的功能；优化打包spine动画。
                    </div>

                    <div className='Text-content-title'> 2025.07.30 V0.1.7 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加命令行使用方式：[APP路径] [输入路径] [输出路径] --[参数]，参数可选scml2zip或zip2scml。
                    </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加导入spine动画功能（测试），支持3.8和4.2版本。被导入的json文件需要和图片文件夹同层级或在图片文件夹内。spine和饥荒动画对应的规则如下：
                    </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;1、插槽名称 = [layer][-数字后缀]。
                    </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;2、图片区域名称 = [symbol_name]-[frame_num]。
                    </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;3、动画文件夹名称 = [bank_name]。
                    </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;如果你不在意上述参数，那么也可以不按照这个规则命名。
                    </div>

                    <div className='Text-content-title'> 2025.07.17 V0.1.6 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加修改图片红点并保持动画效果不变的功能；内置人物参考动画，方便观察角色贴图是否错位；可以将本软件作为zip、tex、scml、xml等文件的打开方式。
                    </div>

                    <div className='Text-content-title'> 2025.07.10 V0.1.5 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加批量替换/删除symbol/layer的功能；添加从GIF以及序列图构建动画的功能；优化搜索筛选symbol/layer的性能表现；添加高亮显示选中的element的功能。
                    </div>

                    <div className='Text-content-title'> 2025.07.01 V0.1.4 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;修复了打包scml时可能出现的错误。
                    </div>

                    <div className='Text-content-title'> 2025.06.20 V0.1.3 </div>
                    <div className='Text-content-body'>
                        &ensp;&ensp;添加批量打包scml的功能；修复了打包scml时可能出现的错误；透明度始终为0的时间线将不会被打包。
                    </div>
                </div>

                {/* h-line */}
                <div className='H-line'/>

                <div style={{
                    height: '100px'
                }}></div>

            </header>
        </div>
    );
}

export default App;
