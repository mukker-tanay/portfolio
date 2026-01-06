import { Project, ProjectDetail, ContactSubmission } from '@/types';

// Use the network IP for cross-device access
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://10.5.0.2:8000/api/v1';

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects/`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return res.json();
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  const res = await fetch(`${API_URL}/projects/${slug}/`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    // Return null or throw depending on how we want to handle 404
    throw new Error('Failed to fetch project');
  }
  
  return res.json();
}

export async function submitContact(data: ContactSubmission): Promise<void> {
  const res = await fetch(`${API_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error('Failed to submit contact form');
  }
}
