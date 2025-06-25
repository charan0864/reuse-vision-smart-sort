
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', currentConversationId],
    queryFn: async () => {
      if (!currentConversationId) return [];
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!currentConversationId,
  });

  const createConversation = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: user.id,
        title: 'New Conversation'
      })
      .select()
      .single();
    if (error) throw error;
    return data.id;
  };

  const generateAIResponse = (userMessage: string, conversationHistory: Message[] = []): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced knowledge base with more comprehensive responses
    const knowledgeBase = {
      // Plastic types and recycling
      plastic: {
        keywords: ['plastic', 'polymer', 'recycling', 'bottle', 'container'],
        responses: [
          "Great question about plastic! Here's what you need to know:\n\n🔢 **Plastic Types:**\n• Type 1 (PET): Water bottles, food containers - Highly recyclable\n• Type 2 (HDPE): Milk jugs, detergent bottles - Easy to recycle\n• Type 3 (PVC): Pipes, credit cards - Limited recycling\n• Type 4 (LDPE): Plastic bags, squeezable bottles - Some recycling\n• Type 5 (PP): Yogurt containers, bottle caps - Increasingly recyclable\n• Type 6 (PS): Disposable cups, foam packaging - Difficult to recycle\n• Type 7 (Other): Mixed plastics - Varies by composition\n\n💡 **Pro Tip:** Look for the recycling number inside the triangular symbol on plastic items!",
          "Plastic recycling is crucial for our environment! Did you know that:\n\n♻️ Only 9% of all plastic ever produced has been recycled\n🌊 Every minute, a garbage truck of plastic enters our oceans\n🔄 Recycling 1 ton of plastic saves 2,000 pounds of CO2\n\n**What you can do:**\n• Always check the recycling number before disposing\n• Clean containers before recycling\n• Reduce single-use plastics when possible\n• Choose products with minimal packaging"
        ]
      },
      
      // Recycling general
      recycle: {
        keywords: ['recycle', 'recycling', 'reuse', 'reduce', 'waste', 'bin'],
        responses: [
          "Recycling is one of the most impactful things you can do for the environment! Here's your complete guide:\n\n🗂️ **The 3 R's Priority:**\n1. **REDUCE** - Buy less, choose durable items\n2. **REUSE** - Find new purposes for items\n3. **RECYCLE** - Process materials into new products\n\n📋 **What to Recycle:**\n✅ Paper, cardboard, magazines\n✅ Glass bottles and jars\n✅ Metal cans (aluminum, steel)\n✅ Plastic bottles and containers (check number)\n\n❌ **What NOT to Recycle:**\n• Plastic bags (take to store drop-off)\n• Food-contaminated items\n• Broken glass\n• Electronics (special e-waste centers)",
          "Smart recycling makes a real difference! Here are some pro tips:\n\n🧽 **Preparation Tips:**\n• Rinse containers to remove food residue\n• Remove caps from bottles (unless specifically requested)\n• Separate materials when required\n• Don't bag recyclables unless instructed\n\n🌍 **Impact Facts:**\n• Recycling aluminum cans saves 95% of energy vs. new production\n• One recycled glass bottle powers a light bulb for 4 hours\n• Recycled paper uses 60% less energy than virgin paper"
        ]
      },
      
      // Environmental impact
      environment: {
        keywords: ['environment', 'climate', 'sustainability', 'green', 'eco', 'carbon'],
        responses: [
          "Environmental protection is at the heart of sustainable living! Here's how waste management impacts our planet:\n\n🌍 **Climate Impact:**\n• Landfills produce methane (28x more potent than CO2)\n• Recycling reduces greenhouse gas emissions by 1.1 billion tons annually\n• Composting organic waste prevents methane release\n\n🌊 **Ocean Health:**\n• 8 million tons of plastic enter oceans yearly\n• Microplastics are found in 90% of sea birds\n• Marine animals mistake plastic for food\n\n🌱 **What You Can Do:**\n• Use ReuScan to identify recyclable materials\n• Compost organic waste\n• Choose reusable over disposable\n• Support circular economy products",
          "Creating a sustainable future starts with individual actions! Here's your environmental action plan:\n\n📊 **Your Carbon Footprint:**\n• Average person generates 4.5 pounds of waste daily\n• Recycling can reduce your carbon footprint by 1,000+ pounds of CO2 annually\n• Composting reduces methane emissions by 25%\n\n🔄 **Circular Economy Benefits:**\n• Keeps materials in use longer\n• Reduces resource extraction\n• Creates green jobs\n• Minimizes environmental impact\n\n💚 **Small Changes, Big Impact:**\n• Bring reusable bags shopping\n• Use a refillable water bottle\n• Buy products with minimal packaging\n• Repair instead of replacing when possible"
        ]
      },
      
      // Scanning and identification
      scan: {
        keywords: ['scan', 'identify', 'camera', 'detection', 'recognize'],
        responses: [
          "Great question about scanning! ReuScan's AI can help identify materials and their recycling potential:\n\n📱 **How to Use the Scanner:**\n1. Go to the Scanner tab\n2. Point your camera at the item\n3. Tap the capture button\n4. Get instant recycling information\n\n🎯 **What We Can Identify:**\n• Plastic bottles and containers\n• Metal cans and packaging\n• Glass items\n• Paper and cardboard\n• Electronic components\n\n💡 **Scanner Tips:**\n• Ensure good lighting\n• Hold camera steady\n• Include any visible recycling symbols\n• Clean items work better for detection",
          "The scanner is your personal recycling assistant! Here's how to get the best results:\n\n🔍 **Best Practices:**\n• Hold item 6-12 inches from camera\n• Ensure recycling symbols are visible\n• Avoid shadows and glare\n• Multiple angles can help identification\n\n📋 **After Scanning:**\n• Review the recycling category\n• Check local recycling guidelines\n• Submit to community feed\n• Earn eco-points for participation!\n\n🏆 **Pro Tip:** Regular scanning builds your eco-knowledge and helps our AI learn!"
        ]
      },
      
      // Community and sharing
      community: {
        keywords: ['community', 'share', 'social', 'feed', 'post', 'eco-points'],
        responses: [
          "The ReuScan community is amazing! Here's how to get involved:\n\n👥 **Community Features:**\n• Share your scanned items\n• See what others are recycling\n• Learn from community tips\n• Earn eco-points for participation\n\n🏆 **Eco-Points System:**\n• 5 points per item submission\n• Bonus points for helpful tips\n• Track your environmental impact\n• Compete on leaderboards\n\n💬 **Community Guidelines:**\n• Share accurate information\n• Be helpful and encouraging\n• Report incorrect data\n• Celebrate recycling wins together!",
          "Building a sustainable community together! Here's what makes our community special:\n\n🌟 **Why Share Your Scans:**\n• Help others learn proper recycling\n• Build a database of local recyclables\n• Inspire environmental action\n• Create positive impact together\n\n📈 **Track Your Impact:**\n• View your submission history\n• See total eco-points earned\n• Monitor recycling achievements\n• Compare with community averages\n\n🎉 **Celebrate Success:**\n• Share your recycling victories\n• Learn from others' experiences\n• Build sustainable habits together\n• Make environmental protection fun!"
        ]
      }
    };

    // Context-aware response selection
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        // Select response based on conversation history to avoid repetition
        const usedResponses = conversationHistory
          .filter(msg => msg.role === 'assistant')
          .map(msg => msg.content);
        
        const availableResponses = data.responses.filter(response => 
          !usedResponses.some(used => used.includes(response.substring(0, 50)))
        );
        
        if (availableResponses.length > 0) {
          return availableResponses[Math.floor(Math.random() * availableResponses.length)];
        } else {
          return data.responses[Math.floor(Math.random() * data.responses.length)];
        }
      }
    }

    // Greeting responses
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(greeting => lowerMessage.includes(greeting))) {
      const greetingResponses = [
        "Hello! 👋 I'm EcoBot, your personal sustainability assistant. I'm here to help you with:\n\n♻️ Recycling guidance\n🔍 Material identification\n🌍 Environmental tips\n📱 Using ReuScan features\n\nWhat would you like to know about today?",
        "Hi there! 🌱 Welcome to ReuScan! I'm excited to help you on your sustainability journey. Whether you need help with recycling, want to learn about different materials, or have questions about our app features, I'm here for you!\n\nWhat's on your mind today?",
        "Hey! 🌍 Great to see you taking action for our planet! I can help you with anything related to waste management, recycling, and sustainable living. Feel free to ask me about specific materials, recycling processes, or how to use ReuScan's features.\n\nHow can I assist you today?"
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    // Question about app features
    if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('help')) {
      return "I'm here to help you make the most of ReuScan! 🚀\n\n**I can assist you with:**\n\n📱 **App Features:**\n• How to use the scanner\n• Understanding recycling categories\n• Navigating the community feed\n• Tracking your eco-points\n\n♻️ **Recycling Knowledge:**\n• Identifying plastic types\n• Local recycling guidelines\n• Proper preparation methods\n• Environmental impact facts\n\n🌍 **Sustainability Tips:**\n• Reducing waste at home\n• Sustainable shopping habits\n• DIY upcycling projects\n• Energy conservation\n\nJust ask me anything specific, and I'll provide detailed guidance!";
    }

    // Default helpful response
    const defaultResponses = [
      "That's an interesting question! While I specialize in recycling and sustainability topics, I'm always learning. Could you tell me more about what you'd like to know?\n\n🌟 **I'm great at helping with:**\n• Plastic identification and recycling\n• Waste reduction strategies\n• Environmental impact information\n• ReuScan app features\n• Sustainable living tips\n\nWhat specific aspect interests you most?",
      "I want to make sure I give you the most helpful information! 🎯\n\nI'm particularly knowledgeable about:\n♻️ Recycling processes and guidelines\n🔍 Material identification\n🌍 Environmental sustainability\n📱 Using ReuScan effectively\n\nCould you share more details about what you're looking for? The more specific your question, the better I can help!",
      "Thanks for your question! I'm constantly learning to better assist with sustainability and recycling topics. 🌱\n\n**Let me help you with:**\n• Specific recycling questions\n• Environmental impact information\n• Sustainable lifestyle tips\n• App feature explanations\n\nFeel free to ask about anything related to waste management, recycling, or environmental protection. What would you like to explore?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!user) throw new Error('User not authenticated');

      let conversationId = currentConversationId;
      if (!conversationId) {
        conversationId = await createConversation();
        setCurrentConversationId(conversationId);
      }

      // Add user message
      const { error: userError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: 'user',
          content: message
        });
      if (userError) throw userError;

      // Generate and add AI response with conversation context
      const aiResponse = generateAIResponse(message, messages);
      const { error: aiError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: aiResponse
        });
      if (aiError) throw aiError;

      return conversationId;
    },
    onSuccess: (conversationId) => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      setInput('');
    },
  });

  const handleSend = () => {
    if (input.trim()) {
      sendMessageMutation.mutate(input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (user && !currentConversationId) {
      createConversation().then(setCurrentConversationId);
    }
  }, [user, currentConversationId]);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          EcoBot Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Hi! I'm EcoBot 🌱</p>
                <p className="mb-4">Your intelligent sustainability assistant</p>
                <div className="text-sm text-left max-w-md mx-auto bg-green-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">I can help you with:</p>
                  <ul className="space-y-1">
                    <li>♻️ Recycling guidance and tips</li>
                    <li>🔍 Material identification</li>
                    <li>🌍 Environmental impact information</li>
                    <li>📱 Using ReuScan features</li>
                    <li>🌱 Sustainable living advice</li>
                  </ul>
                  <p className="mt-3 text-green-600">Ask me anything about recycling or sustainability!</p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about recycling, sustainability, or app features..."
              disabled={sendMessageMutation.isPending}
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || sendMessageMutation.isPending}
              className="px-3"
            >
              {sendMessageMutation.isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
