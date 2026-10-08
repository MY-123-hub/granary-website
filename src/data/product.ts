import { sitePath } from "../lib/paths";
import releasesData from "./releases.json";
export const product = {
  name: "智慧粮仓检测系统",
  shortName: "智慧粮仓",
  tagline: "让粮情清晰，让管理有据。",
};
export interface Release {
  version: string;
  status: string;
  platform: string;
  architecture: string;
  preparedAt: string;
  publishedAt: string | null;
  downloadUrl: string | null;
  fileName: string;
  sizeBytes: number | null;
  sha256: string | null;
  releaseNotes: string[];
}
export const releases: Release[] = releasesData;
export const latestPublished = releases.find(
  (release) => release.status === "published",
);
export const currentRelease = latestPublished ?? releases[0]!;
export function formatSize(bytes: number | null) {
  return bytes == null ? "待提供" : `${(bytes / 1000 ** 3).toFixed(2)} GB`;
}
export const screenshots = [
  {
    id: "curves",
    label: "温度曲线",
    src: sitePath("/images/product-curves.jpg"),
    alt: "真实软件中的粮温历史曲线与温度统计",
    caption: "粮温历史曲线 · 真实软件截图，展示已保存的实测批次",
    width: 1265,
    height: 1280,
  },
  {
    id: "warehouses",
    label: "仓房管理",
    src: sitePath("/images/product-warehouses.jpg"),
    alt: "真实软件中的仓房档案列表，包含示范仓房及测点配置状态",
    caption: "仓房档案管理 · 真实软件截图，包含示范仓房",
    width: 1265,
    height: 1453,
  },
];
export const docTopics = [
  {
    slug: "installation",
    title: "安装 Windows 版",
    summary: "安装包、安装流程与文件校验。",
    category: "开始使用",
    outline: [
      "确认目标 Windows 环境",
      "下载与校验安装包",
      "安装与启动",
      "安装问题排查",
    ],
  },
  {
    slug: "first-deployment",
    title: "首次部署",
    summary: "从本地安装到第一次粮温采集。",
    category: "开始使用",
    outline: [
      "整机离线授权",
      "建立库点与仓房",
      "设置储粮批次",
      "完成首次采集检查",
    ],
  },
  {
    slug: "serial",
    title: "串口与通讯配置",
    summary: "USB RS485、串口参数与通信状态。",
    category: "设备接入",
    outline: [
      "识别 USB RS485 串口",
      "填写设备要求的波特率与帧格式",
      "设置超时与重试",
      "检查通信异常",
    ],
  },
  {
    slug: "stations",
    title: "分机管理",
    summary: "分机地址、测点映射与多分机接入。",
    category: "设备接入",
    outline: [
      "设置分机地址",
      "配置电缆与测点映射",
      "启用与停用分机",
      "检查离线设备",
    ],
  },
  {
    slug: "temperature",
    title: "粮温查看与报警",
    summary: "平面测点、三维视图、曲线与异常记录。",
    category: "日常管理",
    outline: [
      "查看已保存的检测批次",
      "切换平面图与三维视图",
      "查询粮温曲线",
      "处理异常记录",
    ],
  },
  {
    slug: "exports",
    title: "查询与导出",
    summary: "历史记录与 Excel、CSV、PDF 文件。",
    category: "日常管理",
    outline: [
      "选择查询范围",
      "查看历史检测数据",
      "选择文件格式",
      "检查导出的文件",
    ],
  },
];
