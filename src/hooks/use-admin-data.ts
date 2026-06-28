'use client';

import { useState, useEffect } from 'react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Content {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  type: string;
  status: string;
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDesc?: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Statistics {
  id: string;
  label: string;
  value: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/admin/hero-slides');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setSlides(data.slides || data); // Handle both array directly and {slides: [...]} response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch slides');
    } finally {
      setLoading(false);
    }
  };

  return { slides, loading, error, refetch: fetchSlides };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setServices(data.services || data); // Handle both array directly and {services: [...]} response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error, refetch: fetchServices };
}

export function useContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setContent(data.content || data); // Handle both array directly and {content: [...]} response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refetch: fetchContent };
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/statistics');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setStatistics(data.statistics || data); // Handle both array directly and {statistics: [...]} response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  return { statistics, loading, error, refetch: fetchStatistics };
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/admin/contact-info');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setContactInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contact info');
    } finally {
      setLoading(false);
    }
  };

  return { contactInfo, loading, error, refetch: fetchContactInfo };
}