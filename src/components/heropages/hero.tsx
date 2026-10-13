// components/layout/PageHero.tsx
import Link from "next/link";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
    breadcrumbs: Crumb[];
    title: string;
    description: string;
    icon: React.ReactNode;
    theme?: "green" | "purple";
};

const themes = {
    green: "from-green-500 to-green-400",
    purple: "from-violet-600 to-purple-400",
};

export default function PageHero({ breadcrumbs, title, description, icon, theme = "green", }: PageHeroProps) {
    return (
        <section className={`bg-gradient-to-r ${themes[theme]} py-20 text-white  p-5`}>
            <div className="container mx-auto">
                <nav className="mb-3 text-xs text-white/80">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i}>
                            {crumb.href ? (
                                <Link href={crumb.href}>{crumb.label}</Link>
                            ) : (
                                <b>{crumb.label}</b>
                            )}
                            {i < breadcrumbs.length - 1 && " / "}
                        </span>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-white/90 text-green-600">
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-sm text-white/90">{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}