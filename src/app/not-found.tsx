import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export default function NotFound() {
  return <main id="contenido" tabIndex={-1} className="container section min-h-[65vh]"><p className="eyebrow">404</p><h1 className="section-title">{portfolio.notFound.title}</h1><p className="section-intro">{portfolio.notFound.body}</p><Link className="button button-primary mt-8" href="/">{portfolio.notFound.action}<span aria-hidden="true">↗</span></Link></main>;
}
