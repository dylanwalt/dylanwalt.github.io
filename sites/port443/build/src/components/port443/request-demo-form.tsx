"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DemoRequest = {
  firstName: string
  surname: string
  email: string
  service: string
  message: string
}

const inputClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function RequestDemoForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [form, setForm] = React.useState<DemoRequest>({
    firstName: "",
    surname: "",
    email: "",
    service: "",
    message: "",
  })

  const onChange =
    (key: keyof DemoRequest) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  return (
    <form
      className={cn("grid gap-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        setPending(true)
        setTimeout(() => {
          setPending(false)
          setSubmitted(true)
        }, 450)
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            value={form.firstName}
            onChange={onChange("firstName")}
            className={inputClass}
            autoComplete="given-name"
            required
          />
        </div>
        <div className="grid gap-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="surname">
            Surname
          </label>
          <input
            id="surname"
            value={form.surname}
            onChange={onChange("surname")}
            className={inputClass}
            autoComplete="family-name"
            required
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={onChange("email")}
          className={inputClass}
          autoComplete="email"
          inputMode="email"
          type="email"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="service">
          Which service would you like to see a demo of?
        </label>
        <select
          id="service"
          value={form.service}
          onChange={onChange("service")}
          className={inputClass}
          required
        >
          <option value="" disabled>
            Choose an option
          </option>
          <option value="compliance-governance">Compliance & Governance</option>
          <option value="oneview">OneView</option>
          <option value="community-defense">Community Defense</option>
          <option value="consulting">Consulting</option>
        </select>
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Additional information
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={onChange("message")}
          className={cn(inputClass, "min-h-28 py-2")}
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending} className="h-10 px-4">
          {pending ? "Submitting..." : "Submit"}
        </Button>
        {submitted ? (
          <p className="text-sm text-muted-foreground">
            Thanks — message captured locally for this rebuild.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            This demo form is non-production for local rebuilds.
          </p>
        )}
      </div>
    </form>
  )
}

