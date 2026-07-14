# Typography 文字规范

> 文档说明：文字层级 + 字体 + 字号 + 行高 + 字重  
> 本文档用于 Codex 根据 Figma 设计稿开发网站时，统一实现页面文字样式。

## 1. 基础字体

- 字体名称：`Flyme Sans VF`
- CSS 字体写法：

```css
font-family: "Flyme Sans VF", sans-serif;
```

> 注意：开发时需要确认项目中已经引入 `Flyme Sans VF` 字体文件。  
> 如果暂时没有字体文件，可先使用系统无衬线字体作为回退字体，但最终页面应替换为设计稿指定字体。

---

## 2. Typography Tokens

| Token 名称 | 字体 | 字号 | 行高 | 字重 |
|---|---|---:|---:|---|
| `Title64-Regular` | Flyme Sans VF | 64px | 96px | regular |
| `Title64-Light` | Flyme Sans VF | 64px | 96px | light |
| `Title42-Regular` | Flyme Sans VF | 44px | 72px | regular |
| `Title42-Normal` | Flyme Sans VF | 44px | 72px | normal |
| `Title42-Light` | Flyme Sans VF | 44px | 72px | light |
| `Title40-Regular` | Flyme Sans VF | 40px | 64px | regular |
| `Title40-Normal` | Flyme Sans VF | 40px | 64px | normal |
| `Title40-Light` | Flyme Sans VF | 40px | 64px | light |
| `Title32-Regular` | Flyme Sans VF | 32px | 48px | regular |
| `Title32-Normal` | Flyme Sans VF | 32px | 48px | normal |
| `Title32-Light` | Flyme Sans VF | 32px | 48px | light |
| `Title28-Regular` | Flyme Sans VF | 28px | 40px | regular |
| `Title28-Normal` | Flyme Sans VF | 28px | 40px | normal |
| `Title28-Light` | Flyme Sans VF | 28px | 40px | light |
| `Content20-Regular` | Flyme Sans VF | 20px | 32px | regular |
| `Content20-Normal` | Flyme Sans VF | 20px | 32px | normal |
| `Content20-Light` | Flyme Sans VF | 20px | 32px | light |
| `Content16-Regular` | Flyme Sans VF | 16px | 28px | regular |
| `Content16-Normal` | Flyme Sans VF | 16px | 28px | normal |
| `Content16-Light` | Flyme Sans VF | 16px | 28px | light |
| `Content14-Regular` | Flyme Sans VF | 14px | 24px | regular |
| `Content14-Normal` | Flyme Sans VF | 14px | 24px | normal |
| `Content14-Light` | Flyme Sans VF | 14px | 24px | light |
| `Content13-Regular` | Flyme Sans VF | 13px | 20px | regular |
| `Content13-Normal` | Flyme Sans VF | 13px | 20px | normal |
| `Content13-Light` | Flyme Sans VF | 13px | 20px | light |

> 说明：设计稿中的 `Title42` 实际字号为 `44px`，开发时请以表格中的数值为准，不要根据 Token 名称自动改成 42px。

---

## 3. CSS Variables

```css
:root {
  --font-family-primary: "Flyme Sans VF", sans-serif;

  --font-size-title64: 64px;
  --line-height-title64: 96px;

  --font-size-title42: 44px;
  --line-height-title42: 72px;

  --font-size-title40: 40px;
  --line-height-title40: 64px;

  --font-size-title32: 32px;
  --line-height-title32: 48px;

  --font-size-title28: 28px;
  --line-height-title28: 40px;

  --font-size-content20: 20px;
  --line-height-content20: 32px;

  --font-size-content16: 16px;
  --line-height-content16: 28px;

  --font-size-content14: 14px;
  --line-height-content14: 24px;

  --font-size-content13: 13px;
  --line-height-content13: 20px;
}
```

---

## 4. CSS 字重规则

开发时优先读取 `Flyme Sans VF` 字体文件支持的真实字重。

```css
/* 推荐的基础映射 */
.font-regular {
  font-weight: 400;
}

.font-normal {
  font-weight: 400;
}

.font-light {
  font-weight: 300;
}
```

> `regular` 和 `normal` 在 CSS 中通常都会映射为 `400`。  
> 如果项目提供的 Flyme Sans VF 字体文件中二者有不同的 Variable Font 数值，请以字体文件的真实字重轴为准。

---

## 5. Typography Classes

```css
.title64-regular {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title64);
  line-height: var(--line-height-title64);
  font-weight: 400;
}

.title64-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title64);
  line-height: var(--line-height-title64);
  font-weight: 300;
}

.title42-regular,
.title42-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title42);
  line-height: var(--line-height-title42);
  font-weight: 400;
}

.title42-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title42);
  line-height: var(--line-height-title42);
  font-weight: 300;
}

.title40-regular,
.title40-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title40);
  line-height: var(--line-height-title40);
  font-weight: 400;
}

.title40-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title40);
  line-height: var(--line-height-title40);
  font-weight: 300;
}

.title32-regular,
.title32-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title32);
  line-height: var(--line-height-title32);
  font-weight: 400;
}

.title32-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title32);
  line-height: var(--line-height-title32);
  font-weight: 300;
}

.title28-regular,
.title28-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title28);
  line-height: var(--line-height-title28);
  font-weight: 400;
}

.title28-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title28);
  line-height: var(--line-height-title28);
  font-weight: 300;
}

.content20-regular,
.content20-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content20);
  line-height: var(--line-height-content20);
  font-weight: 400;
}

.content20-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content20);
  line-height: var(--line-height-content20);
  font-weight: 300;
}

.content16-regular,
.content16-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content16);
  line-height: var(--line-height-content16);
  font-weight: 400;
}

.content16-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content16);
  line-height: var(--line-height-content16);
  font-weight: 300;
}

.content14-regular,
.content14-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content14);
  line-height: var(--line-height-content14);
  font-weight: 400;
}

.content14-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content14);
  line-height: var(--line-height-content14);
  font-weight: 300;
}

.content13-regular,
.content13-normal {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content13);
  line-height: var(--line-height-content13);
  font-weight: 400;
}

.content13-light {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-content13);
  line-height: var(--line-height-content13);
  font-weight: 300;
}
```

---

## 6. Codex 开发要求

1. 页面中的文字必须优先使用本文档定义的 Typography Token，不要随意新增字号、行高或字重。
2. 字号与行高统一使用 `px`。
3. 不要使用浏览器默认的 `h1`、`h2`、`p` 样式，必须重置默认 margin，并应用对应文字 Token。
4. 同一个文字层级在不同页面中应保持一致。
5. 标题、正文、辅助信息应根据 Figma 中的文字层级选择对应 Token。
6. 不要根据 HTML 标签自动决定字号，应根据设计稿指定的 Token 决定视觉样式。
7. 字体加载完成前应保留无衬线字体回退，避免文字不可见。
8. 除非其他设计规范明确说明，否则不要自行修改字间距 `letter-spacing`。
9. `Title42` 的实际字号必须使用 `44px`。
10. 如果实际字体文件无法区分 `regular` 与 `normal`，两者均使用 `font-weight: 400`。
