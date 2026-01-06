'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/api';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            await submitContact(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 pb-20">
             <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Contact</h1>
                <p className="text-xl text-neutral-400">
                    Interested in working together? Drop me a line.
                </p>
            </header>

            <div className="p-8 rounded-3xl bg-neutral-900/30 border border-white/5 backdrop-blur-sm">
                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Message Sent</h3>
                        <p className="text-neutral-400">Thanks for reaching out! I'll get back to you shortly.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-8 text-sm text-neutral-500 hover:text-white transition-colors underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-300 ml-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 outline-none transition-all placeholder:text-neutral-700"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 outline-none transition-all placeholder:text-neutral-700"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-neutral-300 ml-1">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 outline-none transition-all resize-none placeholder:text-neutral-700"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                <span>Something went wrong. Please try again.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="group w-full py-4 bg-neutral-100 hover:bg-white text-neutral-900 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                            {status === 'submitting' ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : (
                                <>
                                    Send Message
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
            
            <div className="mt-12 text-center">
                <p className="text-neutral-500 text-sm">
                    Prefer email? Reach me directly at <a href="mailto:tanaymukker@gmail.com" className="text-neutral-300 hover:text-white transition-colors underline decoration-neutral-700">tanaymukker@gmail.com</a>
                </p>
            </div>
        </div>
    );
}
