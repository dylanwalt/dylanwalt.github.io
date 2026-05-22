import Link from "next/link"
import { CheckCircle2, Mail, MapPinned, Phone } from "lucide-react"

export function ContactPanel() {
  return (
    <section id="analysis" className="relative isolate overflow-hidden bg-forest-deep py-20 text-cream md:py-28">
      <div className="grass-glow absolute inset-0 -z-10 opacity-80" />
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 md:px-8 lg:grid-cols-[.86fr_1.14fr]">
        <div>
          <p className="eyebrow text-sun">Free lawn analysis</p>
          <h2 className="display mt-5 text-balance text-5xl font-black leading-[.98] tracking-[-0.07em] md:text-6xl">
            Give the lawn doctor a real signal.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-cream/72">
            Start with the local review form, then use the source contact path
            for a live LawnPro response about treatment, products, or franchise
            interest.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-cream/76">
            {["Treatment and lawn-problem context", "Seasonal or product path", "Visible source head-office details"].map((item) => (
              <p key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-sun" aria-hidden />
                {item}
              </p>
            ))}
          </div>
          <div className="mt-8 space-y-3 text-sm font-semibold">
            <a href="tel:+27120023679" className="flex w-fit items-center gap-3 text-cream/78 transition hover:text-sun">
              <Phone className="size-4" aria-hidden />
              +27 12 002 3679
            </a>
            <a href="mailto:charl@lawnpro.co.za" className="flex w-fit items-center gap-3 text-cream/78 transition hover:text-sun">
              <Mail className="size-4" aria-hidden />
              charl@lawnpro.co.za
            </a>
            <p className="flex max-w-sm items-start gap-3 text-cream/62">
              <MapPinned className="mt-0.5 size-4 shrink-0" aria-hidden />
              29 Leslie Street, Murrayfield, Pretoria
            </p>
          </div>
        </div>

        <form action="#" className="leaf-panel grid gap-5 p-5 text-forest shadow-[0_38px_120px_rgba(3,15,4,.38)] md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            <Field label="Phone" name="phone" placeholder="+27..." />
            <label className="grid gap-2 text-sm font-extrabold text-forest">
              Lawn path
              <select name="path" className="min-h-12 border border-forest/18 bg-white px-4 text-base font-semibold text-bark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
                <option>14-point analysis</option>
                <option>Service treatment</option>
                <option>Seasonal maintenance</option>
                <option>Products and shop</option>
                <option>Franchise enquiry</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-extrabold text-forest">
            What is happening in the lawn?
            <textarea
              name="message"
              rows={5}
              placeholder="Tell LawnPro about weeds, pests, winter browning, growth, soil, or the product you need."
              className="border border-forest/18 bg-white px-4 py-3 text-base font-semibold text-bark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            />
          </label>
          <div className="flex flex-col gap-3 border-t border-forest/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="sun-button min-h-12 px-5 font-black text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              Stage analysis request
            </button>
            <p className="max-w-xs text-xs font-bold leading-5 text-bark/56">
              Local demo form. Use the live LawnPro contact details for delivery.
            </p>
          </div>
          <p className="text-sm font-semibold text-bark/64">
            Need shop terms?{" "}
            <Link href="/terms-and-conditions" className="text-moss underline decoration-sun decoration-2 underline-offset-4">
              Review the local terms route.
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string
  name: string
  placeholder: string
  type?: string
}) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-forest">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="min-h-12 border border-forest/18 bg-white px-4 text-base font-semibold text-bark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      />
    </label>
  )
}
