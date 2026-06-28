"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-4xl text-white md:text-5xl font-bold font-headline text-primary">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-white max-w-3xl mx-auto text-lg text-primary">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
