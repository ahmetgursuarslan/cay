// GPT5-AUTO-FIX: Safe boot wrapper to avoid white screen and handle splash
import React from 'react';
import { installCrashSniffer } from './CrashSniffer';

// GPT5-AUTO-FIX: install crash sniffer early; no UI overlay
installCrashSniffer();

export default function BootGuard({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
