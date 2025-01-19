import { ElMessage } from "element-plus";

export const useChangeTheme = () => {
  const hexToRgb = (str: string): any => {
    let hexs: any = "";
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(str)) {
      ElMessage.warning("输入错误的hex");
      return "";
    }
    str = str.replace("#", "");
    hexs = str.match(/../g);
    for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
    return hexs;
  };
  // r 代表红色 | g 代表绿色 | b 代表蓝色
  const rgbToHex = (r: any, g: any, b: any): string => {
    let reg = /^\d{1,3}$/;
    if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
      ElMessage.warning("输入错误的rgb颜色值");
      return "";
    }
    let hexs = [r.toString(16), g.toString(16), b.toString(16)];
    for (let i = 0; i < 3; i++)
      if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
    return `#${hexs.join("")}`;
  };
  const getDarkColor = (color: string, level: number): string => {
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(color)) {
      ElMessage.warning("输入错误的hex颜色值");
      return "";
    }
    let rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
  };
  // color 颜色值字符串 | level 加深的程度，限0-1之间
  const getLightColor = (color: string, level: number): string => {
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(color)) {
      ElMessage.warning("输入错误的hex颜色值");
      return "";
    }
    let rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++)
      rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
  };

  return {
    hexToRgb,
    rgbToHex,
    getDarkColor,
    getLightColor,
  };
};
