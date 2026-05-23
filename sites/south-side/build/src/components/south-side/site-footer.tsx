import Link from "next/link"

export function SouthFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#051123] py-16 text-white/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">South Side Hard Soda</p>
            <p className="mt-6 max-w-2xl leading-7 text-white/70">
              A handcrafted hard soda range from South Africa. Light, flavour-forward and made for the moments when you want something crisp, cool and uncomplicated.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">Shop</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link href="https://www.south-side.co.za/products" className="transition hover:text-amber-300">
                  Products
                </Link>
                <Link href="https://www.south-side.co.za/storelocator" className="transition hover:text-amber-300">
                  Store locator
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">Connect</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link href="https://www.instagram.com/south_side_hard_soda/" className="transition hover:text-amber-300">
                  Instagram
                </Link>
                <Link href="https://www.south-side.co.za/" className="transition hover:text-amber-300">
                  South Side homepage
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.24em] text-white/40">
          <p>South Side Hard Soda · Low sugar hard soda from South Africa · 5% ABV · 72 calories</p>
        </div>
      </div>
    </footer>
  )
}
