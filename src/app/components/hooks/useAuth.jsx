"use client";
import { useAuth } from "@clerk/nextjs";

export default function Example() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div>
      Hello, {userId} your current active session is {sessionId}
    </div>
  );
}