import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Wiki Férias II",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "zionbressanin-hub.github.io/ferias-2",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Pixelify Sans", // Fonte pixelada para títulos
        body: "Exo 2",   // Fonte técnica para leitura
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#D8D8D8",       // Cinza claro (fundo de inventário)
          lightgray: "#FFFFFF",   // Branco (fundo dos slots)
          gray: "#595959",        // Cinza pedra
          darkgray: "#262626",    // Cinza escuro
          dark: "#1D1D1D",        // Preto (texto)
          secondary: "#00AA00",   // Verde Creeper (links)
          tertiary: "#8B5E3C",    // Marrom Terra (hover)
          highlight: "rgba(0, 170, 0, 0.15)", // Marca-texto verde
        },
        darkMode: {
          light: "#1e1e1e",       // Fundo Preto (Bedrock/Obsidian)
          lightgray: "#393939",   // Cinza Pedregulho
          gray: "#787878",        // Cinza claro
          darkgray: "#AAAAAA",    // Texto secundário
          dark: "#FFFFFF",        // Texto principal Branco
          secondary: "#a6d8a6",   // verde claro
          tertiary: "#ff2020",    // vermelho (Hover)
          highlight: "#1c6e1c", // Marca-texto verde
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
