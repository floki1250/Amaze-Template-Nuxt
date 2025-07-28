// composables/useDaisyUITheme.ts

import { ref, onMounted, onUnmounted, type Ref } from "vue";

/**
 * A Nuxt 3 composable to get and react to the current daisyUI theme.
 * It prioritizes theme controller inputs, then the <html> data-theme attribute,
 * and finally defaults to 'light' if no theme is explicitly detected.
 */
export function useDaisyUITheme(): { currentTheme: Ref<string | null> } {
  const currentTheme: Ref<string | null> = ref(null);

  const updateTheme = (): void => {
    if (typeof document === "undefined") return;

    let detectedTheme: string | null = null;

    // 1. Try to find the currently checked theme controller input
    const checkedThemeInput = document.querySelector<HTMLInputElement>(
      "input.theme-controller:checked"
    );
    if (checkedThemeInput) {
      detectedTheme = checkedThemeInput.value;
    } else {
      // 2. If no theme controller input is checked, fall back to the <html> data-theme attribute
      detectedTheme = document.documentElement.getAttribute("data-theme");
    }

    // 3. If still no theme detected (e.g., data-theme is null/empty and no input is checked),
    //    default to 'light' as it's a common implicit default for daisyUI.
    currentTheme.value = detectedTheme || "light";
  };

  onMounted(() => {
    // Initial theme detection on mount
    updateTheme();

    // Set up a MutationObserver to listen for changes to the 'data-theme' attribute on <html>
    // This catches programmatic changes or changes not triggered by the theme-controller inputs.
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          updateTheme();
        }
      }
    });

    // Observe the <html> element for attribute changes
    observer.observe(document.documentElement, { attributes: true });

    // Also listen for changes on theme controller inputs (if they exist)
    const themeControllers =
      document.querySelectorAll<HTMLInputElement>(".theme-controller");
    themeControllers.forEach((input) => {
      input.addEventListener("change", updateTheme);
    });

    // Store the observer and listeners for cleanup
    // (A more robust solution might manage these in a WeakMap for multiple instances)
    (window as any).__daisyUIThemeObserver = observer;
    (window as any).__daisyUIThemeControllers = themeControllers;
  });

  onUnmounted(() => {
    // Disconnect the MutationObserver
    if ((window as any).__daisyUIThemeObserver) {
      (window as any).__daisyUIThemeObserver.disconnect();
      delete (window as any).__daisyUIThemeObserver;
    }

    // Remove event listeners from theme controllers
    if ((window as any).__daisyUIThemeControllers) {
      (window as any).__daisyUIThemeControllers.forEach(
        (input: HTMLInputElement) => {
          input.removeEventListener("change", updateTheme);
        }
      );
      delete (window as any).__daisyUIThemeControllers;
    }
  });

  return {
    currentTheme,
  };
}
