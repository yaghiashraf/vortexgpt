
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/types';

export function ChatInterface({ ticker }: { ticker: string }) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'assistant', content: `Hello! I'm VortexGPT. Ask me anything about ${ticker}.`, timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Mock response for now
            setTimeout(() => {
                const aiMsg: ChatMessage = { 
                    id: (Date.now() + 1).toString(), 
                    role: 'assistant', 
                    content: `Here is a simulated response about ${ticker} regarding "${userMsg.content}". Market conditions suggest caution.`, 
                    timestamp: new Date() 
                };
                setMessages(prev => [...prev, aiMsg]);
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[400px] border rounded-lg overflow-hidden bg-card">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-xs text-muted-foreground animate-pulse">VortexGPT is thinking...</div>}
            </div>
            <form onSubmit={handleSend} className="p-3 border-t bg-muted/30 flex gap-2">
                <Input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ask about price action..." 
                    className="flex-1"
                />
                <Button type="submit" size="icon" disabled={loading}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}
