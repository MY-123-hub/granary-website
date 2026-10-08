/**
 * 官网界面演示专用。与业务 API、设备和数据库完全隔离。
 * 测点取自上一版截图中 2026-10-06 19:04:25 的已保存实测批次。
 * 曲线仅用于解释界面能力，必须标为演示数据，不能作为实时数据或性能指标。
 */
export const monitoringPreview = {
  warehouse: "1号平房仓",
  grain: "小麦",
  capturedAt: "2026-10-06 19:04:25",
  layers: [
    [23.9, 23.3, 23.5, 23.8],
    [23.7, 23.6, 23.7, 23.8],
    [23.7, 23.6, 23.3, 23.8],
    [23.5, 23.3, 23.2, 23.5],
    [23.3, 23.3, 23.6, 23.8],
  ],
  // 趋势示意，不冒充采集记录。
  trend: [
    23.1, 23.2, 23.15, 23.3, 23.15, 23.05, 22.9, 22.75, 22.7, 22.5, 22.45, 22.4,
    22.35, 22.5, 22.6, 22.75, 22.85, 23, 23.1, 23.25, 23.4, 23.5, 23.45, 23.6,
  ],
};
const readings = monitoringPreview.layers.flat();
export const monitoringSummary = {
  average: (
    readings.reduce((sum, value) => sum + value, 0) / readings.length
  ).toFixed(1),
  max: Math.max(...readings).toFixed(1),
  min: Math.min(...readings).toFixed(1),
  validPoints: readings.length,
};
