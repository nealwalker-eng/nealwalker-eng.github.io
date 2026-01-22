"use client";

import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

type QrScannerProps = {
  onResult: (value: string) => void;
  onError?: (message: string) => void;
};

export function QrScanner({ onResult, onError }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;
    let active = true;

    async function start() {
      if (!videoRef.current) {
        return;
      }
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const deviceId = devices[0]?.deviceId;
        if (!deviceId) {
          onError?.("No camera devices available.");
          return;
        }
        await reader.decodeFromVideoDevice(deviceId, videoRef.current, (result) => {
          if (!active || !result) {
            return;
          }
          onResult(result.getText());
        });
      } catch (error) {
        onError?.(
          error instanceof Error ? error.message : "Unable to start scanner",
        );
      }
    }

    start();
    return () => {
      active = false;
      reader.reset();
    };
  }, [onResult, onError]);

  return <video className="scanner-video" ref={videoRef} />;
}
