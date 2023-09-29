"use client";

import { Dialog } from "@/components/Dialog";
import { useRouter } from "next/navigation";
import { useRef, startTransition, useEffect, useState } from "react";
import { SignupView } from "@/components/auth/SignupView";
import { SnackContextProvider } from "@/components/SnackContext";

export default function SignupModal() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const closeDialog = async () => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const slideOutAnimation = dialog.animate(
      [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }],
      {
        easing: "cubic-bezier(0.5, -0.3, 0.1, 1.5)",
        duration: 300,
      },
    );
    const fadeOutAnimation = dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
      easing: "cubic-bezier(0.5, -0.3, 0.1, 1.5)",
      duration: 350,
    });
    await Promise.allSettled([
      slideOutAnimation.finished,
      fadeOutAnimation.finished,
    ]);
    dialogRef.current?.close();
    setVisible(false);
    // setStrategy(undefined);
  };

  useEffect(() => {
    dialogRef.current?.showModal();
    setVisible(true);
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      onClose={() => {
        startTransition(() => {
          router.back();
        });
      }}
      // className={!visible ? "pointer-events-none opacity-0 px-0" : ""}
    >
      <SnackContextProvider>
        <SignupView modal visible={visible} closeDiaglog={closeDialog} />
      </SnackContextProvider>
    </Dialog>
  );
}
