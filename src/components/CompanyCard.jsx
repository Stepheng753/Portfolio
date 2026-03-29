import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function CompanyCard({
  title,
  excerpt,
  image,
  link,
  tags = [],
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('w-full max-w-[480px]', className)}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-background/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Site
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary font-serif">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
