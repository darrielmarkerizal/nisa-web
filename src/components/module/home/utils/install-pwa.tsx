import * as React from "react";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const fireToast = (): void => {
  toast.error(
    "Terjadi Kesalahan: Aplikasi sudah terunduh atau peramban anda tidak kompatibel.",
    {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Slide,
    }
  );
};

export function PWAIntegration(): () => Promise<void> {
  const [prompt, setState] = React.useState<BeforeInstallPromptEvent | null>(
    null
  );

  const promptToInstall = async (): Promise<void> => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(fireToast());
  };

  React.useEffect(() => {
    const ready = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as EventListener);
    };
  }, []);

  return promptToInstall;
}

export default PWAIntegration;
