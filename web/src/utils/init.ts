import { useChangeTheme } from "./theme";

export const systemInit = () => {
  // 初始化系统主题
  const { getDarkColor, getLightColor } = useChangeTheme();
  document.documentElement.style.setProperty(
    "--el-color-primary-dark-2",
    `${getDarkColor("#626aef", 0.1)}`
  );
  document.documentElement.style.setProperty("--el-color-primary", "#626aef");
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor("#626aef", i / 10)}`
    );
  }
};
