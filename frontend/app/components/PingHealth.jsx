"use client"
import { useEffect } from 'react'

export default function PingHealth() {
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/health`;
    fetch(url).catch(() => {});
  }, []);

  return null
}

