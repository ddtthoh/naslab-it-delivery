/**
 * CountUp —— 数字滚动计数(2026-07-19 用户定稿)。
 *
 * 【铁律:文案 1:1 冻结】
 *   这里【只动画呈现过程,终值必须与冻结原文逐字一致】。
 *   做法是把原串拆成「前缀 + 首个数字 + 其余」,只对数字部分做插值,
 *   动画结束后直接渲染原串本身,杜绝格式漂移(如 "24/7" 变成 "24.0/7")。
 *   不含数字的条目(如 "Global Market Coverage")原样输出,不做任何处理。
 *
 * 【只播一次】
 *   与滚动淡入的「每次都播」不同 —— 数字反复归零重跑会显得廉价,
 *   且用户视线可能正停在上面。进入视野跑一次即定格。
 *
 * 【失败时必须回到正确文案 —— 两道保险】
 *   动画起不来的情况真实存在(省电模式、后台标签、rAF 被挂起等)。
 *   若初始态渲染 0,一旦动画没跑,用户看到的就是 "0% Uptime Guarantee",
 *   这比没有动效糟糕得多。故:
 *     ① 动画开始前渲染【冻结原文】,不是 0;只有确认要跑时才从 0 起步。
 *     ② 另设超时兜底:无论 rAF 是否触发,到点强制定格为原文。
 *   最坏情况下用户看到的永远是正确文案,只是少了动画。
 */

import { useEffect, useRef, useState } from "react";

/** 抓「前缀(非数字) + 数字 + 其余」。匹配不到即视为无数字条目。 */
const PARTS = /^(\D*?)([\d]+(?:\.\d+)?)(.*)$/s;

const DURATION = 1400;
/** easeOutCubic:开头快、结尾稳,数字不会在末尾拖泥带水 */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ children }: { children: string }) {
  const m = children.match(PARTS);
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  // 小数位数跟随原文,避免 "99.9" 被渲染成 "100" 或 "99.90"
  const decimals = m ? (m[2].split(".")[1]?.length ?? 0) : 0;
  const [val, setVal] = useState(0);
  const [running, setRunning] = useState(false); // 未开跑时渲染原文,不渲染 0

  // ⚠️ 依赖只能放 children 这类稳定值。
  //    早前把正则匹配结果 m 放进依赖 —— 它每次渲染都是新对象,于是
  //    「计数更新 → 重渲染 → effect 清理(清掉定时器、断开观察器)→ 重新建立」
  //    自我循环,数字永远卡在起步阶段。
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = children.match(PARTS);
    if (!mm) return;
    const to = parseFloat(mm[2]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let bail = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect(); // 只播一次
        setRunning(true);
        setVal(0);
        // 保险②:不管 rAF 有没有跑起来,到点一律定格为原文
        bail = window.setTimeout(() => setDone(true), DURATION + 900);
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / DURATION, 1);
          setVal(to * ease(p));
          if (p < 1) raf = requestAnimationFrame(step);
          else setDone(true); // 定格后改渲染冻结原文
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, [children]);

  // 无数字条目:原样输出
  if (!m) return <>{children}</>;
  // 保险①:尚未开跑,或已定格 —— 都渲染冻结原文本身(而非拼接结果),确保 1:1
  if (!running || done) return <span ref={ref}>{children}</span>;

  return (
    <span ref={ref}>
      {m[1]}
      {val.toFixed(decimals)}
      {m[3]}
    </span>
  );
}
