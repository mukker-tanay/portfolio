export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    role: string;
    featured: boolean;
    tech_stack: string[];
    created_at: string;
}

export interface ProjectDetail extends Project {
    problem: string;
    constraints: string;
    outcome: string;
    key_decisions: string;
    updated_at: string;
    sections: ProjectSection[];
    media: MediaAsset[];
}

export interface ProjectSection {
    id: number;
    title: string;
    content: string;
    order: number;
}

export interface MediaAsset {
    id: number;
    image: string;
    alt_text: string;
    caption: string;
}

export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}
