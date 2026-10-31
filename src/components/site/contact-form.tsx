"use client";

import { useRef, useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      service: String(fd.get("service") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      // spam traps
      website: String(fd.get("website") ?? ""), // honeypot (must stay empty)
      elapsedMs: Date.now() - mountedAt.current, // time trap
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        setStatus("error");
        toast({
          title: "We couldn't send your message",
          description: data?.message ?? "Please review the highlighted fields and try again.",
          variant: "destructive",
        });
        return;
      }
      setStatus("success");
      form.reset();
      toast({
        title: "Message sent",
        description:
          "Thank you for reaching out — our team will get back to you shortly. For urgent matters, call +1 (954) 306-3823.",
      });
    } catch {
      setStatus("error");
      toast({
        title: "Something went wrong",
        description: "The message could not be sent. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  }

  const inputCls = "h-11";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave empty)</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" className={inputCls} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputCls} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (___) ___-____" className={inputCls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company (optional)</Label>
          <Input id="company" name="company" autoComplete="organization" placeholder="Company name" className={inputCls} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">What do you need help with?</Label>
        <Select name="service">
          <SelectTrigger id="service" className="h-11 w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General inquiry</SelectItem>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>
                {s.shortTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us how we can help *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Briefly describe your situation or question. Please do not include passwords, bank credentials, tax identification numbers, or confidential documents here."
          className="min-h-[120px]"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2 rounded-md bg-secondary p-3 text-xs leading-5 text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
        <p>
          Please don&apos;t send sensitive documents or credentials through this form — we&apos;ll
          arrange a secure way to share files after we connect.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full bg-primary hover:bg-brand-magenta-dark sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
