const NAV_LINKS = ["Archive", "Heritage", "Explore"];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-8">
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "#DFE2F3" }}
          >
            VeraLayer
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-xs tracking-wide transition-colors hover:opacity-80"
                style={{
                  color: i === NAV_LINKS.length - 1 ? "#DFE2F3" : "#8A919F",
                  textDecoration:
                    i === NAV_LINKS.length - 1 ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <button
          className="text-xs px-4 py-1.5 rounded-md font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "#A4C9FF",
            color: "#0A0E1A",
          }}
        >
          Connect Wallet
        </button>
      </nav>
  )

}