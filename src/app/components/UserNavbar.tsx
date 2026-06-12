const USER_NAV = [
  {  label: "Dashboard", href: "/dashboard" },
  {  label: "Archive", href: "/dashboard/archives" },
  {  label: "Heritage Assets", href: "/dashboard/heritage", active: true },
  {  label: "Explore", href: "/dashboard/explore" },
]; 

export default function UserNavbar() {

    return(
        <div className="flex items-center gap-5">
                    {USER_NAV.map((navItem) => (
                      <a
                        key={navItem.label}
                        href={navItem.href}
                        className="text-xs transition-opacity hover:opacity-70"
                        style={{
                          color: navItem.active ? "#DFE2F3" : "#8A919F",
                          textDecoration: navItem.active ? "underline" : "none",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        {navItem.label}
                      </a>
                    ))}
                  </div>
    )
}