import { adminApiDisplaySpec, isAdminApiSpec } from './admin-api-spec';

declare const Scalar: {
  createApiReference: (
    element: HTMLElement,
    options: { [key: string]: unknown },
  ) => { destroy?: () => void } | undefined;
};

/** Shared by Astro and the Docusaurus archives. Dispose on SPA navigation. */
// eslint-disable-next-line import/prefer-default-export
export function mountAdminApi(
  root: ParentNode,
  scalarTheme: string,
  version?: string,
): () => void {
  let disposed = false;
  const cleanups: Array<() => void> = [];
  const listen = <K extends keyof WindowEventMap>(
    target: EventTarget,
    type: K,
    handler: (event: WindowEventMap[K]) => void,
    capture = false,
  ) => {
    target.addEventListener(type, handler as EventListener, capture);
    cleanups.push(() => target.removeEventListener(type, handler as EventListener, capture));
  };
  const reference = root.querySelector<HTMLElement>('#admin-api-openapi');
  const markdown = root.querySelector<HTMLElement>('[data-docs-content]');
  const container = root.querySelector<HTMLElement>('#admin-api-reference');
  if (reference && markdown && container) {
    const toolbar = root.querySelector<HTMLElement>('.api-toolbar');
    if (toolbar) {
      const updateHeight = () => document.documentElement.style.setProperty(
        '--api-toolbar-height',
        `${toolbar.getBoundingClientRect().height}px`,
      );
      const observer = new ResizeObserver(updateHeight);
      observer.observe(toolbar);
      cleanups.push(() => observer.disconnect());
      updateHeight();
    }
    const versionPicker = root.querySelector<HTMLDetailsElement>('.api-version');
    listen(document, 'click', (event) => {
      if (
        versionPicker?.open
        && event.target instanceof Node
        && !versionPicker.contains(event.target)
      ) versionPicker.open = false;
    });
    listen(document, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && versionPicker?.open) {
        versionPicker.open = false;
        versionPicker.querySelector('summary')?.focus();
      }
    });
    // Route the shared shortcut to one search, avoiding nested scroll locks.
    listen(
      window,
      'keydown',
      (event: KeyboardEvent) => {
        if (
          reference.hidden
          || container.hidden
          || !(event.ctrlKey || event.metaKey)
          || event.key.toLowerCase() !== 'k'
        ) return;
        const searches = [
          ...container.querySelectorAll<HTMLButtonElement>(
            'button:has(.sidebar-search-placeholder)',
          ),
        ];
        const search = searches.find((button) => button.getClientRects().length > 0)
          ?? searches[0];
        if (!search) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (
          document.body.style.overflow === 'hidden'
          || document.querySelector('.scalar-modal-layout, .DocSearch-Container')
        ) return;
        search.click();
      },
      true,
    );

    const showReference = async () => {
      const showFallback = () => {
        reference.hidden = true;
        markdown.hidden = false;
      };
      const controller = new AbortController();
      const timeout = window.setTimeout(() => {
        controller.abort();
        showFallback();
      }, 15000);
      cleanups.push(() => {
        controller.abort();
        window.clearTimeout(timeout);
      });
      try {
        const response = await fetch(container.dataset.specUrl!, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Unable to load local OpenAPI');
        const spec = await response.json();
        const specVersion = version ?? container.dataset.specVersion;
        if (!isAdminApiSpec(spec, specVersion)) throw new Error('Invalid OpenAPI document');
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.75.1/dist/browser/standalone.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Unable to load Scalar'));
          document.head.append(script);
        });
        if (disposed || reference.hidden) return;
        const instance = Scalar.createApiReference(container, {
          content: adminApiDisplaySpec(spec, specVersion),
          onLoaded: () => {
            if (disposed || reference.hidden) return;
            window.clearTimeout(timeout);
            root.querySelector('#api-reference-loading')?.remove();
            container.hidden = false;
          },
          theme: 'default',
          darkMode: false,
          hideDarkModeToggle: true,
          hideClientButton: true,
          hideModels: true,
          localization: {
            locale: document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en',
          },
          documentDownloadType: 'none',
          withDefaultFonts: false,
          persistAuth: false,
          operationTitleSource: 'path',
          // Admin credentials and requests stay in the browser; no hosted proxy.
          proxyUrl: '',
          telemetry: false,
          agent: { disabled: true },
          showDeveloperTools: 'never',
          customCss: scalarTheme,
        });
        cleanups.push(() => instance?.destroy?.());
      } catch {
        window.clearTimeout(timeout);
        showFallback();
      }
    };
    showReference();
  }
  return () => {
    disposed = true;
    cleanups.reverse().forEach((cleanup) => cleanup());
  };
}
