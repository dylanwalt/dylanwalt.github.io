import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/site/container"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/port443/logo-shield-color.svg"
                alt="Port443"
                width={40}
                height={40}
                priority={false}
              />
              <div className="leading-tight">
                <div className="font-semibold text-foreground">Port443</div>
                <div className="text-xs font-semibold tracking-[0.1em] text-[#0e6b54]">
                  &lt; AUTOMATING CYBER DEFENSE &gt;
                </div>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Specialists in cyber security software development, automation and
              integration across the Middle East and Africa.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-foreground">Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="/about-us"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="/services"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href="/request-a-demo"
                  >
                    Request a Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground">Contact</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a className="hover:text-foreground" href="mailto:info@port443.co.za">
                    info@port443.co.za
                  </a>
                </li>
                <li>
                  <a className="hover:text-foreground" href="tel:+27833263456">
                    +27 83 326 3456
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground">Address</div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Suite 6, 1st Floor, Building C, Monte Circle, 178 Monte Casino
                Boulevard, Sandton, 2191, South Africa
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Port443 (Pty) Ltd</div>
          <div>
            Built locally for rebuild/demo purposes. Source content belongs to
            Port443.
          </div>
        </div>
      </Container>
    </footer>
  )
}
