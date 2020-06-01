/*
 * @Author: fan
 * @Date: 2020-06-01 16:29:21
 * @LastEditTime: 2020-06-01 16:32:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /next-antd-node-blog/src/utils/index.ts
 */

// 时间格式化
export function TimeformatDate(input: string) {
  let date = new Date(+input);
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return Y + "年" + M + "月" + D + "日";
}
