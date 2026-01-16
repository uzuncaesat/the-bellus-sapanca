'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-whatsapp transition-colors flex items-center gap-1">
            <Home size={16} />
            Ana Sayfa
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-whatsapp transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-luxury-dark font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
