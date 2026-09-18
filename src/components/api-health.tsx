"use client";
import { useEffect, useState } from "react";
import { getApiHealth } from "@/lib/api";
export function ApiHealth() { const [label, setLabel] = useState("Checking API connection…"); useEffect(() => { getApiHealth().then(({ data }) => setLabel(`${data.service} is ${data.status}`)).catch(() => setLabel("API unavailable — start Laravel on port 8000.")); }, []); return <p className="mt-6 text-sm text-slate-600" role="status">{label}</p>; }
